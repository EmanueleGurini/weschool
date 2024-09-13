interface HeaderProps {
  greeting: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ greeting, text }) => {
  const formattedDate = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  
  return (
    <header className="p-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-bold">{greeting}</h1>
          <p>{text}</p>
        </div>
      </div>
      <div className="header-info text-lg font-semibold">
        <p>Data: {formattedDate}</p>
      </div>
    </header>
  );
};

export default Header;
