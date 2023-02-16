import GearIcon from "../../public/gear-icon.svg";

const NavUser = () => {
  return (
    <div className="mx-auto flex h-14 w-full cursor-default items-center justify-between rounded-md border p-8 px-3">
      <div className="flex h-7  w-7 items-center justify-center rounded-3xl bg-red-500 ">
        <p className="m-0 text-center text-white">Z</p>
      </div>
      <p>Ziek Sanchez</p>
      <GearIcon className="cursor-pointer" />
    </div>
  );
};

export { NavUser };
