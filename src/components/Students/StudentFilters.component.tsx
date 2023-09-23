import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Classroom, Major } from "../../interfaces/common.interface";
import StudentClassFilter from "./StudentClassFilter.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import {
  MajorName,
  MajorNameGerman,
  MajorNameKorean,
  MajorNameThai,
} from "../../constants/Majors.constant";
import {
  LevelName,
  LevelNameGerman,
  LevelNameKorean,
  LevelNameThai,
} from "../../constants/Levels.constant";

interface StudentFilterProps {
  majors: any[];
  onSearchFieldChangeHandler: any;
  onMajorChangeHandler: any;
  onLevelChangeHandler: any;
  onClassChangeHandler: any;
  selectedLevel: number;
  selectedMajor: number;
}

const StudentFilters = (props: StudentFilterProps) => {
  const {
    majors,
    selectedMajor,
    selectedLevel,
    onMajorChangeHandler,
    onLevelChangeHandler,
    onClassChangeHandler,
    onSearchFieldChangeHandler,
  } = props;

  const { t } = useTranslation();

  const [lowerLevel1, setlowerLevel1] = useState([]);
  const [lowerLevel2, setlowerLevel2] = useState([]);
  const [lowerLevel3, setlowerLevel3] = useState([]);
  const [higherLevel1, sethigherLevel1] = useState([]);
  const [higherLevel2, sethigherLevel2] = useState([]);

  const post = async (url: string, level: number, callback: any) => {
    await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
      }),
    })
      .then((response) => response.json())
      .then((request) => {
        callback(request.result);
      });
  };

  // Fetch levels //
  useEffect(() => {
    post(
      `${API_ENDPOINT}/api/v1/classroom/getClassroomByLevel`,
      1,
      setlowerLevel1
    );
    post(
      `${API_ENDPOINT}/api/v1/classroom/getClassroomByLevel`,
      2,
      setlowerLevel2
    );
    post(
      `${API_ENDPOINT}/api/v1/classroom/getClassroomByLevel`,
      3,
      setlowerLevel3
    );
    post(
      `${API_ENDPOINT}/api/v1/classroom/getClassroomByLevel`,
      4,
      sethigherLevel1
    );
    post(
      `${API_ENDPOINT}/api/v1/classroom/getClassroomByLevel`,
      5,
      sethigherLevel2
    );
  }, []);

  const allClasses: any = [
    [],
    lowerLevel1,
    lowerLevel2,
    lowerLevel3,
    higherLevel1,
    higherLevel2,
  ];
  let newArray = allClasses.concat();
  let filteredClass =
    selectedMajor == 0
      ? allClasses[selectedLevel]
      : newArray[selectedLevel].filter(
          (classroom: Classroom) => classroom.classroom_major == selectedMajor
        );

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
      <div className="flex justify-between flex-row gap-2 md:w-1/3">
        {/* Level */}
        <TextField
          label={t("profile_filters_label_level")}
          select
          onChange={onLevelChangeHandler}
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
          <option value="0">{t("profile_filters_option_all")}</option>
          <option value="1">
            {i18n.language === "th"
              ? LevelNameThai[1]
              : i18n.language === "ko"
              ? LevelNameKorean[1]
              : i18n.language === "de"
              ? LevelNameGerman[1]
              : LevelName[1]}
          </option>
          <option value="2">
            {i18n.language === "th"
              ? LevelNameThai[2]
              : i18n.language === "ko"
              ? LevelNameKorean[2]
              : i18n.language === "de"
              ? LevelNameGerman[2]
              : LevelName[2]}
          </option>
          <option value="3">
            {i18n.language === "th"
              ? LevelNameThai[3]
              : i18n.language === "ko"
              ? LevelNameKorean[3]
              : i18n.language === "de"
              ? LevelNameGerman[3]
              : LevelName[3]}
          </option>
          <option value="4">
            {i18n.language === "th"
              ? LevelNameThai[4]
              : i18n.language === "ko"
              ? LevelNameKorean[4]
              : i18n.language === "de"
              ? LevelNameGerman[4]
              : LevelName[4]}
          </option>
          <option value="5">
            {i18n.language === "th"
              ? LevelNameThai[5]
              : i18n.language === "ko"
              ? LevelNameKorean[5]
              : i18n.language === "de"
              ? LevelNameGerman[5]
              : LevelName[5]}
          </option>
        </TextField>
        {/* Class */}
        <StudentClassFilter
          onChangeHandler={onClassChangeHandler}
          classes={filteredClass}
        />
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

export default StudentFilters;
