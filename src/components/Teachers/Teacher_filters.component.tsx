import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Major } from "../../interfaces/common.interface";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../constants/Majors.constant";

// Contexts //
import { useContext_Majors } from "../../context/Majors.context";

interface CurrentComponentProp {
  onMajorChangeHandler: any;
  onSearchFieldChangeHandler: any;
}

const Teacher_filters = (props: CurrentComponentProp) => {
  const { onMajorChangeHandler, onSearchFieldChangeHandler } = props;

  const { majors } = useContext_Majors();

  const { t } = useTranslation();

  return (
    <div className="flex-col md:flex-row | flex justify-between gap-4">
      {/* Major */}
      <div className="flex md:w-1/3">
        <TextField
          label={t("profile_filters_label_major")}
          select
          onChange={onMajorChangeHandler}
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
          <option value="0">{t("profile_filters_option_all")}</option>
          {majors.map((major: Major) => (
            <option key={major.major_ID} value={major.major_ID}>
              {i18n.language === "th"
                ? Major_Name_Thai[major.major_ID]
                : i18n.language === "ko"
                ? Major_Name_Korean[major.major_ID]
                : i18n.language === "de"
                ? Major_Name_German[major.major_ID]
                : Major_Name[major.major_ID]}
            </option>
          ))}
        </TextField>
      </div>
      {/* Search */}
      <div className="md:w-1/3">
        <TextField
          label={t("profile_filters_label_search")}
          className="w-full"
          onChange={onSearchFieldChangeHandler}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}
        />
      </div>
    </div>
  );
};

export default Teacher_filters;
