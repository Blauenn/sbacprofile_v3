import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { change_to_date } from "../../../functions/getDates.function";

interface CurrentComponentProp {
  status: number;
  create_datetime: string;
}

const Student_club_information_requestStatus = (
  props: CurrentComponentProp
) => {
  const { status, create_datetime } = props;

  const { t } = useTranslation();

  return status === 1 ? (
    <>
      <h1 className="text-xl font-semibold mb-2">
        {t("Student_club_pendingApproval_message")}...
      </h1>
      <h1 className="opacity-50 mb-4">
        {formatDistanceToNow(change_to_date(create_datetime), {
          addSuffix: true,
        }).replace("about ", "")}
      </h1>
    </>
  ) : (
    <>
      <h1 className="text-xl font-semibold text-red-500 mb-2">
        {t("Student_club_rejected_message")}
      </h1>
      <h1 className="opacity-50 mb-4">
        {formatDistanceToNow(change_to_date(create_datetime), {
          addSuffix: true,
        }).replace("about ", "")}
      </h1>
    </>
  );
};

export default Student_club_information_requestStatus;
