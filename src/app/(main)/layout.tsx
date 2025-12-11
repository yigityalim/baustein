import {
  BookOpen,
  ChevronDown,
  FlaskConical,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  StickyNote,
  Type,
} from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const practiceLinks = [
    { href: "/practice/articles", label: "Artikel (Der/Die/Das)", icon: null },
    { href: "/practice/verbs", label: "Fiil Çekimi", icon: Type },
    { href: "/practice/sentences", label: "Cümle Kurma", icon: null },
    { href: "/practice/numbers", label: "Sayılar", icon: null },
    { href: "/practice/flashcards", label: "Flashcards", icon: null },
    { href: "/practice/grammar", label: "Gramer Lab", icon: FlaskConical },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="top-0 z-50 sticky bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur border-b">
        <div className="flex justify-between items-center mx-auto px-4 md:px-6 h-14 md:h-16 container">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold hover:text-primary text-lg md:text-xl transition-colors"
          >
            🧱 Baustein
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/add" className="gap-2">
                <PlusCircle className="w-4 h-4" />
                <span className="hidden lg:inline">Ekle</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/vocabulary" className="gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden lg:inline">Sözlük</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/notes" className="gap-2">
                <StickyNote className="w-4 h-4" />
                <span className="hidden lg:inline">Notlar</span>
              </Link>
            </Button>

            {/* PRACTICE DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Gamepad2 className="w-4 h-4" />
                  <span className="hidden lg:inline">Alıştırma</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {practiceLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      {link.label}
                      {link.icon && (
                        <link.icon className="ml-2 w-3 h-3 text-muted-foreground" />
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-2 pl-2 border-l flex items-center gap-2">
              <ThemeToggle />
              <form action={signOut}>
                <Button variant="ghost" size="sm" type="submit" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Çıkış</span>
                </Button>
              </form>
            </div>
          </nav>

          {/* MOBILE NAV */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-linear-to-br from-background to-muted/20">
        {children}
      </main>
    </div>
  );
}
