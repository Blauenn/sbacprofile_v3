import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../functions/fetchFromAPI.function";
import {
  student_access_only,
  teacher_access_only,
} from "../functions/permissionChecks.function";
import PageHeaderReturn from "../components/misc/common/PageHeaderReturn.component";
import Student_club from "../components/Club/StudentOnly/Student_club.component";
import Teacher_club from "../components/Club/TeacherOnly/Teacher_club.component";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../context/Account.context";
import { useContext_Clubs } from "../context/Clubs.context";
import { useContext_Students } from "../context/Students.context";
import { useContext_Teachers } from "../context/Teachers.context";

const Club = () => {
  const { userInfo } = useContext_Account();
  const {
    clubs,
    setClubs,
    clubMemberships,
    setClubMemberships,
    setClubJoinRequests,
  } = useContext_Clubs();
  const { students, setStudents, setStudentCount } = useContext_Students();
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
  const fetchClubJoinRequest = async () => {
    const clubJoinRequest = [{}];

    setClubJoinRequests(clubJoinRequest);
  };
  const fetchTeachers = async () => {
    if (teachers.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
        setTeachers(result);
        setTeacherCount(result.length);
      });
    }
  };
  const fetchStudents = async () => {
    if (students.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
        setStudents(result);
        setStudentCount(result.length);
      });
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchClubMemberships();
    fetchClubJoinRequest();
    fetchTeachers();
    fetchStudents();
  }, []);

  return (
    <div>
      <PageHeaderReturn text={t("Club_header")} />

      {/* If user is a student */}
      {student_access_only(userInfo.profile_position) ? <Student_club /> : null}

      {/* If user is a teacher */}
      {teacher_access_only(userInfo.profile_position) ? <Teacher_club /> : null}
    </div>
  );
};

export default Club;
