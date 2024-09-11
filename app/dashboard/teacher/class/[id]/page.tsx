import { createClient } from "utils/supabase/server";
import ClassDetailPage from "./components/class-detail-page";
import { redirect } from "next/navigation";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";

export default async function SinglePageClass() {

    const supabase = createClient();

    const {data: { user }} = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    if (user) {
        const data: PostgrestSingleResponse<IRole> = await supabase
        .from("profile_roles")
        .select("roles(role)")
        .eq("id", user!.id)
        .single();
        
        const userRole = data.data?.roles.role;

        if (userRole === 'student') {
            revalidatePath("/", "layout");
            redirect("/dashboard/student");
        }
    }

    return (
        <ClassDetailPage />
    )
}
