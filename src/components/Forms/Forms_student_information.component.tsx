import { useEffect } from "react";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import {
  get_student_classroom_from_ID,
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_from_ID,
} from "../../functions/getFromID.function";

// Contexts //
import { useContext_Students } from "../../context/Students.context";
import { Major_To_Background_Color } from "../../constants/Majors.constant";

interface CurrentComponentProp {
  form_ID: number | undefined;
  form_student_ID: number;
}

const Forms_student_information = (props: CurrentComponentProp) => {
  const { form_ID, form_student_ID } = props;

  const { students, fetchStudents } = useContext_Students();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  return (
    <div className="flex flex-row gap-8">
      <img
        src={`${CDN_ENDPOINT}${get_student_image_from_ID(
          form_student_ID,
          students
        )}`}
        className={`${
          Major_To_Background_Color[
            get_student_major_from_ID(form_student_ID, students)
          ] ?? "bg-primary"
        } hidden sm:block w-[100px] rounded-full`}
      />
      <div>
        <h1 className="text-lg sm:text-xl opacity-50">
          {get_student_classroom_from_ID(form_student_ID, students)}
        </h1>
        <h1 className="text-xl sm:text-2xl font-semibold line-clamp-1 mb-2">
          {get_student_name_from_ID(form_student_ID, students)}
        </h1>
        <h1 className="text-md sm:text-lg opacity-50">Document #{form_ID}</h1>
      </div>
    </div>
  );
};

export default Forms_student_information;
