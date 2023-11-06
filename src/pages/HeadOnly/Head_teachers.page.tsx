import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../../interfaces/common.interface";
import { getData } from "../../functions/fetchFromAPI.function";
import Head_teacher_table from "../../components/Dashboard/Teachers/HeadOnly/table/Head_teachers_table.component";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Head_teacher_modal_create from "../../components/Dashboard/Teachers/HeadOnly/modal/Head_teachers_modal_create.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Majors } from "../../context/Majors.context";
import { useContext_Teachers } from "../../context/Teachers.context";
import { useContext_Account } from "../../context/Account.context";

const Head_teachers = () => {
  const { teachers, setTeachers, setTeacherCount } = useContext_Teachers();
  const { majors, setMajors } = useContext_Majors();
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  useEffect(() => {
    // Teachers //
    if (teachers.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
        setTeachers(result);
        setTeacherCount(result.length);
      });
    }
    // Majors //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const filteredTeachers = teachers.filter((teacher: Teacher) => {
    return teacher.teacher_major == userInfo.profile_major;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Teachers_header")} />

      <div className="mb-8">
        <Head_teacher_modal_create
          open={modalOpen}
          onModalClose={onModalClose}
        />
        <Info_create_button
          setModalOpen={setModalOpen}
          icon="fa-solid fa-chalkboard-user"
          text={t("Admin_Teachers_create_button_title")}
        />
      </div>

      <div className="flex flex-col gap-8">
        <Head_teacher_table filteredTeachers={filteredTeachers} />
      </div>
    </div>
  );
};

export default Head_teachers;
