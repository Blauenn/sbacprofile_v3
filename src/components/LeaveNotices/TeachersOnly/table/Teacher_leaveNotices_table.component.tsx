import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Classroom,
  LeaveNotice,
} from "../../../../interfaces/common.interface";
import { UserInfo } from "../../../../interfaces/account.interface";
import Teacher_leaveNotices_table_row from "./Teacher_leaveNotices_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";
import { getData } from "../../../../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { useContext_Students } from "../../../../context/Students.context";
import { useContext_Classrooms } from "../../../../context/Classrooms.context";
import { get_classroom_from_student_ID } from "../../../../functions/getFromID.function";

interface CurrentComponentProp {
  leaveNotices: LeaveNotice[];
  userInfo: UserInfo;
}

const Teacher_leaveNotices_table = (props: CurrentComponentProp) => {
  const { leaveNotices, userInfo } = props;

  const { students } = useContext_Students();
  const { classrooms, setClassrooms } = useContext_Classrooms();

  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      await getData(`${API_ENDPOINT}/api/v1/classroom`, (result: any) =>
        setClassrooms(result)
      );
    })();
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

  const filteredLeaveNotices = leaveNoticeWithClassroom.filter(
    (leaveNotice: any) => {
      return formattedClassrooms.includes(
        leaveNotice.leave_notice_student_classroom
      );
    }
  );

  return (
    <table className={table_parent_style}>
      <thead>
        <tr>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("LeaveNotices_table_header_submitDate")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("LeaveNotices_table_header_type")}
          </th>
          <th className={`${table_header_style}`}>
            {t("LeaveNotices_table_header_startDate")}
          </th>
          <th className={`${table_header_style}`}>
            {t("LeaveNotices_table_header_endDate")}
          </th>
          <th className={`${table_header_style} | hidden sm:table-cell`}>
            {t("LeaveNotices_table_header_status")}
          </th>
          <th className={`${table_header_style}`}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredLeaveNotices.length > 0 ? (
          [...filteredLeaveNotices]
            .reverse()
            .map((leaveNotice: LeaveNotice, index: number) => (
              <React.Fragment key={leaveNotice.leave_notice_ID}>
                <Teacher_leaveNotices_table_row
                  leaveNotice={leaveNotice}
                  index={index}
                />
              </React.Fragment>
            ))
        ) : (
          <tr>
            <td className={table_content_style}>
              {t("LeaveNotices_table_noLeaveNotices_message")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Teacher_leaveNotices_table;
