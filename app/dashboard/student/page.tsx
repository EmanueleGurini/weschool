import Card from "@/components/Card";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const formattedDate = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(new Date());

function studentPage() {
  return (
    <div>
      <Navbar />

      <div>
        <Header greeting="Ciao studente" text="Sarai sicuramente bocciato!!" />
      </div>

      <div className="flex flex-col items-center space-y-4 p-4">
        <h1 className="text-3xl font-bold mb-6">Student Page</h1>
        <div className="flex items-center p-4 gap-5">
          <Card
            title="Compagni"
            description="La tua classe ha 23 compagni"
            href="stringa vuota"
          />

          <Card title="Assenze" description="30%" href="stringa vuota" />
        </div>
      </div>
    </div>
  );
}

export default studentPage;
