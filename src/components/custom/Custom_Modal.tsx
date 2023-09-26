import { createPortal } from "react-dom";
import { Modal } from "@mui/material";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
  icon?: string;
  title: string;
  overflow?: boolean;
  children: React.ReactNode;
}

const Custom_Modal = (props: CurrentComponentProp) => {
  const { open, onModalClose, icon, title, overflow, children } = props;

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <>
          <Modal
            open={open}
            onClose={onModalClose}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <div
              className={
                overflow
                  ? "relative w-full mx-4 sm:w-auto sm:mx-0 flex items-center flex-col overflow-scroll h-5/6 bg-white rounded-xl"
                  : "relative w-full mx-4 sm:w-auto sm:mx-0 flex items-center flex-col bg-white rounded-xl"
              }>
              <div className="flex flex-row justify-between items-center px-4 border-b w-full min-h-[55px]">
                <div className="line-clamp-1">
                  {icon ? (
                    <h1>
                      <i className={`${icon} me-2`}></i>
                      {title}
                    </h1>
                  ) : (
                    <h1>{title}</h1>
                  )}
                </div>
                <button
                  onClick={onModalClose}
                  className="flex justify-center items-center bg-red-600 hover:bg-red-700 rounded-full w-[25px] h-[25px]"></button>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col py-8 px-4 w-full lg:gap-x-4">
                  {children}
                </div>
              </div>
            </div>
          </Modal>
        </>,
        modal
      )
    : null;
};

export default Custom_Modal;
