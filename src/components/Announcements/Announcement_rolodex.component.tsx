import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Announcement } from "../../interfaces/common.interface";
import {
  change_to_date,
  change_to_locale_date,
} from "../../functions/getDates.function";
import Loading from "../misc/Loading.component";
import Rolodex_noResult from "../rolodex/Rolodex_noResult.component";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { hover_transition } from "../../constants/styles/transitions.style";

// Contexts //
import { useContext_Announcements } from "../../context/Announcements.context";

const Announcement_rolodex = () => {
  const { announcements } = useContext_Announcements();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const filteredAnnouncements = announcements.filter(
    (announcement: Announcement) => announcement.announcement_status === 1
  );

  if (filteredAnnouncements?.length > 0) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredAnnouncements.map((announcement: Announcement) => (
          <div
            key={announcement.announcement_ID}
            className={`bg-white shadow-sm rounded-xl w-full ${hover_transition} hover:bg-slate-200 cursor-pointer`}>
            <div className="flex flex-col sm:flex-row h-full">
              {announcement.announcement_image !==
              "/assets/files/announcements/" ? (
                <div className={`flex items-center h-full`}>
                  <img
                    src={`${CDN_ENDPOINT}${announcement.announcement_image}`}
                    className="border rounded-xl sm:max-h-[280px]"
                  />
                </div>
              ) : (
                <div>{/* Empty div for spacing */}</div>
              )}
              <div className="flex flex-col justify-between gap-4 py-4 px-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold">
                    {announcement.announcement_title}
                  </h1>
                  <h1 className="text-lg line-clamp-2">
                    {announcement.announcement_description}
                  </h1>
                </div>
                <Tooltip
                  title={change_to_locale_date(
                    announcement.announcement_create_datetime
                  )}
                  placement="top-start"
                  arrow>
                  <h1 className="text-md opacity-50">
                    <i className="fa-regular fa-clock me-2"></i>
                    {formatDistanceToNow(
                      change_to_date(announcement.announcement_create_datetime),
                      { addSuffix: true }
                    ).replace("about ", "")}
                  </h1>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <>{isLoading ? <Loading /> : <Rolodex_noResult />}</>;
  }
};

export default Announcement_rolodex;
