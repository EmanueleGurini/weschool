"use client";

import Link from "next/link";
import ButtonUpload from "./ButtonUpload";
import ButtonUpdate from "./ButtonUpdate";
import { MouseEvent } from "react";
import { createClient } from "utils/supabase/client";
import ButtonVote, { ISubject } from "./ButtonVote";
import ButtonChangeVote from "./ButtonChangeVote";

interface IAttendance {
  id: string | null;
  status: boolean | null;
  date: string;
}

interface IStudent {
  id: string;
  fullName: string;
  attendance: IAttendance;
}

interface IClassData {
  students: IStudent[];
  id: string;
  date: string;
  dateSelected: string;
  subjects: ISubject[];
}

export default function TableTeacherClass({
  students,
  id,
  date,
  subjects,
  dateSelected,
}: IClassData) {
  async function handleClose(
    e: MouseEvent<HTMLButtonElement>,
    classID: string,
    status: boolean,
    date: string
  ): Promise<void> {
    const supabase = createClient();
    const idStudent = e.currentTarget.id;
    await supabase
      .from("attendance")
      .insert({
        student_id: idStudent,
        class_id: classID,
        status: status,
        date: date,
      })
      .select();

    window.location.reload();
  }
  const uniqueStudents = students.filter(
    (student, index, self) =>
      index === self.findIndex((s) => s.fullName === student.fullName)
  );
  return (
    <div className="overflow-x-auto mt-4">
      <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">
        <table className="min-w-full leading-normal">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Attendance Log
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Evaluation
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Change Evaluation
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Profile
              </th>
            </tr>
          </thead>
          <tbody>
            {uniqueStudents.map((student: IStudent) => (
              <tr
                key={student.id}
                className="last:rounded-bl-lg last:rounded-br-lg"
              >
                <td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
                  {student.fullName}
                </td>
                <td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
                  {student.attendance.status === null && "To Declare"}
                  {student.attendance.status === false && "Absent"}
                  {student.attendance.status && "Present"}
                </td>
                <td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
                  {student.attendance.status === null && (
                    <ButtonUpload
                      id={student.id}
                      classID={id}
                      date={date}
                      onClick={handleClose}
                    />
                  )}
                  {student.attendance.status !== null && (
                    <ButtonUpdate id={student.id} />
                  )}
                </td>
                <td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
                  <ButtonVote
                    id={student.id}
                    subjects={subjects}
                    classID={id}
                  />
                </td>
                <td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
                  <ButtonChangeVote
                    id={student.id}
                    subjects={subjects}
                    date={dateSelected}
                  />
                </td>
                <td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
                  <Link
                    href={`/dashboard/teacher/class/${id}/student/${student.id}`}
                    className="inline-block rounded-lg border-2 border-contrast py-3 px-6 text-xs font-bold uppercase text-contrast bg-transparent shadow-md transition-all hover:border-contrasthover hover:text-contrasthover focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Go To Student Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
