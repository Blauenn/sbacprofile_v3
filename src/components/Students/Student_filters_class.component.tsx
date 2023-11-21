import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Classroom } from "../../interfaces/common.interface";

interface ClassFilterProps {
  classes: Classroom[];
  onChangeHandler: () => void;
}

const Student_filters_class = (props: ClassFilterProps) => {
  const { classes, onChangeHandler } = props;

  const { t } = useTranslation();

  const sortedClasses = classes.sort(
    (a: Classroom, b: Classroom) => a.classroom_class - b.classroom_class
  );

  if (sortedClasses?.length > 0) {
    return (
      <TextField
        label={t("profile_filters_label_class")}
        select
        onChange={onChangeHandler}
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
        <option value="0">{t("profile_filters_option_all")}</option>
        {sortedClasses.map((classroom: Classroom) => (
          <option
            key={classroom.classroom_ID}
            value={classroom.classroom_class}>
            {classroom.classroom_class}
          </option>
        ))}
      </TextField>
    );
  } else {
    return (
      <TextField
        label={t("profile_filters_label_class")}
        select
        disabled
        onChange={onChangeHandler}
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3 } }}>
        <option value="0">{t("profile_filters_option_all")}</option>
      </TextField>
    );
  }
};

export default Student_filters_class;
