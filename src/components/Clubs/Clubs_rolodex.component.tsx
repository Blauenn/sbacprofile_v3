import { useEffect, useState } from "react";
import { Club } from "../../interfaces/common.interface";
import Clubs_rolodex_card from "./card/Clubs_rolodex_card.component";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";
import { useContext_Clubs } from "../../context/Clubs.context";

const Clubs_rolodex = () => {
  const { clubs, fetchClubs, clubMemberships, fetchClubMemberships } =
    useContext_Clubs();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (clubs?.length > 0) {
    return (
      <div className="grid-cols-1 min-[490px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-16 | grid gap-4">
        {clubs.map((club: Club) => (
          <Clubs_rolodex_card key={club.club_ID} club={club} />
        ))}
      </div>
    );
  } else {
    return <>{isLoading ? <Loading /> : <Rolodex_noResult />}</>;
  }
};

export default Clubs_rolodex;
