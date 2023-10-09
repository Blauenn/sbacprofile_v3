import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import SidebarLink from "./SidebarLink.component";
import { getDataAuthenticated } from "../../../functions/fetchFromAPI.function";
import { hover_transition } from "../../../constants/styles/transitions.style";
import { Default_Image } from "../../../constants/Misc.constant";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import Sidebar_modal_logout from "./Sidebar_modal_logout.component";
import { Major_To_Background_Color } from "../../../constants/Majors.constant";

const Sidebar = () => {
  const { accessToken, userInfo } = useContext_Account();

  const { t } = useTranslation();

  // Tailwind classes //
  const sidebar_parent =
    "fixed flex justify-center h-full w-12 bg-standardBlack";
  const sidebar_first_child = "flex justify-between h-5/6";
  const sidebar_second_child = "flex justify-between flex-col";
  const sidebar_ul = "flex flex-col h-full py-5 list-none";
  const sidebar_li = "flex justify-center sidebar-links";
  const sidebar_i = "text-2xl text-white opacity-50 hover:opacity-100";

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");

    if (!storedProfileImage) {
      getDataAuthenticated(
        `${API_ENDPOINT}/api/v1/image/getImage`,
        accessToken,
        (result: any) => {
          setProfileImage(result.profile_image);
          localStorage.setItem("profileImage", result.profile_image);
        }
      );
    } else {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={sidebar_parent}>
      <nav className={sidebar_first_child}>
        <div className={sidebar_second_child}>
          <ul className={sidebar_ul}>
            {/* Home */}
            <SidebarLink
              title={t("Sidebar_home")}
              to="/home"
              icon="fa-solid fa-home"
              margin="mb-4"
            />
            {/* Announcements */}
            <SidebarLink
              title={t("Sidebar_announcements")}
              to="/announcements"
              icon="fa-solid fa-bullhorn"
              margin=""
            />

            {userInfo.length !== 0 ? (
              /* User dashboard */
              <li className={`${sidebar_li} mt-auto mx-1`}>
                <Tooltip
                  title={
                    <h1 className="text-sm p-1">{t("Sidebar_dashboard")}</h1>
                  }
                  placement="right"
                  arrow
                  disableInteractive>
                  <NavLink to="/dashboard">
                    <div
                      className={`${
                        Major_To_Background_Color[userInfo.profile_major]
                      } rounded-full overflow-hidden`}>
                      <img
                        src={`${CDN_ENDPOINT}${profileImage}`}
                        onError={(e) => {
                          e.currentTarget.src = Default_Image;
                        }}
                      />
                    </div>
                  </NavLink>
                </Tooltip>
              </li>
            ) : (
              <li className={`${sidebar_li} mt-auto`}>
                <div className="w-[30px] h-[30px] rounded-full bg-white opacity-50"></div>
              </li>
            )}

            {/* Teachers */}
            <SidebarLink
              title={t("Sidebar_teachers")}
              to="/teachers"
              icon="fa-solid fa-chalkboard-user"
              margin="mt-auto mb-4"
            />
            {/* Students */}
            <SidebarLink
              title={t("Sidebar_students")}
              to="/students"
              icon="fa-solid fa-graduation-cap"
              margin="mb-8"
            />
            {/* Clubs */}
            <SidebarLink
              title={t("Sidebar_clubs")}
              to="/clubs"
              icon="fa-solid fa-puzzle-piece"
              margin=""
            />

            {/* Settings */}
            <SidebarLink
              title={t("Sidebar_settings")}
              to="/settings"
              icon="fa-solid fa-gear"
              margin="mt-auto mb-4"
            />
            {/* Logout button */}
            <li className={`${sidebar_li}`}>
              <Tooltip
                title={<h1 className="text-sm p-1">{t("Sidebar_logout")}</h1>}
                placement="right"
                arrow
                disableInteractive>
                <i
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className={`fa-solid fa-right-from-bracket rotate-180 cursor-pointer ${sidebar_i} ${hover_transition}`}></i>
              </Tooltip>
              <Sidebar_modal_logout
                open={modalOpen}
                onModalClose={onModalClose}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
