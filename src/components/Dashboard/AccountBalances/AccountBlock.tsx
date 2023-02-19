const AccountBlock = ({
  color,
  name,
  amount,
}: {
  color: string;
  name: string;
  amount: number;
}) => {
  return (
    <div
      className=" flex h-[45%] cursor-pointer flex-col items-center justify-center rounded-xl py-2"
      style={{ backgroundColor: color }}
    >
      <p className="text-bold ml-5 self-start text-base text-white 2xl:text-lg">
        {name}
      </p>
      <p className="poppinsFont text-xl font-light text-white 2xl:text-2xl">
        ${amount}
      </p>
    </div>
  );
};

export { AccountBlock };
