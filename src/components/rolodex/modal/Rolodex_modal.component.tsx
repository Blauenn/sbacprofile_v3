import { useEffect } from "react";
import i18n from "i18next";
import Custom_Modal from "../../custom/Custom_Modal";
import { Major_To_Background_Color } from "../../../constants/Majors.constant";

// Contexts //
import { useContext_Classrooms } from "../../../context/Classrooms.context";
import Rolodex_modal_image from "./Rolodex_modal_image.component";
import Rolodex_modal_contacts from "./Rolodex_modal_contacts.component";
import Rolodex_modal_names from "./content/Rolodex_modal_names.component";
import Rolodex_modal_majorAndClassroom from "./content/Rolodex_modal_majorAndClassroom.component";

interface CurrentComponentProp {
  profile: string;
  object: any;
  open: boolean;
  onModalClose: any;
}

const Rolodex_modal = (props: CurrentComponentProp) => {
  const { profile, object, open, onModalClose } = props;

  const { classrooms, fetchClassrooms } = useContext_Classrooms();

  useEffect(() => {
    if (classrooms.length === 0) {
      fetchClassrooms();
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

  // Icons for the modal header to display. //
  let profileIcon;
  if (profile === "teacher") {
    profileIcon = "fa-solid fa-chalkboard-user";
  } else {
    profileIcon = "fa-solid fa-graduation-cap";
  }

  return (
    <Custom_Modal
      open={open}
      onModalClose={onModalClose}
      icon={profileIcon}
      title={
        i18n.language === "th"
          ? `${object.first_name_thai} ${object.last_name_thai}`
          : `${object.first_name} ${object.last_name}`
      }>
      <div className="flex flex-col lg:flex-row lg:gap-12 px-2">
        <div className="flex items-center flex-col gap-1 mb-4 | w-full lg:mb-0 lg:w-1/2">
          <Rolodex_modal_image
            image={object.image}
            majorColor={Major_To_Background_Color[object.major]}
          />
          <h1 className="font-semibold opacity-75">{object.ID}</h1>
        </div>
        <div className="flex justify-start items-start flex-col px-4 lg:px-0 lg:mt-4">
          <div className="flex flex-col gap-4">
            <Rolodex_modal_names object={object} />
            <Rolodex_modal_majorAndClassroom
              object={object}
              profile={profile}
              matchedClassrooms={matchedClassrooms}
            />
            <div className="w-11/12 lg:w-full">
              <Rolodex_modal_contacts object={object} />
            </div>
          </div>
        </div>
      </div>
    </Custom_Modal>
  );
};

export default Rolodex_modal;
