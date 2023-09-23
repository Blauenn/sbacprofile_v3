import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Major } from "../../interfaces/common.interface";
import { MajorName, MajorNameGerman, MajorNameKorean, MajorNameThai } from "../../constants/Majors.constant";

interface CurrentComponentProp {
  majors: Major[];
  onMajorChangeHandler: any;
  onSearchFieldChangeHandler: any;
}

const TeacherFilters = (props: CurrentComponentProp) => {
  const { majors, onMajorChangeHandler, onSearchFieldChangeHandler } = props;

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
                ? MajorNameThai[major.major_ID]
                : i18n.language === "ko"
                ? MajorNameKorean[major.major_ID]
                : i18n.language === "de"
                ? MajorNameGerman[major.major_ID]
                : MajorName[major.major_ID]}
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

export default TeacherFilters;
