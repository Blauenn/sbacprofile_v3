import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-4">SBAC Profile</h1>
      <h1 className="text-xl">{t("Home_welcomeMessage")}</h1>
    </div>
  );
};

export default Home;
