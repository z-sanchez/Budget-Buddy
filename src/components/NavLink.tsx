const NavLink = ({
  Icon,
  name,
  linkActive,
}: {
  Icon: any;
  name: string;
  linkActive?: boolean;
}) => {
  return (
    <div
      className={`mb-9 flex w-full cursor-pointer items-center justify-start ${
        linkActive ? "navLink-active" : "navLink"
      }`}
    >
      <Icon className="w-16" />
      <p className="font-semibold">{name}</p>
    </div>
  );
};

export { NavLink };
