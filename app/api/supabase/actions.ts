import { createClient } from "utils/supabase/server";

export const getTeacherDataByID = async () => {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await createClient().auth.getUser();

    const { data, error } = await supabase.rpc("get_teacher_courses", {
      user_id: user!.id,
    });
    if (error) {
      console.error(`Errore durante il recupero dei dati dell'insegnante ${user}:`);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Errore imprevisto durante la chiamata");
    return null;
  }
};

export const getAvatarImg = async (profileID: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_profile_avatar", {
      profile_id: profileID,
    });
    if (error) {
      console.error(`Errore durante il recupero dell'avatar per il profilo ${profileID}:`);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Errore imprevisto durante la chiamata");
    return null;
  }
};

export const getStudentsListDetailsByTeacher = async (courseID: string, attendanceDate: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.rpc("get_course_students", {
      attendance_date: attendanceDate,
      course_id: courseID,
    });

    if (error) {
      console.error(`Errore durante il recupero della lista studenti per il corso ${courseID}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Errore imprevisto durante la chiamata`, err);
    return null;
  }
};

export const getStudentsGradeByClassID = async (courseID: string, attendanceDate: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_course_students", {
      attendance_date: attendanceDate,
      course_id: courseID,
    });
    if (error) {
      console.error(`Errore durante il recupero della lista studenti per il corso ${courseID} e data ${attendanceDate}:`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Errore imprevisto durante la chiamta", err);
  }
  return null;
};

export const getFullStudentDetails = async (inputStudentID: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.rpc("get_student_summary", {
      input_student_id: inputStudentID,
    });
    if (error) {
      console.error(`Errore durante il recupero dei dettagli dello studente ${inputStudentID}`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Errore imprevisto durante la chiamata", err);
  }
};

export const getStatusAttendance = async (studentID: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_attendance_id", {
      student_id: studentID,
    });
    if (error) {
      console.error(`Errore durante il recupero dello status di assenza/presenza per l'alunno:${studentID}`);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Errore imprevisto durante la chiamata", err);
  }
};

export const getTeacherNotes = async (teacherID: string, filterDate: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_teacher_courses_and_notes", {
      filter_date: filterDate,
      teacher_id: teacherID,
    });
    if (error) {
      console.error(`Errore durante il recupero dei post ${filterDate} dell'insegnante:${teacherID}`);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Errore imprevisto durante la chiamata");
  }
};
