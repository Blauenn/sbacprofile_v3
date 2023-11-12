import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../misc/Loading.component";

const Teacher_club_noClub = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const information_card_style =
    "col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";

  return !isLoading ? (
    <>
      {/* No club */}
      <div className={`${information_card_style}`}>
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="opacity-50">
              {t("Teacher_club_currentClub_title")}
            </h1>
            <h1 className={`text-2xl font-semibold`}>
              {t("Teacher_club_noClub_message")}
            </h1>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="col-span-5">
      <Loading />
    </div>
  );
};

export default Teacher_club_noClub;
