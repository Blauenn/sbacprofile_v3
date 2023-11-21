import { useEffect } from "react";
import i18n from "i18next";
import { Major_To_Background_Color } from "../../../constants/Majors.constant";
import {
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_thai_from_ID,
  get_student_name_from_ID,
} from "../../../functions/getFromID.function";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Students } from "../../../context/Students.context";

interface CurrentComponentProp {
  student_ID: number;
}

const Club_studentInfo = (props: CurrentComponentProp) => {
  const { student_ID } = props;

  const { students, fetchStudents } = useContext_Students();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  return (
    <div className="flex flex-row items-center gap-4">
      <img
        src={`${CDN_ENDPOINT}${get_student_image_from_ID(
          student_ID,
          students
        )}`}
        className={`${
          Major_To_Background_Color[
            get_student_major_from_ID(student_ID, students)
          ]
        } w-[32px] h-[32px] rounded-full`}
      />
      <h1 className="line-clamp-1">
        {i18n.language === "th"
          ? get_student_name_thai_from_ID(student_ID, students)
          : get_student_name_from_ID(student_ID, students)}
      </h1>
    </div>
  );
};

export default Club_studentInfo;
