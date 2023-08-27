import { useState } from "react";
import { Tooltip } from "@mui/material";
import { handleCopy } from "../../../functions/copy.function";
import { MajorContactsHover } from "../../../constants/Majors.constant";

const RolodexModal_contacts = (props: any) => {
  const { profile, object } = props;

  const [copied, setCopied] = useState(false);

  if (profile === "student") {
    const formattedPhoneNumber = `${object.student_phone.substring(
      0,
      3
    )}-${object.student_phone.substring(3, 6)}-${object.student_phone.substring(
      6
    )}`;

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
          onClick={() => handleCopy(object.student_email, setCopied)}>
          <h1
            className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
              MajorContactsHover[object.student_major]
            } mb-2 truncate`}>
            <i className="me-4 fa-solid fa-at"></i>
            {object.student_email}
          </h1>
        </Tooltip>
        {object.student_phone ? (
          <Tooltip
            title={
              <h1 className="text-[1rem] p-2">
                {copied ? "Copied" : "Click to copy"}
              </h1>
            }
            placement="top-start"
            arrow
            onClick={() => handleCopy(object.student_phone, setCopied)}>
            <h1
              className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
                MajorContactsHover[object.student_major]
              } mb-2`}>
              <i className="me-4 fa-solid fa-phone"></i>
              {object.student_phone ? `${formattedPhoneNumber}` : "Not Given"}
            </h1>
          </Tooltip>
        ) : null}
        {object.student_line_ID ? (
          <Tooltip
            title={
              <h1 className="text-[1rem] p-2">
                {copied ? "Copied" : "Click to copy"}
              </h1>
            }
            placement="top-start"
            arrow
            onClick={() => handleCopy(object.student_line_ID, setCopied)}>
            <h1
              className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
                MajorContactsHover[object.student_major]
              }`}>
              <i className="me-4 fa-brands fa-line"></i>
              {object.student_line_ID
                ? object.student_line_ID.toLowerCase()
                : "Not Given"}
            </h1>
          </Tooltip>
        ) : null}
      </div>
    );
  } else {
    const formattedPhoneNumber = `${object.teacher_phone.substring(
      0,
      3
    )}-${object.teacher_phone.substring(3, 6)}-${object.teacher_phone.substring(
      6
    )}`;

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
          onClick={() => handleCopy(object.teacher_email, setCopied)}>
          <h1
            className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
              MajorContactsHover[object.teacher_major]
            } mb-2 truncate`}>
            <i className="me-4 fa-solid fa-at"></i>
            {object.teacher_email}
          </h1>
        </Tooltip>
        {object.teacher_phone ? (
          <Tooltip
            title={
              <h1 className="text-[1rem] p-2">
                {copied ? "Copied" : "Click to copy"}
              </h1>
            }
            placement="top-start"
            arrow
            onClick={() => handleCopy(object.teacher_phone, setCopied)}>
            <h1
              className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
                MajorContactsHover[object.teacher_major]
              } mb-2`}>
              <i className="me-4 fa-solid fa-phone"></i>
              {object.teacher_phone ? `${formattedPhoneNumber}` : "Not Given"}
            </h1>
          </Tooltip>
        ) : null}
        {object.teacher_line_ID ? (
          <Tooltip
            title={
              <h1 className="text-[1rem] p-2">
                {copied ? "Copied" : "Click to copy"}
              </h1>
            }
            placement="top-start"
            arrow
            onClick={() => handleCopy(object.teacher_line_ID, setCopied)}>
            <h1
              className={`"lg:mb-4 text-xl font-semibold cursor-pointer" ${
                MajorContactsHover[object.teacher_major]
              }`}>
              <i className="me-4 fa-brands fa-line"></i>
              {object.teacher_line_ID
                ? object.teacher_line_ID.toLowerCase()
                : "Not Given"}
            </h1>
          </Tooltip>
        ) : null}
      </div>
    );
  }
};

export default RolodexModal_contacts;
