import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { hover_transition } from "../../../constants/styles/transitions.style";
import SidebarLink from "./SidebarLink.component";

const Sidebar = () => {
  // Tailwind classes //
  const sidebar_parent =
    "fixed flex justify-center h-full w-12 bg-standardBlack";
  const sidebar_first_child = "flex justify-between h-5/6";
  const sidebar_second_child = "flex justify-between flex-col";
  const sidebar_ul = "flex flex-col h-full py-5 list-none";
  const sidebar_li = "flex justify-center sidebar-links";
  const sidebar_i = "text-2xl text-white opacity-50 hover:opacity-100";

  return (
    <div className={sidebar_parent}>
      <nav className={sidebar_first_child}>
        <div className={sidebar_second_child}>
          <ul className={sidebar_ul}>
            {/* Home */}
            <SidebarLink title="Home" to="/home" icon="fa-solid fa-home" margin="" />

            {/* User dashboard */}
            <SidebarLink title="Dashboard" to="/dashboard" icon="fa-solid fa-circle-user" margin="mt-auto" />

            {/* Teachers */}
            <SidebarLink title="Teachers" to="/teachers" icon="fa-solid fa-chalkboard-user" margin="mt-auto mb-4" />
            {/* Students */}
            <SidebarLink title="Students" to="/students" icon="fa-solid fa-graduation-cap" margin="mb-8" />
            {/* Clubs */}
            <SidebarLink title="Clubs" to="/clubs" icon="fa-solid fa-puzzle-piece" margin="" />

            {/* Settings */}
            <SidebarLink title="Settings" to="/settings" icon="fa-solid fa-gear" margin="mt-auto mb-4" />
            {/* Logout button */}
            <li className={`${sidebar_li}`}>
              <Tooltip
                title={<h1 className="text-sm p-1">Logout</h1>}
                placement="right"
                arrow
                disableInteractive>
                <i
                  onClick={() => {
                    console.log("Logged out.");
                  }}
                  className={`fa-solid fa-right-from-bracket rotate-180 cursor-pointer ${sidebar_i} ${hover_transition}`}></i>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
