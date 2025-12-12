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
    if (state.success === false) {
      const debugInfo = (
        state as { debug?: { code?: string; error?: string; hint?: string } }
      ).debug;
      const errorMsg = debugInfo
        ? `${state.message}\n\nHata: ${debugInfo.error || "Bilinmiyor"}\n${debugInfo.hint ? `İpucu: ${debugInfo.hint}` : ""}`
        : state.message;

      toast.error(errorMsg, { duration: 10000 });

      // Console'a da yaz
      if (debugInfo) {
        console.error("Join Group Error:", debugInfo);
      }
    }
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
