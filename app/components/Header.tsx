interface HeaderProps {
  greeting: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ greeting, text }) => {
  const formatDate = (date: Date, format: "day/month/year") => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = new Date();

  return (
    <header className="p-6 flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{greeting}</h1>
        <p>{text}</p>
      </div>
      <div className="text-lg font-semibold">
        <p>{formatDate(today, "day/month/year")}</p>
      </div>
    </header>
  );
};

export default Header;
