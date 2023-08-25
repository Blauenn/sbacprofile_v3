import React from "react"; // Import React if you haven't already
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { hover_transition } from "../../../constants/styles/transitions.style";

const sidebar_li = "flex justify-center sidebar-links";
const sidebar_i = "text-2xl text-white opacity-50 hover:opacity-100";

interface CurrentProp {
  title: string;
  to: string;
  icon: string;
  margin: string;
}

const SidebarLink = (props: CurrentProp) => {
  const { title, to, icon, margin } = props;

  return (
    <li className={`${sidebar_li} ${margin}`}>
      <Tooltip
        title={<h1 className="text-sm p-1">{title}</h1>}
        placement="right"
        arrow
        disableInteractive>
        <NavLink to={to}>
          <i className={`${icon} ${sidebar_i} ${hover_transition}`}></i>
        </NavLink>
      </Tooltip>
    </li>
  );
};

export default SidebarLink;
