import Header from "@/components/Header"; 
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import ProgressBar from "@/components/ProgressBar";
import { getAvatarImg, getStudentDetailsByTeacher } from "app/api/supabase/actions";
import Image from "next/image";

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

  const student = await getStudentDetailsByTeacher(user.id);
  const avatarStudent = await getAvatarImg(user.id);
  const { data: imgUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${avatarStudent.img}`);

  return (
    <> 
      <div className="p-2 bg-white ">
        {imgUrl.publicUrl !== "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && (
          <Image
            src={imgUrl.publicUrl}
            alt="Student Avatar"
            width={200}
            height={200}
            className="rounded-full mb-4 border-4 border-[#f18f01]"
          />
        )}
        <Header greeting={`Hi, ${student.studentName}`} text="I hope you have a nice day!" />
      </div>

      <div className="flex flex-col items-center justify-start mt-16 space-y-6">
        <div className="w-full max-w-lg space-y-4 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-[#2b4570] font-semibold">Presenze</span>
            <ProgressBar value={student.attendance.presences} total={student.attendance.totalDays} color="bg-[#a8d0db]" />
          </div>

          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-[#2b4570] font-semibold">Assenze</span>
            <ProgressBar value={student.attendance.absent} total={student.attendance.totalDays} color="bg-[#f18f01]" />
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-[#2b4570] font-semibold">Giorni Totali</span>
            <ProgressBar value={student.attendance.totalDays} total={student.attendance.totalDays} color="bg-[#2b4570]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPage;
