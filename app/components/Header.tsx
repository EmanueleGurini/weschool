import FormattedDate from "./FormattedDate";

interface HeaderProps {
  greeting: string;
  text: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ greeting, text }) => {
  const today = new Date();

  return (
    <header className="p-6 flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{greeting}</h1>
        <p>{text}</p>
      </div>
      <div className="header-info text-lg font-semibold">
        <FormattedDate date={today} format="day-month-year" />
      </div>
    </header>
  );
};

export default Header;
