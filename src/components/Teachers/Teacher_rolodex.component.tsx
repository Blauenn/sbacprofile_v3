import { useEffect, useState } from "react";
import i18n from "i18next";
import { Teacher } from "../../interfaces/common.interface";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";
import RolodexCard from "../rolodex/card/Rolodex_card.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../constants/Majors.constant";

interface CurrentComponentProp {
  filteredTeachers: Teacher[];
}

const Teacher_rolodex = (props: CurrentComponentProp) => {
  const { filteredTeachers } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

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
            <h1 className="text-xl lg:text-2xl | font-semibold xl:mx-16 mb-6">
              {i18n.language === "th"
                ? Major_Name_Thai[parseInt(major)]
                : i18n.language === "ko"
                ? Major_Name_Korean[parseInt(major)]
                : i18n.language === "de"
                ? Major_Name_German[parseInt(major)]
                : Major_Name[parseInt(major)]}
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

export default Teacher_rolodex;
