import EditIcon from "../../../public/edit-icon.svg";
import { GREY } from "../../utils/constants";
import { useState } from "react";
import { Popover } from "@mui/material";
import { ICON_MAP } from "../../utils/iconMap";

type Props = {
  SelectedIcon: any;
};

const IconInput = ({ SelectedIcon }: Props) => {
  const [iconPopoverElement, setIconPopoverElement] =
    useState<HTMLAnchorElement | null>(null);

  return (
    <div className="my-8 flex">
      <p className="w-1/12 font-medium">Icon</p>
      <div className="flex w-1/12 items-center">
        <SelectedIcon className="h-6 w-6" />
        {iconPopoverElement && (
          <Popover
            id="IconPopover"
            open={Boolean(iconPopoverElement)}
            onClose={() => setIconPopoverElement(null)}
            anchorEl={iconPopoverElement}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="flex w-40 flex-wrap">
              {ICON_MAP.map(({ Icon, id }) => {
                return (
                  <div
                    key={id}
                    className="flex w-1/3 cursor-pointer justify-center p-2 transition-all hover:bg-blue-100"
                  >
                    <Icon className="h-8 w-8" fill="black" />
                  </div>
                );
              })}
            </div>
          </Popover>
        )}
        <EditIcon
          style={{ fill: GREY }}
          className="ml-2 h-4 w-4 cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            setIconPopoverElement(e.currentTarget);
          }}
        ></EditIcon>
      </div>
    </div>
  );
};

export { IconInput };
