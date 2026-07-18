import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user !== null;
}

/**
 * The real auth gate. proxy.ts only improves UX with an early redirect;
 * every admin page and every Server Action must call this.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
