import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fade, Modal } from "@mui/material";
import { createPortal } from "react-dom";
import { logout } from "../../../functions/Login/Logout.function";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Sidebar_modal_logout = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { setAccessToken, setUserInfo, setIsLoggedIn } = useContext_Account();

  const { t } = useTranslation();

  const [shouldClear, setShouldClear] = useState(true);

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <>
          <Modal
            open={open}
            onClose={onModalClose}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <Fade in={open}>
              <div className="mx-4 sm:w-auto sm:mx-0 flex items-center flex-col sm:flex-row bg-white rounded-xl">
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
                      onClick={onModalClose}
                      className="bg-red-500 text-white text-lg rounded-xl px-4 py-2">
                      {t("Logout_cancelButton")}
                    </button>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </>,
        modal
      )
    : null;
};

export default Sidebar_modal_logout;
