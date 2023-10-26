import { useEffect, useState } from "react";
import { Club } from "../../interfaces/common.interface";
import Club_rolodex_card from "./card/Club_rolodex_card.component";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";

interface CurrentComponentProp {
  clubs: any;
  clubMemberships: any;
  setClubMemberships: any;
}

const Club_rolodex = (props: CurrentComponentProp) => {
  const { clubs, clubMemberships } = props;

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
          />
        ))}
      </div>
    );
  } else {
    return <>{isLoading ? <Loading /> : <Rolodex_noResult />}</>;
  }
};

export default Club_rolodex;
