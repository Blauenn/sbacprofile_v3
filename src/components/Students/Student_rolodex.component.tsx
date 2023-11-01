import { useEffect, useState } from "react";
import i18n from "i18next";
import { Student } from "../../interfaces/common.interface";
import RolodexCard from "../rolodex/card/Rolodex_card.component";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../constants/Majors.constant";

interface CurrentComponentProp {
  filteredStudents: Student[];
}

const Student_rolodex = (props: CurrentComponentProp) => {
  const { filteredStudents } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sortedStudents = filteredStudents.sort((a: any, b: any) => {
    if (a.student_major !== b.student_major) {
      return a.student_major - b.student_major; // Sort by major //
    } else if (a.student_level !== b.student_level) {
      return a.student_level - b.student_level; // Sort by level //
    } else if (a.student_class !== b.student_class) {
      return a.student_class.localeCompare(b.student_class); // Sort by class //
    } else {
      return a.student_ID - b.student_ID; // Sort by ID //
    }
  });

  if (sortedStudents?.length > 0) {
    const sortedStudentsByMajor: { [major: string]: Student[] } = {};

    // Group by major //
    sortedStudents.forEach((student: Student) => {
      const { student_major } = student;
      if (!sortedStudentsByMajor[student_major]) {
        sortedStudentsByMajor[student_major] = [];
      }
      sortedStudentsByMajor[student_major].push(student);
    });

    return (
      <div>
        {Object.entries(sortedStudentsByMajor).map(([major, students]) => (
          <div key={major} className="mb-12">
            <h1 className="text-xl lg:text-2xl | font-semibold xl:mx-16 mb-6">
              {i18n.language === "th"
                ? Major_Name_Thai[parseInt(major)]
                : i18n.language === "ko"
                ? Major_Name_Korean[parseInt(major)]
                : i18n.language === "de"
                ? Major_Name_German[parseInt(major)]
                : Major_Name[parseInt(major)]}
            </h1>
            <div className="grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 xl:mx-16 | grid gap-4">
              {students.map((student: Student) => (
                <RolodexCard
                  key={student.primary_student_ID}
                  profile="student"
                  object={student}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <>{isLoading ? <Loading /> : <Rolodex_noResult />}</>;
  }
};

export default Student_rolodex;
