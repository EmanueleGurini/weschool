import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import Chat from "../components/Chat";
interface IChatPage {
  params: { chat_id: string };
}
export default async function ChatPage({ params }: IChatPage) {
  const { chat_id } = params;

  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    return redirect("/login");
  }

  if (session.user) {
    const data: PostgrestSingleResponse<IRole> = await supabase.from("profile_roles").select("roles(role)").eq("id", session.user.id).single();

    const userRole = data.data?.roles.role;

    if (userRole === "teacher") {
      revalidatePath("/", "layout");
      redirect("/dashboard/teacher");
    }
  }
  // console.log(session.user);
  return <Chat key={session.user.id} session={session} class_id={chat_id} />;
}
