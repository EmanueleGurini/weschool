"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface IChartsProps {
  subject: string;
  grade: number | null;
  date: string | null;
}

interface ISubject {
  subjectsArray: IChartsProps[];
}

const organizeData = (subjectsArray: IChartsProps[]) => {
  const validData = subjectsArray
    .filter((item) => item.grade !== null && item.date !== null)
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

  const allDates = Array.from(new Set(validData.map((item) => item.date)));

  return allDates.map((date) => {
    const entry: any = { date };
    subjectsArray.forEach((subject) => {
      const dataForSubject = validData.find((item) => item.date === date && item.subject === subject.subject);
      entry[subject.subject] = dataForSubject ? dataForSubject.grade : null;
    });
    return entry;
  });
};

const getUniqueSubjects = (subjectsArray: IChartsProps[]) => {
  return Array.from(new Set(subjectsArray.map((item) => item.subject).filter(Boolean)));
};

function Charts({ subjectsArray }: ISubject) {
  const data = organizeData(subjectsArray);
  const subjects = getUniqueSubjects(subjectsArray);

  return (
    <div className="flex flex-col items-center p-6 ">
      <h2 className="text-xl font-sans font-semibold uppercase mb-4">Academic Performance </h2>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart width={700} height={500} data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          {subjects.map((subject) => (
            <Line key={subject} type="monotone" dataKey={subject} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} connectNulls={true} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
