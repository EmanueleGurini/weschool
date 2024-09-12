interface CardProps {
  title: string;
  description: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="block w-full h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        {title}
      </h1>
      <p className="font-normal text-gray-700 ">{description}</p>
    </div>
  );
};

export default Card;
