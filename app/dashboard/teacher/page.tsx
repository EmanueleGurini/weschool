import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "utils/supabase/client";
import TeacherDashboard from "./class/[id]/components/teacher-dashboard";

interface Class {
  id: number;
  name: string;
  students: number;
}

const getData = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await createClient().auth.getUser();

  let { data, error } = await supabase.rpc("get_teacher_courses", {
    user_id: "deb46290-2a23-4591-874c-2494d81f588b",
  });
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

export default async function Page() {
  const data = await getData();

  return <TeacherDashboard classes={data.courses} />;
}
