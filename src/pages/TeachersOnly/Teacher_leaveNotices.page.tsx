import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Classroom, LeaveNotice } from "../../interfaces/common.interface";
import { get_classroom_from_student_ID } from "../../functions/getFromID.function";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_Classrooms } from "../../context/Classrooms.context";
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";
import LeaveNotices_table from "../../components/Forms/LeaveNotices/table/LeaveNotices_table.component";

const Teacher_leaveNotices = () => {
  const { userInfo } = useContext_Account();
  const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();
  const { students, fetchStudents } = useContext_Students();
  const { classrooms, fetchClassrooms } = useContext_Classrooms();

  const { t } = useTranslation();

  useEffect(() => {
    if (leaveNotices.length === 0) {
      fetchLeaveNotices();
    }
    if (students.length === 0) {
      fetchStudents();
    }
    if (classrooms.length === 0) {
      fetchClassrooms();
    }
  }, []);

  const leaveNoticeWithClassroom = leaveNotices.map(
    (leaveNotice: LeaveNotice) => {
      const studentClassroom = get_classroom_from_student_ID(
        leaveNotice.leave_notice_student_ID,
        students
      );
      return {
        ...leaveNotice,
        leave_notice_student_classroom: studentClassroom,
      };
    }
  );
  // Only leave notice that comes from the student within the user's class. //
  const filteredClassrooms = classrooms.filter(
    (classroom: Classroom) =>
      classroom.classroom_homeroom_teacher === userInfo.profile_ID
  );
  // The class that the current user is the homeroom teacher of. //
  const formattedClassrooms = filteredClassrooms.map((classroom: Classroom) => {
    return `${classroom.classroom_level}/${classroom.classroom_class}`;
  });

  const homeroomStudentLeaveNotices = [...leaveNoticeWithClassroom].reverse().filter(
    (leaveNotice: LeaveNotice) => {
      if (leaveNotice.leave_notice_student_classroom) {
        return formattedClassrooms.includes(
          leaveNotice.leave_notice_student_classroom
        );
      }
    }
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("LeaveNotices_teachers_myLeaveNotices_title")}
        </h1>
        
        <LeaveNotices_table leaveNotices={homeroomStudentLeaveNotices} />
      </div>
    </div>
  );
};

export default Teacher_leaveNotices;
