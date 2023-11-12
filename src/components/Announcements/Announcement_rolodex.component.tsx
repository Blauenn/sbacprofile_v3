import { useEffect, useState } from "react";
import { Announcement } from "../../interfaces/common.interface";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";

// Contexts //
import { useContext_Announcements } from "../../context/Announcements.context";
import Announcement_rolodex_card from "./Announcement_rolodex_card.component";

const Announcement_rolodex = () => {
  const { announcements, fetchAnnouncements } = useContext_Announcements();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (announcements.length === 0) {
      fetchAnnouncements();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const filteredAnnouncements = [...announcements]
    .reverse()
    .filter(
      (announcement: Announcement) => announcement.announcement_status === 1
    );

  if (filteredAnnouncements?.length > 0) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredAnnouncements.map((announcement: Announcement) => (
          <Announcement_rolodex_card
            key={announcement.announcement_ID}
            announcement={announcement}
          />
        ))}
      </div>
    );
  } else {
    return <>{isLoading ? <Loading /> : <Rolodex_noResult />}</>;
  }
};

export default Announcement_rolodex;
