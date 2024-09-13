"use client"

interface ProgressBarProps {
  value: number;  
  total: number;   
  color: string;   
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total, color }) => {
  const progress = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className={`h-4 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${progress}%` }}
      ></div>
      <p className="mt-1 text-sm text-gray-500">{value} / {total}</p>
    </div>
  );
};

export default ProgressBar;