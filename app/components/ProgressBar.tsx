interface ProgressBarProps {
  title: string;
  description: React.ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, description }) => {
  return (
    <div className="block w-full h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-500 h-4 rounded-full" />
        </div>
        <p className="text-sm mt-2"></p>
      </div>
      <p className="font-normal text-gray-700 ">{description}</p>
    </div>
  );
};

export default ProgressBar;
