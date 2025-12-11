"use client";

import {
  BookOpen,
  FlaskConical,
  Gamepad2,
  LayoutDashboard,
  PlusCircle,
  StickyNote,
  Type,
} from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { ResetDataButton } from "@/components/layout/reset-data-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MAIN_LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add", label: "Kelime Ekle", icon: PlusCircle },
  { href: "/vocabulary", label: "Sözlük", icon: BookOpen },
  { href: "/notes", label: "Notlar", icon: StickyNote },
];

const PRACTICE_LINKS = [
  {
    href: "/practice/articles",
    label: "Artikel (Der/Die/Das)",
    icon: Gamepad2,
  },
  { href: "/practice/verbs", label: "Fiil Çekimi", icon: Type },
  { href: "/practice/sentences", label: "Cümle Kurma", icon: Gamepad2 },
  { href: "/practice/numbers", label: "Sayılar", icon: Gamepad2 },
  { href: "/practice/flashcards", label: "Flashcards", icon: Gamepad2 },
  { href: "/practice/grammar", label: "Gramer Lab", icon: FlaskConical },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative flex justify-start items-center gap-2.5 hover:opacity-70 p-0 w-20 h-8 transition-opacity touch-manipulation",
          )}
        >
          <div className="relative flex justify-center items-center w-4 h-8">
            <div className="relative size-4">
              <span
                className={cn(
                  "block left-0 absolute bg-foreground w-4 h-0.5 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "block left-0 absolute bg-foreground w-4 h-0.5 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5",
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex items-center h-8 font-medium text-base leading-none">
            Menu
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/95 shadow-none backdrop-blur p-0 border-none rounded-none w-(--radix-popper-available-width) h-(--radix-popper-available-height) overflow-y-auto duration-100 no-scrollbar"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 px-6 py-8 overflow-auto">
          <div className="flex flex-col gap-4">
            <div className="font-medium text-muted-foreground text-sm">
              Menü
            </div>
            <div className="flex flex-col gap-3">
              {MAIN_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={cn(isActive && "text-primary")}
                  >
                    {item.label}
                    <item.icon className="ml-auto w-5 h-5" />
                  </MobileLink>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
              <Gamepad2 className="w-4 h-4" />
              Alıştırmalar
            </div>
            <div className="flex flex-col gap-3">
              {PRACTICE_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={cn(isActive && "text-primary")}
                  >
                    {item.label}
                    {item.icon && <item.icon className="ml-auto w-5 h-5" />}
                  </MobileLink>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto pt-4 border-t">
            <ResetDataButton
              variant="ghost"
              size="default"
              className="gap-3 justify-start px-2 w-full font-medium text-2xl"
              textLabel="Verileri Sıfırla"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        "flex items-center px-2 font-medium text-2xl transition-colors",
        isActive && "bg-primary/10 text-primary px-2 rounded",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
