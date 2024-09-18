import Header from "@/components/Header";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import ProgressBar from "@/components/ProgressBar";
import { getAvatarImg, getFullStudentDetails } from "app/api/supabase/actions";
import Image from "next/image";
import Charts from "@/components/Charts";

async function StudentPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

    if (userRole === "teacher") {
      revalidatePath("/", "layout");
      redirect("/dashboard/teacher");
    }
  }

  const student = await getFullStudentDetails(user.id);
  const avatarStudent = await getAvatarImg(user.id);
  const { data: imgUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${avatarStudent.img}`);

  return (
    <>
      <div className="p-2 bg-white flex justify-between items-center">
        {imgUrl.publicUrl !==
          "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && (
          <div className="w-48 h-48 mb-4 border-4 rounded-full overflow-hidden">
            <Image
              src={imgUrl.publicUrl}
              alt="Student Avatar"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="w-full h-full">
          <Header
            greeting={`Hi, ${student.students}`}
            text="I hope you have a nice day!"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-start mt-16 space-y-6">
        <div
          className="w-full max-w-lg space-y-4 bg-white p-4 rounded-lg Rounded-lg
"
        >
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-[#2b4570] font-semibold">
              Presence
            </span>
            <ProgressBar
              value={student.attendance["totale presenze"]}
              total={student.attendance["giorni totali del corso"]}
              color="bg-color60"
            />
          </div>

          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-[#2b4570] font-semibold">
              Absence
            </span>
            <ProgressBar
              value={student.attendance["totale assenze"]}
              total={student.attendance["giorni totali del corso"]}
              color="bg-contrast"
            />
          </div>

          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-[#2b4570] font-semibold">
              Total Days
            </span>
            <ProgressBar
              value={student.attendance["giorni totali del corso"]}
              total={student.attendance["giorni totali del corso"]}
              color="bg-color20"
            />{" "}
          </div>
        </div>
      </div>
      <div className="max-w-[1024px] mx-auto">
        <Charts subjectsArray={student.subjects} />
      </div>
    </>
  );
}

export default StudentPage;
