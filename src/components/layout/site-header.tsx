import type { User } from "@supabase/supabase-js";
import {
  BookOpen,
  ChevronDown,
  FlaskConical,
  Gamepad2,
  LayoutDashboard,
  PlusCircle,
  Settings,
  StickyNote,
  Type,
} from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ResetDataButton } from "@/components/layout/reset-data-button";
import { UserBadgeDropdown } from "@/components/layout/user-badge-dropdown";
import { WorkspaceSwitcher } from "@/components/layout/workspace-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Group = {
  id: string;
  name: string;
};

type UserProfile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  current_streak: number | null;
  xp: number | null;
} | null;

type GroupMember = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  current_streak: number | null;
  xp: number | null;
};

interface SiteHeaderProps {
  user: User | null;
  userGroups: Group[];
  activeGroupId: string | null;
  userProfile: UserProfile;
  groupMembers: GroupMember[];
}

export async function SiteHeader({
  user,
  userGroups,
  activeGroupId,
  userProfile,
  groupMembers,
}: SiteHeaderProps) {
  const practiceLinks = [
    { href: "/practice/articles", label: "Artikel (Der/Die/Das)", icon: null },
    { href: "/practice/verbs", label: "Fiil Çekimi", icon: Type },
    { href: "/practice/sentences", label: "Cümle Kurma", icon: null },
    { href: "/practice/numbers", label: "Sayılar", icon: null },
    { href: "/practice/flashcards", label: "Flashcards", icon: null },
    { href: "/practice/grammar", label: "Gramer Lab", icon: FlaskConical },
  ];

  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur border-b">
      <div className="flex justify-between items-center mx-auto px-4 md:px-6 h-14 md:h-16 container">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold hover:text-primary text-lg md:text-xl transition-colors"
        >
          🧱 Baustein
        </Link>

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
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">Ayarlar</span>
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

          <div className="flex items-center gap-2 ml-2 pl-2 border-l">
            {userProfile && (
              <UserBadgeDropdown
                currentUser={userProfile}
                groupMembers={groupMembers}
              />
            )}
            <ThemeToggle />
            {user && (
              <WorkspaceSwitcher
                groups={userGroups}
                activeGroupId={activeGroupId}
              />
            )}
            <ResetDataButton className="gap-2" />
          </div>
        </nav>

        {/* MOBILE NAV */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <MobileNav
            user={user}
            groups={userGroups}
            activeGroupId={activeGroupId}
            userProfile={userProfile}
          />
        </div>
      </div>
    </header>
  );
}
