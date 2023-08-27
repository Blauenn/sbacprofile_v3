import { useState } from "react";
import i18n from "i18next";
import RolodexCard_robotIcon from "./RolodexCard_robotIcon.component";
import RolodexCard_image from "./RolodexCard_image.component";
import RolodexCard_contacts from "./RolodexCard_contacts.component";
import RolodexModal from "../modal/RolodexModal.component";
import { RolodexCard_style } from "../../../constants/styles/rolodex.style";
import {
  MajorToBackgroundColor,
  MajorToBorderColor,
} from "../../../constants/Majors.constant";
import { ShortLevelName } from "../../../constants/Levels.constant";

const RolodexCard = (props: any) => {
  const { profile, object } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  // Remove profile names from the object key names. //
  let remappedObject;
  if (profile === "student") {
    remappedObject = {
      primary_ID: object.primary_student_ID,
      ID: object.student_ID,
      first_name: object.student_first_name,
      last_name: object.student_last_name,
      nickname: object.student_nickname,
      first_name_thai: object.student_first_name_thai,
      last_name_thai: object.student_last_name_thai,
      nickname_thai: object.student_nickname_thai,
      major: object.student_major,
      level: object.student_level,
      class: object.student_class,
      phone: object.student_phone,
      line_ID: object.student_line_ID,
      image: object.student_image,
      email: object.student_email,
    };
  } else {
    remappedObject = {
      primary_ID: object.primary_teacher_ID,
      ID: object.teacher_ID,
      first_name: object.teacher_first_name,
      last_name: object.teacher_last_name,
      nickname: object.teacher_nickname,
      first_name_thai: object.teacher_first_name_thai,
      last_name_thai: object.teacher_last_name_thai,
      nickname_thai: object.teacher_nickname_thai,
      major: object.teacher_major,
      phone: object.teacher_phone,
      line_ID: object.teacher_line_ID,
      image: object.teacher_image,
      email: object.teacher_email,
    };
  }

  return (
    <>
      <div
        className={`${RolodexCard_style} ${
          MajorToBackgroundColor[remappedObject.major]
        } ${MajorToBorderColor[remappedObject.major]}`}
        onClick={() => setModalOpen(true)}>
        {profile === "student" ? (
          <div className="absolute right-4 text-sm font-semibold opacity-75">
            {ShortLevelName[remappedObject.level]}/{remappedObject.class}
          </div>
        ) : null}
        {/* If the user is artifical. */}
        {profile === "student" ? (
          remappedObject.ID.toString().startsWith("5") ? (
            <RolodexCard_robotIcon />
          ) : null
        ) : remappedObject.ID.toString().startsWith("4") ? (
          <RolodexCard_robotIcon />
        ) : null}
        <RolodexCard_image image={remappedObject.image} />
        <h1 className="text-sm mb-2">{remappedObject.ID}</h1>
        <div className="w-5/6">
          {i18n.language === "th" ? (
            <h1 className="text-2xl text-center font-semibold mb-4 truncate block">
              {remappedObject.first_name_thai}{" "}
              {remappedObject.last_name_thai.substring(0, 5)}.
            </h1>
          ) : (
            <h1 className="text-2xl text-center font-semibold mb-4 truncate block">
              {remappedObject.first_name}{" "}
              {remappedObject.last_name.substring(0, 3)}.
            </h1>
          )}
        </div>
        <RolodexCard_contacts object={remappedObject} />
      </div>
      <RolodexModal
        profile={profile}
        object={remappedObject}
        open={modalOpen}
        onCloseHandler={onModalClose}
      />
    </>
  );
};

export default RolodexCard;
