const ProgressBar = ({ value, total, color }: { value: number, total: number, color: string }) => {
  const percentage = (value / total) * 100;

  return (
    <div className="w-full bg-[#f7f7f8] rounded-full h-6 relative">
      <div
        className={`${color} h-6 rounded-full`}
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">{value}</div>
    </div>
  );
};

export default ProgressBar;
