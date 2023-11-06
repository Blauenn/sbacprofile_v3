import i18n from "i18next";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { Major_To_Background_Color } from "../../constants/Majors.constant";

// Contexts //
import { useContext_Account } from "../../context/Account.context";

const Dashboard_selfInfo = () => {
  const { userInfo } = useContext_Account();

  const formattedEmail = userInfo.profile_email.substring(
    0,
    userInfo.profile_email.indexOf("@")
  );
  const formattedPhoneNumber = `${userInfo.profile_phone.substring(
    0,
    3
  )}-${userInfo.profile_phone.substring(
    3,
    6
  )}-${userInfo.profile_phone.substring(6)}`;
  const formattedLineID = userInfo.profile_line_ID.toString().toLowerCase();

  return (
    <div>
      <div className={`bg-white shadow-sm rounded-xl`}>
        <div className="grid grid-cols-1 min-[500px]:grid-cols-5 xl:grid-cols-1 gap-2 min-[500px]:gap-8 xl:gap-2 px-8 py-4">
          <div className="col-span-2 flex flex-col items-center">
            <div className={`${Major_To_Background_Color[userInfo.profile_major]} rounded-full overflow-hidden`}>
              <img
                src={`${CDN_ENDPOINT}${userInfo.profile_image}`}
                className="w-full"
              />
            </div>
            <h1 className="text-sm font-semibold opacity-50">
              {userInfo.profile_ID}
            </h1>
          </div>
          <div className="col-span-3 flex flex-col justify-center gap-4 mb-4 mt-2">
            <div className="flex flex-col">
              {/* If the current language is Thai, show Thai name first. */}
              {i18n.language === "th" ? (
                <>
                  {/* Thai names */}
                  <h1 className="text-xl font-semibold line-clamp-2">
                    {userInfo.profile_first_name_thai}{" "}
                    {userInfo.profile_last_name_thai}
                  </h1>
                  {/* English name */}
                  <h1 className="text-lg opacity-50 line-clamp-2">
                    {userInfo.profile_first_name} {userInfo.profile_last_name}
                  </h1>
                </>
              ) : (
                <>
                  {/* English name */}
                  <h1 className="text-xl font-semibold line-clamp-2">
                    {userInfo.profile_first_name} {userInfo.profile_last_name}
                  </h1>
                  {/* Thai name */}
                  <h1 className="text-lg opacity-50 line-clamp-2">
                    {userInfo.profile_first_name_thai}{" "}
                    {userInfo.profile_last_name_thai}
                  </h1>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* Email */}
              <h1 className="text-lg">
                <i className="fa-solid fa-at me-4 | hidden sm:inline-block"></i>
                {formattedEmail}
              </h1>
              {/* Phone */}
              {formattedPhoneNumber != "--" ? (
                <h1 className="text-lg">
                  <i className="fa-solid fa-phone me-4 | hidden sm:inline-block"></i>
                  {formattedPhoneNumber}
                </h1>
              ) : null}
              {/* Line ID */}
              {formattedLineID != "" ? (
                <h1 className="text-lg">
                  <i className="fa-brands fa-line me-4 | hidden sm:inline-block"></i>
                  {formattedLineID}
                </h1>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_selfInfo;
