import TrashIcon from "../../public/trash-icon.svg";
import ShoppingIcon from "../../public/shopping-icon.svg";
import GearIcon from "../../public/gear-icon.svg";
import HomeIcon from "../../public/home-icon.svg";
import AccountIcon from "../../public/account-management-icon.svg";
import IncomeIcon from "../../public/income-spending-icon.svg";

export const ICON_MAP = [
  {
    id: "TrashIcon",
    Icon: (props?: any) => <TrashIcon {...props} />,
  },
  {
    id: "ShoppingIcon",
    Icon: (props?: any) => <ShoppingIcon {...props} />,
  },
  {
    id: "GearIcon",
    Icon: (props?: any) => <GearIcon {...props} />,
  },
  {
    id: "HomeIcon",
    Icon: (props?: any) => <HomeIcon {...props} />,
  },
  {
    id: "AccountIcon",
    Icon: (props?: any) => <AccountIcon {...props} />,
  },
  {
    id: "IncomeIcon",
    Icon: (props?: any) => <IncomeIcon {...props} />,
  },
];
