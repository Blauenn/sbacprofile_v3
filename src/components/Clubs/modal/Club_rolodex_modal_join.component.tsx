import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../custom/Custom_Modal";
import { handleClubJoinRequestCreate } from "../../../functions/Clubs/Clubs.function";
import { getData } from "../../../functions/fetchFromAPI.function";
import Info_submit_button from "../../Dashboard/Buttons/Info_submit_button.component";
import {
  Major_To_Background_Color_Hover,
  Major_To_Border_Color,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Clubs } from "../../../context/Clubs.context";

interface CurrentComponentProp {
  club: any;
  open: any;
  onModalClose: any;
}

const Club_rolodex_modal_join = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { setClubJoinRequests } = useContext_Clubs();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleClubJoinRequestCreate(
      club.club_ID,
      userInfo.profile_ID
    );

    if (submissionStatus) {
      //   getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
      //     setClubJoinRequest(result);
      //   });

      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsSubmitSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={onModalClose}
      title={t("Clubs_joinClub_modal_header")}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-semibold opacity-50">
            {t("Clubs_joinClub_modal_title")}
          </h1>
          <h1
            className={`text-3xl font-bold mb-2 ${
              Major_To_Text_Color[club.club_major]
            }`}>
            {club.club_name}
          </h1>
        </div>
        <h1 className="text-sm opacity-50">
          {t("Clubs_joinClub_modal_description")}
        </h1>
        <Info_submit_button
          text={t("Clubs_modal_joinClub_button_title")}
          successText={t("Clubs_modal_submit_success_message")}
          icon="fa-solid fa-right-from-bracket"
          color={`${Major_To_Border_Color[club.club_major]} ${
            Major_To_Text_Color[club.club_major]
          } ${Major_To_Background_Color_Hover[club.club_major]}`}
          isSubmitting={isSubmitting}
          isSuccess={isSubmitSuccess}
          onClickFunction={() => {
            setObjectAndSubmit();
          }}
        />
      </div>
    </Custom_Modal>
  );
};

export default Club_rolodex_modal_join;
