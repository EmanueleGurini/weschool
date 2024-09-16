const ProgressBar = ({ value, total, color }: { value: number, total: number, color: string }) => {
  const percentage = (value / total) * 100;

  return (
    <div className="w-full bg-[#f7f7f8] rounded-full h-6">
      <div
        className={`${color} h-6 rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
