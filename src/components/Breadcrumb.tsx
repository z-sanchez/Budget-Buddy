import { useRouter } from "next/router";
import { BLUE } from "../utils/constants";

const Breadcrumb = () => {
  const router = useRouter();

  const paths = router.asPath
    .split("/")
    .filter((path) => path)
    .map((path) => path.toLowerCase());

  const handleOnClick = (pathName: string) => {
    const pathNameIndex = paths.findIndex((path) => path === pathName);
    const pathNames = paths.slice(0, pathNameIndex + 1);
    const finalPathName = pathNames.join("/");

    router.push("/" + finalPathName).catch((err) => console.log("error", err));
  };

  return (
    <div>
      {paths.map((path, index) => {
        const pathName = path.replace("%20", " ");
        if (index === paths.length - 1) {
          return (
            <button key={index} style={{ color: BLUE }}>
              {" " + pathName}
            </button>
          );
        }
        return (
          <>
            <button
              className="blueOnHover"
              onClick={() => handleOnClick(path)}
              key={index}
            >{`${pathName}`}</button>
            <span className="px-2">/</span>
          </>
        );
      })}
    </div>
  );
};

export { Breadcrumb };
