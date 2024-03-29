import Link from "next/link";

const NavLink = ({
  Icon,
  name,
  linkActive,
  link,
}: {
  Icon: any;
  name: string;
  linkActive?: boolean;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div
        className={`mb-9 flex w-full cursor-pointer justify-start ${
          linkActive ? "navLink-active" : "navLink"
        }`}
      >
        <Icon className="h-16 w-16" />
        <p className="text-sm font-semibold 2xl:text-base">{name}</p>
      </div>
    </Link>
  );
};

export { NavLink };
