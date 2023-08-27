import { useState } from "react";
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

  if (profile === "student") {
    return (
      <>
        <div
          className={`${RolodexCard_style} ${
            MajorToBackgroundColor[object.student_major]
          } ${MajorToBorderColor[object.student_major]}`}
          onClick={() => setModalOpen(true)}>
          <div className="absolute right-4 text-sm font-semibold opacity-75">
            {ShortLevelName[object.student_level]}/{object.student_class}
          </div>
          {/* If the user is artifical. */}
          {object.student_ID.toString().startsWith("5") ? (
            <RolodexCard_robotIcon />
          ) : null}
          <RolodexCard_image image={object.student_image} />
          <h1 className="text-sm mb-2">{object.student_ID}</h1>
          <div className="w-5/6">
            <h1 className="text-2xl text-center font-semibold mb-4 truncate block">
              {object.student_first_name}{" "}
              {object.student_last_name.substring(0, 3)}.
            </h1>
          </div>
          <RolodexCard_contacts
            profile={profile}
            object={object}
            major={object.student_major}
          />
        </div>
        <RolodexModal
          profile={profile}
          object={object}
          open={modalOpen}
          onCloseHandler={onModalClose}
        />
      </>
    );
  } else {
    return (
      <>
        <div
          className={`${RolodexCard_style} ${
            MajorToBackgroundColor[object.teacher_major]
          } ${MajorToBorderColor[object.teacher_major]}`}
          onClick={() => setModalOpen(true)}>
          {/* If the user is artifical. */}
          {object.teacher_ID.toString().startsWith("4") ? (
            <RolodexCard_robotIcon />
          ) : null}
          <RolodexCard_image image={object.teacher_image} />
          <h1 className="text-sm mb-2">{object.teacher_ID}</h1>
          <div className="w-5/6">
            <h1 className="text-2xl text-center font-semibold mb-4 truncate block">
              {object.teacher_first_name}{" "}
              {object.teacher_last_name.substring(0, 3)}.
            </h1>
          </div>
          <RolodexCard_contacts
            profile={profile}
            object={object}
            major={object.teacher_major}
          />
        </div>
        <RolodexModal
          profile={profile}
          object={object}
          open={modalOpen}
          onCloseHandler={onModalClose}
        />
      </>
    );
  }
};

export default RolodexCard;
