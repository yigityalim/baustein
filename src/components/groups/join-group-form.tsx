"use client";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { joinGroupAction } from "@/actions/group-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JoinGroupForm() {
  const [state, formAction] = useActionState(joinGroupAction as any, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.success) toast.success("Gruba katıldın!");
    if (state.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label>Davet Kodu</Label>
        <Input
          name="code"
          placeholder="Örn: DE-X9Y2"
          required
          className="font-mono uppercase"
        />
      </div>
      <Button type="submit" variant="secondary" className="w-full">
        Katıl
      </Button>
    </form>
  );
}
