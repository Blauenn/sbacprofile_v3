import { useState } from "react";
import { Tooltip } from "@mui/material";
import { handleCopy } from "../../../functions/copy.function";
import { MajorContactsHover } from "../../../constants/Majors.constant";

const RolodexModal_contacts = (props: any) => {
  const { object } = props;

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
            {copied ? "Copied" : "Click to copy"}
          </h1>
        }
        placement="top-start"
        arrow
        onClick={() => handleCopy(object.email, setCopied)}>
        <h1
          className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
            MajorContactsHover[object.major]
          } mb-2 truncate`}>
          <i className="me-4 fa-solid fa-at"></i>
          {object.email}
        </h1>
      </Tooltip>
      {object.phone ? (
        <Tooltip
          title={
            <h1 className="text-[1rem] p-2">
              {copied ? "Copied" : "Click to copy"}
            </h1>
          }
          placement="top-start"
          arrow
          onClick={() => handleCopy(object.phone, setCopied)}>
          <h1
            className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
              MajorContactsHover[object.major]
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
              {copied ? "Copied" : "Click to copy"}
            </h1>
          }
          placement="top-start"
          arrow
          onClick={() => handleCopy(object.line_ID, setCopied)}>
          <h1
            className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
              MajorContactsHover[object.major]
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
