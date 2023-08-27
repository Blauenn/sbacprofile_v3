import { useEffect } from "react";
import { createPortal } from "react-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import { getData } from "../../../functions/fetchFromAPI.function";
import ModalCloseButton from "../../misc/common/ModalCloseButton.component";
import RolodexModal_contacts from "./RolodexModalContacts.component";
import RolodexModal_image from "./RolodexModal_image.component";
import { MajorName, MajorNameThai } from "../../../constants/Majors.constant";
import { LevelName, LevelNameThai } from "../../../constants/Levels.constant";
import { API_ENDPOINT } from "../../../constants/API_ENDPOINT";

// Contexts //
import { useContext_Classrooms } from "../../../context/Classrooms.context";

const RolodexModal = (props: any) => {
  const { profile, object, open, onCloseHandler } = props;

  const { t } = useTranslation();

  const { classrooms, setClassrooms } = useContext_Classrooms();

  useEffect(() => {
    if (classrooms.length === 0) {
      // Classroom //
      getData(`${API_ENDPOINT}/api/v1/classroom`, (result: any) => {
        setClassrooms(result);
      });
    }
  }, []);

  // Only do checks if the profile is a teacher. //
  let matchedClassrooms;
  if (profile === "teacher") {
    const findClassroomByTeacherID = (teacherID: number, classrooms: any) => {
      const matchedClassrooms = classrooms.filter(
        (classroom: any) => classroom.classroom_homeroom_teacher === teacherID
      );

      if (matchedClassrooms.length > 0) {
        return matchedClassrooms.map(
          ({
            classroom_ID,
            classroom_level,
            classroom_class,
          }: {
            classroom_ID: number;
            classroom_level: number;
            classroom_class: number;
          }) => ({
            classroom_ID: classroom_ID,
            classroom_level: classroom_level,
            classroom_class: classroom_class,
          })
        );
      }

      return [{ classroom_ID: 0, classroom_level: 0, classroom_class: 0 }];
    };

    matchedClassrooms = findClassroomByTeacherID(object.ID, classrooms);
  }

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <>
          <Modal
            open={open}
            onClose={onCloseHandler}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <div className="relative w-full mx-4 sm:w-auto sm:mx-0 flex items-center flex-col sm:flex-row overflow-hidden bg-white rounded-xl">
              <ModalCloseButton functionToRun={onCloseHandler} />
              <div className="flex flex-col lg:flex-row py-8 px-4 w-full lg:gap-x-4">
                <div className="flex items-center flex-col gap-1 mb-4 | w-full lg:mb-0 lg:w-1/2">
                  <RolodexModal_image image={object.image} />
                  <h1 className="font-semibold opacity-75">{object.ID}</h1>
                </div>
                <div className="flex justify-start items-start flex-col px-4 lg:px-0 lg:mt-4">
                  <div className="mb-4 lg:mb-8">
                    {i18n.language === "th" ? (
                      <>
                        <h1 className="text-3xl font-semibold mb-2">
                          {object.first_name_thai} {object.last_name_thai}
                        </h1>
                        <h1 className="text-2xl">
                          {object.first_name} {object.last_name}
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-semibold mb-2">
                          {object.first_name} {object.last_name}
                        </h1>
                        <h1 className="text-2xl">
                          {object.first_name_thai} {object.last_name_thai}
                        </h1>
                      </>
                    )}
                    {object.nickname && object.nickname_thai && (
                      <h1 className="text-2xl font-semibold mt-2">
                        {i18n.language === "th"
                          ? `${object.nickname_thai} · ${object.nickname}`
                          : `${object.nickname} · ${object.nickname_thai}`}
                      </h1>
                    )}
                  </div>
                  <div className="mb-4 lg:mb-8">
                    <h1 className="text-xl font-semibold">
                      {i18n.language === "th"
                        ? MajorNameThai[object.major]
                        : MajorName[object.major]}
                    </h1>
                    {profile === "student" ? (
                      <h1 className="text-xl">
                        {t("profile_rolodex_studentClass", {
                          level:
                            i18n.language === "th"
                              ? LevelNameThai[object.level]
                              : LevelName[object.level],
                          classroom: object.class,
                        })}
                      </h1>
                    ) : (
                      matchedClassrooms.map((matchedClassroom: any) =>
                        matchedClassroom.classroom_ID != 0 ? (
                          <h1
                            key={matchedClassroom.classroom_ID}
                            className="text-xl">
                            {t("profile_rolodex_teacherClass", {
                              level:
                                i18n.language === "th"
                                  ? LevelNameThai[
                                      matchedClassroom.classroom_level
                                    ]
                                  : LevelName[matchedClassroom.classroom_level],
                              classroom: matchedClassroom.classroom_class,
                            })}
                          </h1>
                        ) : (
                          <h1
                            key={matchedClassroom.classroom_ID}
                            className="text-xl">
                            {t("profile_rolodex_noHomeroomClass")}
                          </h1>
                        )
                      )
                    )}
                  </div>
                  <div className="w-11/12 lg:w-full">
                    <RolodexModal_contacts profile={profile} object={object} />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>,
        modal
      )
    : null;
};

export default RolodexModal;