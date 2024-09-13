import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import { getAvatarImg, getTeacherDataByID } from "app/api/supabase/actions";
import Link from "next/link";
import Image from "next/image";

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
      {imgUrl.publicUrl !== "https://ihymhmvbzbgzrnlusnxj.supabase.co/storage/v1/object/public/avatars/null" && <Image src={imgUrl.publicUrl} alt="Teacher Avatar" width={200} height={200} className="rounded-full mb-4"/>}
      <div className="w-full flex items-center justify-between font-extrabold">
        <h2 className="text-2xl font-bold mb-4">Hi, {dataTeacher.full_name}!</h2>
        <p>{formatDate(today)}</p>
      </div>
      <p className="text-gray-600 mb-6">I hope you have a good day.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md border border-gray-300 border-collapse rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-gray-700">
              <th className="px-6 py-3 text-left text-sm font-medium border-none text-white">Class Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium border-none text-white">Student Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium border-none text-white">Class Details</th>
            </tr>
          </thead>
          <tbody>
            {dataTeacher.courses.map((element: ICourses, index: number) => (
              <tr key={index} className="border-b border-gray-300 last:border-none">
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{element.course}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{element.totalStudents}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  <Link href={`/dashboard/teacher/class/${element.id}`} className="text-blue-500 hover:underline">Go To Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
