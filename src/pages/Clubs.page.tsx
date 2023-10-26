import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../functions/fetchFromAPI.function";
import PageHeader from "../components/misc/common/PageHeader.component";
import Club_rolodex from "../components/Clubs/Club_rolodex.component";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Contexts //
import { useContext_Clubs } from "../context/Clubs.context";
import { useContext_Students } from "../context/Students.context";
import { useContext_Teachers } from "../context/Teachers.context";

const Clubs = () => {
  const { clubs, setClubs, clubMemberships, setClubMemberships } =
    useContext_Clubs();
  const { setStudents } = useContext_Students();
  const { setTeachers } = useContext_Teachers();

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
  const fetchTeachers = () => {
    getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
      setTeachers(result);
    });
  };
  const fetchStudents = () => {
    getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
      setStudents(result);
    });
  };

  useEffect(() => {
    (async () => {
      fetchClubs();
      fetchClubMemberships();
      fetchTeachers();
      fetchStudents();
    })();
  }, []);

  return (
    <div>
      <PageHeader icon="fa-solid fa-puzzle-piece" text={t("Clubs_header")} />

      {/* Rolodex */}
      <Club_rolodex
        clubs={clubs}
        clubMemberships={clubMemberships}
        setClubMemberships={setClubMemberships}
      />
    </div>
  );
};

export default Clubs;
