import { z } from "zod";
import { postData, postDataAutheticated } from "../fetchFromAPI.function";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { useTranslation } from "react-i18next";

interface SettingsPassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const settingsPassword_schema = z.object({
  current_password: z.string().nonempty(),
  new_password: z.string().nonempty().min(8),
  confirm_password: z.string().nonempty().min(8),
});

export const passwordUpdate = (
  userEmail: any,
  settingsPasswordObject: SettingsPassword,
  setIsUpdating: any,
  setIsUpdateSuccess: any,
  setIsError: any
) => {
  const { t } = useTranslation();
  
  setIsUpdating(true);
  if (settingsPassword_schema.safeParse(settingsPasswordObject).success) {
    // If the password doesn't match, don't proceed. //
    if (
      settingsPasswordObject.new_password !=
      settingsPasswordObject.confirm_password
    ) {
      setIsError(t("Settings_account_password_notMatch"));
      setIsUpdating(false);
      setIsUpdateSuccess(false);
      return;
    }

    // Check current password's validity. //
    const currentPasswordCheckObject = {
      email: userEmail,
      password: settingsPasswordObject.current_password,
    };
    const currentPasswordCheckJSON = JSON.stringify(currentPasswordCheckObject);

    postData(
      `${API_ENDPOINT}/api/v1/auth/login`,
      currentPasswordCheckJSON,
      (result: any) => {
        // If the current password is correct. //
        if (result) {
          // Update the password in the user_table. //
          const updatePasswordJSON = JSON.stringify({
            password: settingsPasswordObject.new_password,
          });
          postDataAutheticated(
            `${API_ENDPOINT}/api/v1/auth/changePassword`,
            updatePasswordJSON,
            result.accessToken,
            (result: any) => {
              if (result) {
                setIsError("");
                setIsUpdating(false);
                setIsUpdateSuccess(true);
              } else {
                setIsError(t("Settings_account_password_updateError"));
                setIsUpdating(false);
                setIsUpdateSuccess(false);
              }
            }
          );
        } else {
          setIsError("Invalid password.");
          setIsUpdating(false);
          setIsUpdateSuccess(false);
        }
      }
    );
  } else {
    setIsError(t("Settings_account_password_shortPassword"));
    setIsUpdating(false);
    setIsUpdateSuccess(false);
  }
};
