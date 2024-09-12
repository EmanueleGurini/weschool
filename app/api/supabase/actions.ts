import { createClient } from "utils/supabase/server";

export const getTeacherDataByID = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await createClient().auth.getUser();

  let { data, error } = await supabase.rpc("get_teacher_courses", {
    user_id: user!.id,
  });
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

export const getStudentsList = async (classID: string) => {
  const supabase = createClient();

  let { data, error } = await supabase.rpc("get_students_list_by_class_id", {
    p_class_id: classID,
  });
  if (error) console.error(error);
  else {
    return data;
  }
};
