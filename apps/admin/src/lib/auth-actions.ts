"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "./api";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from "./session";

export type LoginState = { error: string | null };

export async function loginAction(
  _prev: LoginState,
  fd: FormData,
): Promise<LoginState> {
  const email = (fd.get("email") as string)?.trim() ?? "";
  const password = (fd.get("password") as string) ?? "";

  let user: { id: string; email: string; role: string };
  try {
    const res = await api.post<{ user: typeof user }>("/auth/login", {
      email,
      password,
    });
    user = res.user;
  } catch {
    return { error: "Invalid email or password." };
  }

  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}
