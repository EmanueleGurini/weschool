import Link from "next/link";

interface Class {
  id: string;
  course: string;
  totalStudents: number;
}

interface TeacherDashboardProps {
  classes: Class[];
}

export default function TeacherDashboard({ classes }: TeacherDashboardProps) {
      const formattedDate = new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date());

  return (
    <main className="p-6">
      <section className="class-list">
        <div className="text-right text-gray-800 text-xl font-bold">
          {formattedDate} 
        </div>
        <h2 className="text-2xl font-bold mb-4">Lista Classi</h2>
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nome Classe</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Numero Studenti</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Dettaglio Classe</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {classes.length ? (
              classes.map((classItem) => (
                <tr key={classItem.id} className="bg-white border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Nome Classe</span>
                    {classItem.course}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Studenti Totali : </span>
                    {classItem.totalStudents}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <Link
                      href={`/dashboard/teacher/class/${classItem.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                    >
                      Vai al dettaglio Lista Classe
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
