import { createClient } from "utils/supabase/server";
import AccountForm from "./account-form";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <AccountForm user={user} />;
}
