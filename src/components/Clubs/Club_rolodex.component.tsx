import { useEffect, useState } from "react";
import {
  Club,
  ClubMembership,
  Student,
  Teacher,
} from "../../interfaces/common.interface";
import { UserInfo } from "../../interfaces/account.interface";
import Club_rolodex_card from "./card/Club_rolodex_card.component";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";

interface CurrentComponentProp {
  clubs: Club[];
  clubMemberships: ClubMembership[];
  setClubMemberships: any;
  teachers: Teacher[];
  students: Student[];
  userInfo: UserInfo;
}

const Club_rolodex = (props: CurrentComponentProp) => {
  const {
    clubs,
    clubMemberships,
    setClubMemberships,
    teachers,
    students,
    userInfo,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (clubs?.length > 0) {
    return (
      <div className="grid-cols-1 min-[490px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-16 | grid gap-4">
        {clubs.map((club: Club) => (
          <Club_rolodex_card
            key={club.club_ID}
            club={club}
            clubMemberships={clubMemberships}
            setClubMemberships={setClubMemberships}
            teachers={teachers}
            students={students}
            userInfo={userInfo}
          />
        ))}
      </div>
    );
  } else {
    return <>{isLoading ? <Loading /> : <Rolodex_noResult />}</>;
  }
};

export default Club_rolodex;
