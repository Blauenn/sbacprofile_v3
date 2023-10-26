import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Head_club_modal_create from "../../components/Dashboard/Clubs/HeadOnly/modal/Head_club_modal_create.component";
import Head_club_table from "../../components/Dashboard/Clubs/HeadOnly/table/Head_club_table_row.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Clubs } from "../../context/Clubs.context";
import { useContext_Teachers } from "../../context/Teachers.context";

const Head_clubs = () => {
  const { clubs, setClubs, clubMemberships, setClubMemberships } =
    useContext_Clubs();
  const { teachers, setTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  const fetchClubs = () => {
    getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
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
  };
  const fetchClubMemberships = () => {
    getData(`${API_ENDPOINT}/api/v1/clubMembership/getAll`, (result: any) => {
      setClubMemberships(result);
    });
  };

  useEffect(() => {
    fetchClubs();
    fetchClubMemberships();
    getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
      setTeachers(result);
    });
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
        <Head_club_modal_create open={modalOpen} onModalClose={onModalClose} />
      </div>

      <Head_club_table
        clubs={clubs}
        clubMemberships={clubMemberships}
        teachers={teachers}
      />
    </div>
  );
};

export default Head_clubs;
