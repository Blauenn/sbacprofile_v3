import { useEffect, useState } from "react";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";
import { Teacher } from "../../interfaces/common.interface";
import { MajorName } from "../../constants/Majors.constant";
import RolodexCard from "../rolodex/card/RolodexCard.component";

const TeacherRolodex = (props: any) => {
  const { filteredTeachers } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sortedTeachers = filteredTeachers.sort((a: any, b: any) => {
    if (a.teacher_major !== b.teacher_major) {
      return a.teacher_major - b.teacher_major;
    } else {
      return a.teacher_ID - b.teacher_ID;
    }
  });

  if (sortedTeachers?.length > 0) {
    const sortedTeachersByMajor: { [major: string]: Teacher[] } = {};

    // Group by major //
    sortedTeachers.forEach((teacher: Teacher) => {
      const { teacher_major } = teacher;
      if (!sortedTeachersByMajor[teacher_major]) {
        sortedTeachersByMajor[teacher_major] = [];
      }
      sortedTeachersByMajor[teacher_major].push(teacher);
    });

    return (
      <div>
        {Object.entries(sortedTeachersByMajor).map(([major, teachers]) => (
          <div key={major} className="mb-12">
            <h1 className="text-2xl lg:text-3xl | font-semibold xl:mx-16 mb-6">
              {MajorName[parseInt(major)]}
            </h1>
            <div className="grid-cols-1 min-[490px]:grid-cols-2 lg:grid-cols-4 xl:mx-16 | grid gap-4">
              {teachers.map((teacher: Teacher) => (
                <RolodexCard
                  key={teacher.primary_teacher_ID}
                  profile="teacher"
                  object={teacher}
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

export default TeacherRolodex;
