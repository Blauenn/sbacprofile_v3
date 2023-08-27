import { TextField } from "@mui/material";
import { Classroom } from "../../interfaces/common.interface";

interface ClassFilterProps {
  classes: Classroom[];
  onChangeHandler: any;
}

const StudentClassFilter = (props: ClassFilterProps) => {
  const { classes, onChangeHandler } = props;

  const sortedClasses = classes.sort(
    (a: Classroom, b: Classroom) => a.classroom_class - b.classroom_class
  );

  if (sortedClasses?.length > 0) {
    return (
      <TextField
        label="Class"
        select
        onChange={onChangeHandler}
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3 } }}>
        <option value="0">Level</option>
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
        label="Class"
        select
        disabled
        onChange={onChangeHandler}
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3 } }}>
        <option value="0">Level</option>
      </TextField>
    );
  }
};

export default StudentClassFilter;
