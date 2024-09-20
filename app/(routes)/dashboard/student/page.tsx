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
import AIPerformance from "./components/AIPerformance";
import Link from "next/link";

async function StudentPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (user) {
    const data: PostgrestSingleResponse<IRole> = await supabase.from("profile_roles").select("roles(role)").eq("id", user!.id).single();

    const userRole = data.data?.roles.role;

    if (userRole === "teacher") {
      revalidatePath("/", "layout");
      redirect("/dashboard/teacher");
    }
  }
  const student = await getFullStudentDetails(user.id);
  const avatarStudent = await getAvatarImg(user.id);
  const { data: imgUrl } = supabase.storage.from("avatars").getPublicUrl(`${avatarStudent.img}`);

  return (
    <>
      <div className="header-container px-28 p-6 bg-white flex flex-col md:flex-row justify-between items-center">
        {imgUrl.publicUrl !== "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && (
          <div className="avatar-container w-48 h-48 border-4 rounded-full overflow-hidden border-contrast flex-shrink-0">
            <Image src={imgUrl.publicUrl} alt="Student Avatar" width={200} height={200} className="object-cover w-full h-full " />
          </div>
        )}
        <div className="header-info flex-grow text-center mt-4 md:mt-0 md:flex-grow ">
          <Header greeting={`Hi, ${student.students}`} text="I hope you have a nice day!" />
        </div>
      </div>

      <div className="flex justify-center items-center pt-12">
        <div className="w-full max-w-lg space-y-4 bg-white p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-color100 font-semibold">Presence</span>
            <ProgressBar value={student.attendance["totale presenze"]} total={student.attendance["giorni totali del corso"]} color="bg-color60" />
          </div>

          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-color100 font-semibold">Absence</span>
            <ProgressBar value={student.attendance["totale assenze"]} total={student.attendance["giorni totali del corso"]} color="bg-contrast" />
          </div>

          <div className="flex items-center space-x-4">
            <span className="w-32 text-right text-color100 font-semibold">Total Days</span>
            <ProgressBar value={student.attendance["giorni totali del corso"]} total={student.attendance["giorni totali del corso"]} color="bg-color20" />
          </div>
        </div>
      </div>

      <div className="my-12 max-w-[1300px] bg-white rounded-lg mx-auto flex ">
        <div className="w-2/4">
          <Charts subjectsArray={student.subjects} />
        </div>
        <div className="w-2/4">
          <AIPerformance students={student.students} subjects={JSON.stringify(student.subjects)} />
        </div>
      </div>
      <Link className="fixed right-5 bottom-5 bg-white border-2 border-contrast rounded-full p-1" href={`student/${student.class_id}?student_name=${encodeURIComponent(student.students)}`}>
        <Image width={50} height={50} src="/img/chat.png" alt="Chat icon" />
      </Link>
    </>
  );
}

export default StudentPage;
