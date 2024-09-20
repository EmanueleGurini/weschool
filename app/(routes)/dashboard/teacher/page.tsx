import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import { getAvatarImg, getTeacherDataByID } from "app/api/supabase/actions";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

interface ICourses {
  course: string;
  totalStudents: string;
  id: string;
}

export default async function TeacherPage() {
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

    if (userRole === "student") {
      revalidatePath("/", "layout");
      redirect("/dashboard/student");
    }
  }

  const dataTeacher = await getTeacherDataByID();

  const avatarTeacher = await getAvatarImg(dataTeacher.teacher_id);
  const { data: imgUrl } = supabase.storage.from("avatars").getPublicUrl(`${avatarTeacher.img}`);
  const today = new Date();

  return (
    <div>
      <div className="header-container px-36 p-4 bg-white flex flex-col md:flex-row justify-between items-center">
        <div className="avatar-container w-48 h-48 border-4 rounded-full overflow-hidden border-contrast flex-shrink-0 ">
          {imgUrl.publicUrl !== "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && (
            <Image src={imgUrl.publicUrl} alt="Teacher Avatar" width={150} height={150} className="object-cover w-full h-full" />
          )}
          {imgUrl.publicUrl === "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && (
            <Image src="/img/profile.svg" alt="Teacher Avatar" width={150} height={150} className="object-cover w-full h-full" />
          )}
        </div>
        <div className="header-info flex-grow text-center mt-4 md:mt-0 md:flex-grow">
          <Header greeting={`Hi, ${dataTeacher.full_name}`} text="I hope you have a nice day!" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 bg-color10">
        <div className="py-10">
          <div className="p-8 bg-lightGray bg-opacity-70 rounded-[10px] ">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Class Name</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Student Number</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Class Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTeacher.courses.map((element: ICourses, index: number) => (
                      <tr key={index} className="last:rounded-bl-lg last:rounded-br-lg">
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{element.course}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{element.totalStudents}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <Link
                            href={`/dashboard/teacher/class/${element.id}`}
                            className="inline-block rounded-lg bg-contrast py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-contrast-hover focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
                          >
                            Go To Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
