import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../../interfaces/common.interface";
import { getData } from "../../functions/fetchFromAPI.function";
import Head_student_table from "../../components/Dashboard/Students/HeadOnly/table/Head_student_table.component";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Head_student_modal_create from "../../components/Dashboard/Students/HeadOnly/modal/Head_student_modal_create.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Students } from "../../context/Students.context";
import { useContext_Majors } from "../../context/Majors.context";
import { useContext_Account } from "../../context/Account.context";

const Head_students = () => {
  const { students, setStudents, setStudentCount } = useContext_Students();
  const { majors, setMajors } = useContext_Majors();
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  useEffect(() => {
    // Students //
    getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
      setStudents(result);
      setStudentCount(result.length);
    });
    // Majors //
    // Only fetch when empty //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const filteredStudents = students.filter((student: Student) => {
    return student.student_major === userInfo.profile_major;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Students_header")} />

      <div className="mb-8">
        <Head_student_modal_create
          open={modalOpen}
          onModalClose={onModalClose}
        />
        <Info_create_button
          setModalOpen={setModalOpen}
          icon="fa-solid fa-graduation-cap"
          text={t("Admin_Students_create_button_title")}
        />
      </div>

      <div className="flex flex-col gap-8">
        <Head_student_table filteredStudents={filteredStudents} />
      </div>
    </div>
  );
};

export default Head_students;
