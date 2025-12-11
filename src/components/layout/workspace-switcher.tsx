"use client";

import { Check, ChevronsUpDown, Plus, User, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { setActiveGroupAction } from "@/actions/group-actions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Bu bileşene verileri server component'ten prop olarak atacağız
type Group = {
  id: string;
  name: string;
};

export function WorkspaceSwitcher({
  groups,
  activeGroupId,
}: {
  groups: Group[];
  activeGroupId: string | null;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = async (groupId: string | null) => {
    await setActiveGroupAction(groupId); // Server Action çağır
    setOpen(false);
  };

  // Aktif grubun adını bul
  const activeGroup = groups.find((g) => g.id === activeGroupId);

  // Eğer hiç grup yoksa, direkt grup ekleme sayfasına yönlendir
  if (groups.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        asChild
        className="gap-2 w-full md:w-auto"
      >
        <Link href="/groups">
          <Plus className="w-4 h-4" />
          Grup Ekle veya Katıl
        </Link>
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full md:w-[200px]"
        >
          {activeGroupId ? (
            <span className="flex items-center gap-2 truncate">
              <Users className="w-4 h-4 text-blue-500" />
              {activeGroup?.name || "Grup Seçildi"}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-500" />
              Kişisel Alanım
            </span>
          )}
          <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[200px]">
        <Command>
          <CommandList>
            <CommandGroup heading="Çalışma Alanı">
              {/* KİŞİSEL ALAN SEÇENEĞİ */}
              <CommandItem
                onSelect={() => handleSelect(null)}
                className="cursor-pointer"
              >
                <User className="mr-2 w-4 h-4" />
                Kişisel Alanım
                <Check
                  className={cn(
                    "ml-auto w-4 h-4",
                    !activeGroupId ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Gruplar">
              {/* GRUP SEÇENEKLERİ */}
              {groups.map((group) => (
                <CommandItem
                  key={group.id}
                  onSelect={() => handleSelect(group.id)}
                  className="cursor-pointer"
                >
                  <Users className="mr-2 w-4 h-4" />
                  {group.name}
                  <Check
                    className={cn(
                      "ml-auto w-4 h-4",
                      activeGroupId === group.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* YENİ GRUP EKLE */}
            <CommandGroup>
              <CommandItem asChild className="cursor-pointer">
                <Link
                  href="/groups"
                  className="flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Grup Ara veya Katıl
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
