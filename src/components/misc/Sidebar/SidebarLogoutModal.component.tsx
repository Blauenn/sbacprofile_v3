import { useState } from "react";
import { Modal } from "@mui/material";
import { createPortal } from "react-dom";
import { logout } from "../../../functions/Login/Logout.function";
import { useContext_Account } from "../../../context/Account.context";
import { useTranslation } from "react-i18next";

const SidebarLogoutModal = (props: any) => {
  const { setAccessToken, setUserInfo, setIsLoggedIn } = useContext_Account();

  const { t } = useTranslation();

  const { open, onCloseHandler } = props;

  const [shouldClear, setShouldClear] = useState(true);

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <>
          <Modal
            open={open}
            onClose={onCloseHandler}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <div className="relative w-full mx-4 sm:w-auto sm:mx-0 flex items-center flex-col sm:flex-row overflow-hidden bg-white rounded-xl">
              <div className="px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">
                  <i className="fa-solid fa-right-from-bracket rotate-180 me-4"></i>
                  {t("Logout_title")}
                </h1>
                <h1 className="text-xl opacity-50 mb-8">
                  {t("Logout_title")}
                </h1>
                <div className="flex flex-row justify-end gap-4 w-full">
                  <button
                    onClick={() => {
                      logout(
                        setAccessToken,
                        setUserInfo,
                        setIsLoggedIn,
                        shouldClear,
                        setShouldClear
                      );
                    }}
                    className="border border-red-500 text-red-500 text-lg rounded-xl px-4 py-2">
                    {t("Logout_confirmButton")}
                  </button>
                  <button
                    onClick={onCloseHandler}
                    className="bg-red-500 text-white text-lg rounded-xl px-4 py-2">
                    {t("Logout_cancelButton")}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>,
        modal
      )
    : null;
};

export default SidebarLogoutModal;
