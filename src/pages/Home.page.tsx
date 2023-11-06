import { useTranslation } from "react-i18next";
import { useContext_Announcements } from "../context/Announcements.context";
import { getData } from "../functions/fetchFromAPI.function";
import { API_ENDPOINT, CDN_ENDPOINT } from "../constants/ENDPOINTS";
import { useEffect } from "react";
import { hover_transition } from "../constants/styles/transitions.style";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { announcements, setAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  useEffect(() => {
    // Announcements //
    if (announcements.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
        result.reverse();
        setAnnouncements(result);
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold mb-4">SBAC Profile</h1>
        <h1 className="text-xl">{t("Home_welcomeMessage")}</h1>
      </div>
      {announcements.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold opacity-50">
            <i className="fa-solid fa-bullhorn me-2"></i>{t("Home_latestAnnouncement_title")}
          </h1>
          <div className="grid grid-cols-4">
            <div
              className={`col-span-4 lg:col-span-2 bg-white shadow-sm rounded-xl w-full overflow-hidden group ${hover_transition} hover:bg-slate-200 cursor-pointer`}>
              <div className="flex flex-col sm:flex-row">
                <div>
                  <img
                    src={`${CDN_ENDPOINT}${announcements[0].announcement_image}`}
                    className="border rounded-xl sm:max-h-[280px]"
                  />
                </div>
                <NavLink to="/announcements">
                  <div className="flex flex-col justify-between h-full p-4">
                    <div className="flex flex-col sm:gap-2 mb-2">
                      <h1 className="text-xl sm:text-2xl font-semibold">
                        {announcements[0].announcement_title}
                      </h1>
                      <h1 className="sm:text-lg opacity-50">
                        {announcements[0].announcement_description}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-primary group-hover:underline">
                        <i className="fa-solid fa-chevron-right me-2"></i>{t("Home_latestAnnouncement_viewMore_title")}
                      </h1>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
