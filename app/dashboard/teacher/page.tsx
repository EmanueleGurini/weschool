import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import { getAvatarImg, getTeacherDataByID } from "app/api/supabase/actions";
import Link from "next/link";
import Image from "next/image";
import { table } from "console";
import Button from "@/components/ui/Button";

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

  const dataTeacher = await getTeacherDataByID()

  const avatarTeacher = await getAvatarImg(dataTeacher.teacher_id)
  const { data: imgUrl} = supabase.storage
  .from("avatars")
  .getPublicUrl(`${avatarTeacher.img}`);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const today = new Date();

  return (
      <div className="container mx-auto p-6">
      {imgUrl.publicUrl !== "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && <Image src={imgUrl.publicUrl} alt="Teacher Avatar" width={150} height={150} className="rounded-full mb-4"/>}
      <div className="w-full flex items-center justify-between font-extrabold">
        <h2 className="text-2xl font-bold mb-4">Hi, {dataTeacher.full_name}!</h2>
        <p>{formatDate(today)}</p>
      </div>
      <p className="text-gray-600 mb-6">I hope you have a good day.</p>
      <div className="container mx-auto px-4 sm:px-8">
      <div className="py-10">
      <div className="p-8 bg-lightGray bg-opacity-70 rounded-[10px] ">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
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
                      href={`/dashboard/teacher/class/${element.id}`} passHref>
                      <Button className="w-full">Go To Details</Button>
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