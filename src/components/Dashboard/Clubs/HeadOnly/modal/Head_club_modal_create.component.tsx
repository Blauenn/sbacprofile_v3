import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { useEffect } from "react";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Head_club_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { majors, setMajors } = useContext_Majors();

  const { t } = useTranslation();

  useEffect(() => {
    // Majors //
    // Only fetch when empty //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const handleModalClose = () => {
    onModalClose();
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-pencil"
      title={t("Admin_Clubs_create_modal_header")}
      altIcon="fa-solid fa-circle-check text-green-500"
      altTitle={t("Admin_Clubs_create_modal_submit_success_message")}
      useAltTitle={false}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        <h1>TODO: Please build this</h1>
      </div>
    </Custom_Modal>
  );
};

export default Head_club_modal_create;
