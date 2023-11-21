import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { hover_transition } from "../constants/styles/transitions.style";
import Announcement_rolodex_card from "../components/Announcements/Announcement_rolodex_card.component";

// Contexts //
import { useContext_Announcements } from "../context/Announcements.context";
import { Announcement } from "../interfaces/common.interface";

const Home = () => {
  const { announcements, fetchAnnouncements } = useContext_Announcements();

  const [announcementsToDisplay, setAnnouncementsToDisplay] = useState<
    Announcement[]
  >([]);

  const { t } = useTranslation();

  useEffect(() => {
    if (announcements.length === 0) {
      fetchAnnouncements();
    }

    if (announcements.length !== 0) {
      const reversedAnnouncements = [...announcements].reverse();
      setAnnouncementsToDisplay(reversedAnnouncements);
    }
  }, [announcements]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold mb-4">SBAC Profile</h1>
        <h1 className="text-xl">{t("Home_welcomeMessage")}</h1>
      </div>
      {announcements ? (
        announcementsToDisplay.length !== 0 ? (
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold opacity-50">
              <i className="fa-solid fa-bullhorn me-2"></i>
              {t("Home_latestAnnouncement_title")}
            </h1>
            <div className="grid grid-cols-4">
              <div
                className={`col-span-4 lg:col-span-2 bg-white shadow-sm rounded-xl w-full overflow-hidden group ${hover_transition} hover:bg-slate-200 cursor-pointer`}>
                <NavLink to="/announcements">
                  <Announcement_rolodex_card
                    announcement={announcementsToDisplay[0]}
                  />
                </NavLink>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default Home;
