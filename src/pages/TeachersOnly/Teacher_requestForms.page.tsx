import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Classroom, RequestForm } from "../../interfaces/common.interface";
import { get_classroom_from_student_ID } from "../../functions/getFromID.function";
import RequestForms_table from "../../components/Forms/RequestForms/table/RequestForms_table.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_RequestForms } from "../../context/RequestForms.context";
import { useContext_Students } from "../../context/Students.context";
import { useContext_Classrooms } from "../../context/Classrooms.context";

const Teacher_requestForms = () => {
  const { userInfo } = useContext_Account();
  const { requestForms, fetchRequestForms } = useContext_RequestForms();
  const { students, fetchStudents } = useContext_Students();
  const { classrooms, fetchClassrooms } = useContext_Classrooms();

  const { t } = useTranslation();

  useEffect(() => {
    if (requestForms.length === 0) {
      fetchRequestForms();
    }
    if (students.length === 0) {
      fetchStudents();
    }
    if (classrooms.length === 0) {
      fetchClassrooms();
    }
  }, []);

  const requestFormWithClassroom = requestForms.map(
    (requestForm: RequestForm) => {
      const studentClassroom = get_classroom_from_student_ID(
        requestForm.request_form_student_ID,
        students
      );
      return {
        ...requestForm,
        request_form_student_classroom: studentClassroom,
      };
    }
  );
  // Only request form that comes from the student within the user's class. //
  const filteredClassrooms = classrooms.filter(
    (classroom: Classroom) =>
      classroom.classroom_homeroom_teacher === userInfo.profile_ID
  );
  // The class that the current user is the homeroom teacher of. //
  const formattedClassrooms = filteredClassrooms.map((classroom: Classroom) => {
    return `${classroom.classroom_level}/${classroom.classroom_class}`;
  });

  const homeroomStudentRequestForms = [...requestFormWithClassroom]
    .reverse()
    .filter((requestForm: RequestForm) => {
      if (requestForm.request_form_student_classroom) {
        return formattedClassrooms.includes(
          requestForm.request_form_student_classroom
        );
      }
    });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("RequestForms_teachers_myRequestForms_title")}
        </h1>

        <RequestForms_table requestForms={homeroomStudentRequestForms} />
      </div>
    </div>
  );
};

export default Teacher_requestForms;
