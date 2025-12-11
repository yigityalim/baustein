"use client";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createGroupAction } from "@/actions/group-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateGroupForm() {
  const [state, formAction] = useActionState(createGroupAction as any, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.success)
      toast.success(`Grup kuruldu! Kod: ${(state as any).code}`);
    if (state.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label>Grup İsmi</Label>
        <Input name="name" placeholder="Örn: A1.1 Tayfa" required />
      </div>
      <Button type="submit" className="w-full">
        Oluştur
      </Button>
    </form>
  );
}
