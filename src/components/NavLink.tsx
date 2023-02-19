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
    <div
      className={`mb-9 flex w-full cursor-pointer items-center justify-start ${
        linkActive ? "navLink-active" : "navLink"
      }`}
    >
      <Icon className="w-16" />
      <p className="text-sm font-semibold 2xl:text-base">
        <Link href={link}>{name}</Link>
      </p>
    </div>
  );
};

export { NavLink };
