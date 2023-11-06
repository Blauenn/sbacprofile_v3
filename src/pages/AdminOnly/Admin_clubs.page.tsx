import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_club_table from "../../components/Dashboard/Clubs/AdminOnly/table/Admin_clubs_table.component";
import Admin_club_modal_create from "../../components/Dashboard/Clubs/AdminOnly/modal/Admin_clubs_modal_create.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Clubs } from "../../context/Clubs.context";
import { useContext_Teachers } from "../../context/Teachers.context";

const Admin_clubs = () => {
  const { clubs, setClubs, clubMemberships, setClubMemberships } =
    useContext_Clubs();
  const { teachers, setTeachers, setTeacherCount } = useContext_Teachers();

  const { t } = useTranslation();

  const fetchClubs = async () => {
    if (clubs.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
        // Change the value of the club_teacher from string into an object. //
        const remappedClub = result.map((club: any) => {
          const parsedTeacher = JSON.parse(club.club_teacher);
          return { ...club, club_teacher: parsedTeacher };
        });

        // Sort in alphabetical order. //
        const sortedResults = remappedClub.sort((a: any, b: any) => {
          return a.club_name.localeCompare(b.club_name);
        });

        setClubs(sortedResults);
      });
    }
  };
  const fetchClubMemberships = async () => {
    if (clubMemberships.length === 0) {
      await getData(
        `${API_ENDPOINT}/api/v1/clubMembership/getAll`,
        (result: any) => {
          setClubMemberships(result);
        }
      );
    }
  };
  const fetchTeachers = async () => {
    if (teachers.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
        setTeachers(result);
        setTeacherCount(result.length);
      });
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchClubMemberships();
    fetchTeachers();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Clubs_header")} />

      <div className="mb-8">
        <Info_create_button
          setModalOpen={setModalOpen}
          icon="fa-solid fa-puzzle-piece"
          text={t("Admin_Clubs_create_button_title")}
        />
        <Admin_club_modal_create open={modalOpen} onModalClose={onModalClose} />
      </div>

      <Admin_club_table />
    </div>
  );
};

export default Admin_clubs;
