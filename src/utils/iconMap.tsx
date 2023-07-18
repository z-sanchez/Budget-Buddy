import TrashIcon from "../../public/trash-icon.svg";
import ShoppingIcon from "../../public/shopping-icon.svg";
import GearIcon from "../../public/gear-icon.svg";
import HomeIcon from "../../public/home-icon.svg";
import AccountIcon from "../../public/account-management-icon.svg";
import IncomeIcon from "../../public/income-spending-icon.svg";
import DollarIcon from "../../public/dollar-icon.svg";

export const ICON_MAP = [
  {
    id: "default",
    Icon: (props?: any) => <DollarIcon {...props} />,
  },
  {
    id: "1",
    Icon: (props?: any) => <TrashIcon {...props} />,
  },
  {
    id: "2",
    Icon: (props?: any) => <ShoppingIcon {...props} />,
  },
  {
    id: "3",
    Icon: (props?: any) => <GearIcon {...props} />,
  },
  {
    id: "4",
    Icon: (props?: any) => <HomeIcon {...props} />,
  },
  {
    id: "5",
    Icon: (props?: any) => <AccountIcon {...props} />,
  },
  {
    id: "6",
    Icon: (props?: any) => <IncomeIcon {...props} />,
  },
];
