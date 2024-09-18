import { createClient } from "utils/supabase/server";

export const getTeacherDataByID = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await createClient().auth.getUser();

  const { data, error } = await supabase.rpc("get_teacher_courses", {
    user_id: user!.id,
  });
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

// export const getStudentsList = async (classID: string) => {
//   const supabase = createClient();

//   let { data, error } = await supabase.rpc("get_students_list_by_class_id", {
//     p_class_id: classID,
//   });
//   if (error) console.error(error);
//   else {
//     return data;
//   }
// };

export const getAvatarImg = async (profileID: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_profile_avatar", {
    profile_id: profileID,
  });
  if (error) console.error(error);
  else return data;
};

export const getStudentsListDetailsByTeacher = async (courseID: string, attendanceDate: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_course_students", {
    attendance_date: attendanceDate,
    course_id: courseID,
  });
  if (error) console.error(error);
  else console.log(data);

  return data;
};

export const getStudentsGradeByClassID = async (courseID: string, attendanceDate: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_course_students", {
    attendance_date: attendanceDate,
    course_id: courseID,
  });
  if (error) console.error(error);
  else console.log(data);
  return data;
};

export const getFullStudentDetails = async (inputStudentID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_student_summary", {
    input_student_id: inputStudentID,
  });
  if (error) console.error(error);
  else console.log(data);

  return data;
};

export const getStatusAttendance = async (studentID: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_attendance_id", {
    student_id: studentID,
  });
  if (error) console.error(error);
  else console.log(data);
  return data;
};

export const getTeacherNotes = async (teacherID: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_teacher_courses_and_notes", {
    teacher_id: teacherID,
  });
  if (error) console.error(error);
  else console.log(data);
  return data;
};
