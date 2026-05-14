const SummaryCard = ({ title1, title2, value, Icon, loading }) => {
  return (
    <div
      className="
        w-32
        md:w-40
sm:w-36
lg:w-44  
      min-h-[10px]
        md:min-h-[240px]
        bg-[#9333ea]
        border
        border-[#2a2a2e]
        rounded-xl
        flex
        flex-col
        items-center
        justify-center
        gap-3
        p-2
        md:p-2
        lg:p-3
        shadow-md
        transition-all
        hover:scale-[1.02]
      "
    >
      {/* Titles */}
      <div className="flex flex-col items-center leading-tight">
        <p className="text-[#18181b] text-lg sm:text-xl font-semibold">
          {title1}
        </p>

        <p className="text-[#18181b] text-lg sm:text-xl font-semibold">
          {title2}
        </p>
      </div>

      {/* Icon */}
      <Icon className="text-4xl sm:text-5xl text-[#18181b]" />

      {/* Value */}
      <p className="text-[#18181b] text-2xl sm:text-3xl font-bold">{value}</p>
    </div>
  );
};

export default SummaryCard;
