"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/auth-actions";
import { Button, Field, inputCls } from "@/components/ui";

const initial: LoginState = { error: null };

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500">
          Jatin Malik
        </p>
        <h1 className="mt-1 text-2xl font-light">Admin · OMS</h1>
        <p className="mt-1 text-sm text-neutral-400">Sign in to continue.</p>

        <form action={action} className="mt-8 grid gap-5">
          <Field label="Email">
            <input name="email" type="email" required autoFocus className={inputCls} />
          </Field>
          <Field label="Password">
            <input name="password" type="password" required className={inputCls} />
          </Field>
          {state.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}
          <Button type="submit">{pending ? "Signing in…" : "Sign in"}</Button>
        </form>
      </div>
    </div>
  );
}
