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

const colorPalette = [
  "var(--color-contrast)",
  "var(--color-contrast-hover)",
  "var(--color-100)",
  "var(--color-80)",
  "var(--color-60)",
  "var(--color-20)",
  "var(--primary-color)",
];

function formatDateForChart(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function Charts({ subjectsArray }: ISubject) {
  const data = organizeData(subjectsArray);
  const subjects = getUniqueSubjects(subjectsArray);

  return (
    <div className="flex flex-col items-center py-10 bg-white rounded-lg">
      <h2 className="text-xl font-bold uppercase mb-4 p-2 text-color100">Academic Performance </h2>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart width={700} height={500} data={data}>
          <XAxis dataKey="date" stroke="var(--color-100)" fontSize={13} tickFormatter={formatDateForChart} />
          <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} stroke="var(--color-100)" tick={{ fontSize: 10, fill: "var(--color-60)" }} />
          <CartesianGrid stroke="var(--color-20)" strokeDasharray="5 5" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-0)",
              border: "1px solid var(--color-20)",
            }}
            labelStyle={{ color: "var(--color-contrast)" }}
            itemStyle={{ color: "var(--color-100)" }}
            labelFormatter={(label) => formatDateForChart(label)}
          />
          <Legend
            wrapperStyle={{
              color: "var(--color-100)",
              fontFamily: "montserrat",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          />
          {subjects.map((subject, index) => (
            <Line
              key={subject}
              type="monotone"
              dataKey={subject}
              stroke={colorPalette[index % colorPalette.length]}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
