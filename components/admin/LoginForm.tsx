"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          required
          placeholder="admin@carsupplier.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
        {state.error && (
          <p className="text-sm font-medium text-destructive">{state.error}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand font-bold text-white hover:bg-brand-dark"
      >
        <Lock className="mr-2 h-4 w-4" />
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
