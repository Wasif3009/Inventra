const SummaryCard = ({ title1, title2, value, Icon, loading }) => {
  return (
    <div className="summary-container flex flex-col items-center justify-center gap-6 p-6 rounded-xl bg-[#1f1f23] border border-[#2a2a2e]">
      <div className="flex flex-col items-center">
        <p className="text-[#18181b] text-2xl">{title1}</p>
        <p className="text-[#18181b] text-2xl">{title2}</p>
      </div>
      <Icon className={`text-5xl text-[#18181b]`} />
      <p className="text-[#18181b] text-2xl">{value}</p>
    </div>
  );
};

export default SummaryCard;
