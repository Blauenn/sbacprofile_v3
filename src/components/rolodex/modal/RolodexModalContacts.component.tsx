import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import { handle_copy } from "../../../functions/copy.function";
import { Major_Contacts_Hover } from "../../../constants/Majors.constant";

interface CurrentComponentProp {
  object: any;
}

const RolodexModal_contacts = (props: CurrentComponentProp) => {
  const { object } = props;

  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const formattedPhoneNumber = `${object.phone.substring(
    0,
    3
  )}-${object.phone.substring(3, 6)}-${object.phone.substring(6)}`;

  return (
    <div>
      <Tooltip
        title={
          <h1 className="text-[1rem] p-2">
            {copied
              ? t("RolodexCard_modal_copied_message")
              : t("RolodexCard_modal_clickToCopy_message")}
          </h1>
        }
        placement="top-start"
        arrow
        onClick={() => handle_copy(object.email, setCopied)}>
        <h1
          className={`"lg:mb-4 text-lg font-semibold cursor-pointer" ${
            Major_Contacts_Hover[object.major]
          } mb-2 truncate`}>
          <i className="me-4 fa-solid fa-at"></i>
          {object.email}
        </h1>
      </Tooltip>
      {object.phone ? (
        <Tooltip
          title={
            <h1 className="text-[1rem] p-2">
              {copied
                ? t("RolodexCard_modal_copied_message")
                : t("RolodexCard_modal_clickToCopy_message")}
            </h1>
          }
          placement="top-start"
          arrow
          onClick={() => handle_copy(object.phone, setCopied)}>
          <h1
            className={`"lg:mb-4 text-lg font-semibold cursor-pointer" ${
              Major_Contacts_Hover[object.major]
            } mb-2`}>
            <i className="me-4 fa-solid fa-phone"></i>
            {object.phone ? `${formattedPhoneNumber}` : "Not Given"}
          </h1>
        </Tooltip>
      ) : null}
      {object.line_ID ? (
        <Tooltip
          title={
            <h1 className="text-[1rem] p-2">
              {copied
                ? t("RolodexCard_modal_copied_message")
                : t("RolodexCard_modal_clickToCopy_message")}
            </h1>
          }
          placement="top-start"
          arrow
          onClick={() => handle_copy(object.line_ID, setCopied)}>
          <h1
            className={`"lg:mb-4 text-lg font-semibold cursor-pointer" ${
              Major_Contacts_Hover[object.major]
            }`}>
            <i className="me-4 fa-brands fa-line"></i>
            {object.line_ID ? object.line_ID.toLowerCase() : "Not Given"}
          </h1>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default RolodexModal_contacts;
