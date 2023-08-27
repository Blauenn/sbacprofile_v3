import { useEffect, useState } from "react";
import { Student } from "../../interfaces/common.interface";
import RolodexCard from "../rolodex/card/RolodexCard.component";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";
import { MajorName } from "../../constants/Majors.constant";

const StudentRolodex = (props: any) => {
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
            <h1 className="text-2xl lg:text-3xl | font-semibold xl:mx-16 mb-6">
              {MajorName[parseInt(major)]}
            </h1>
            <div className="grid-cols-1 min-[490px]:grid-cols-2 lg:grid-cols-4 xl:mx-16 | grid gap-4">
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

export default StudentRolodex;
