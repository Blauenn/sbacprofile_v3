import { useState } from "react";
import { TextField } from "@mui/material";
import { handleInputChange } from "../../functions/fields/handleFieldChanges.function";
import { passwordUpdate } from "../../functions/Settings/PasswordUpdate.function";

const SettingsAccountTab = (props: any) => {
  const { userEmail } = props;

  const [isError, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const [settingsPassword, setSettingsPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      <div className="border border-standardBlack border-opacity-25 rounded-xl p-4">
        <h1 className="text-2xl font-semibold mb-4">
          <i className="fa-solid fa-lock me-4"></i>Password
        </h1>
        <h1 className="text-lg opacity-50 mb-4">
          Change the account password.
        </h1>
        <div className="mb-2">
          <TextField
            value={settingsPassword.current_password}
            onChange={(event) => {
              handleInputChange(event, settingsPassword, setSettingsPassword);
            }}
            name="current_password"
            label="Current password"
            className="w-full"
            InputProps={{ sx: { borderRadius: 3 } }}
            type="password"
          />
        </div>
        <div className="mt-8 mb-4">
          <TextField
            value={settingsPassword.new_password}
            onChange={(event) => {
              handleInputChange(event, settingsPassword, setSettingsPassword);
            }}
            name="new_password"
            label="New password"
            className="w-full"
            InputProps={{ sx: { borderRadius: 3 } }}
            type="password"
          />
        </div>
        <div className="mb-4">
          <TextField
            value={settingsPassword.confirm_password}
            onChange={(event) => {
              handleInputChange(event, settingsPassword, setSettingsPassword);
            }}
            name="confirm_password"
            label="Confirm new password"
            className="w-full"
            InputProps={{ sx: { borderRadius: 3 } }}
            type="password"
          />
        </div>
        {isError != "" ? (
          <div className="mt-4 mb-8">
            <h1 className="text-md">
              <i className="fa-solid fa-circle-exclamation text-red-500 me-2"></i>
              {isError}
            </h1>
          </div>
        ) : null}
        {isUpdateSuccess ? (
          <div className="mt-4 mb-8">
            <h1 className="text-md">
              <i className="fa-solid fa-circle-check text-green-500 me-2"></i>
              Password has been updated.
            </h1>
          </div>
        ) : null}
        <div className="grid grid-cols-1 justify-end">
          <button
            onClick={() => {
              passwordUpdate(
                userEmail,
                settingsPassword,
                setIsUpdating,
                setIsUpdateSuccess,
                setError
              );
            }}
            disabled={
              isUpdating ||
              Object.values(settingsPassword).some((value) => value === "")
            }
            className={`text-white ${
              isUpdating ||
              Object.values(settingsPassword).some((value) => value === "")
                ? "bg-gray-500"
                : "bg-primary"
            } px-4 py-2 rounded-xl w-full`}>
            Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccountTab;