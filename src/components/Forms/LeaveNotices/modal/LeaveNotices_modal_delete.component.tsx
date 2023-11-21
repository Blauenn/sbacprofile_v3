import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import {
  change_to_locale_date,
  get_day_amount_between_dates,
  get_day_from_date,
} from "../../../../functions/getDates.function";
import { handleLeaveNoticeDelete } from "../../../../functions/Forms/LeaveNotices/Admin_leaveNotices.function";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";
import { Day_Colors } from "../../../../constants/Misc.constant";

// Contexts //
import { useContext_LeaveNotices } from "../../../../context/LeaveNotices.context";

interface CurrentComponentProp {
  leaveNotice: LeaveNotice;
  open: boolean;
  onModalClose: () => void;
}

const LeaveNotices_modal_delete = (props: CurrentComponentProp) => {
  const { leaveNotice, open, onModalClose } = props;

  const { fetchLeaveNotices } = useContext_LeaveNotices();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleLeaveNoticeDelete(
      leaveNotice.leave_notice_ID
    );

    if (submissionStatus) {
      fetchLeaveNotices();

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("LeaveNotices_students_delete_modal_header")}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4">
          <h1 className="opacity-50">
            {/* TODO: THIS PAGE REQUIRES TRANSLATION */}
            {t("LeaveNotices_students_delete_modal_message")}
          </h1>
          <div className="flex flex-col gap-4 mb-2">
            {/* Dates */}
            <div className="border rounded-xl p-6">
              {get_day_amount_between_dates(
                leaveNotice.leave_notice_start_datetime,
                leaveNotice.leave_notice_end_datetime
              ) -
                1 ==
              0 ? (
                /* Start date */
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold opacity-50">
                    {t("LeaveNotices_students_delete_modal_dateOfLeave_label")}
                  </h1>
                  <h1
                    className={`text-xl font-semibold ${
                      Day_Colors[
                        get_day_from_date(
                          leaveNotice.leave_notice_start_datetime
                        )
                      ]
                    }`}>
                    {change_to_locale_date(
                      leaveNotice.leave_notice_start_datetime
                    )}{" "}
                    -{" "}
                    {
                      change_to_locale_date(
                        leaveNotice.leave_notice_end_datetime
                      ).split(",")[1]
                    }
                  </h1>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Start date */}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-md font-semibold opacity-50">
                      {t("LeaveNotices_students_delete_modal_startDate_label")}
                    </h1>
                    <h1
                      className={`text-xl font-semibold ${
                        Day_Colors[
                          get_day_from_date(
                            leaveNotice.leave_notice_start_datetime
                          )
                        ]
                      }`}>
                      {
                        change_to_locale_date(
                          leaveNotice.leave_notice_start_datetime
                        ).split(",")[0]
                      }
                    </h1>
                  </div>
                  {/* End date */}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-md font-semibold opacity-50">
                      {t("LeaveNotices_students_delete_modal_endDate_label")}
                    </h1>
                    <h1
                      className={`text-xl font-semibold ${
                        Day_Colors[
                          get_day_from_date(
                            leaveNotice.leave_notice_end_datetime
                          )
                        ]
                      }`}>
                      {
                        change_to_locale_date(
                          leaveNotice.leave_notice_end_datetime
                        ).split(",")[0]
                      }
                    </h1>
                  </div>
                </div>
              )}
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1 border rounded-xl p-6">
              <h1 className="text-md font-semibold opacity-50">
                {t("LeaveNotices_students_delete_modal_description_label")}
              </h1>
              <h1 className="text-xl">
                {leaveNotice.leave_notice_description}
              </h1>
            </div>
          </div>
          {/* Submit button */}
          <Info_submit_button
            text={t("LeaveNotices_students_delete_modal_submit_button_title")}
            successText={t(
              "LeaveNotices_students_delete_modal_submit_success_message"
            )}
            icon="fa-solid fa-trash-can"
            color="border-red-500 hover:bg-red-500 text-red-500"
            isSubmitting={isSubmitting}
            isSuccess={isDeleteSuccess}
            onClickFunction={setObjectAndSubmit}
          />
        </div>
      </div>
    </Custom_Modal>
  );
};

export default LeaveNotices_modal_delete;
