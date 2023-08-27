import { TextField } from "@mui/material";
import { Major } from "../../interfaces/common.interface";

const TeacherFilters = (props: any) => {
  const { majors, onMajorChangeHandler, onSearchFieldChangeHandler } = props;

  return (
    <div className="flex-col md:flex-row | flex justify-between gap-4">
      {/* Major */}
      <div className="flex md:w-1/3">
        <TextField
          label="Major"
          select
          onChange={onMajorChangeHandler}
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3 } }}>
          <option value="0">All</option>
          {majors.map((major: Major) => (
            <option key={major.major_ID} value={major.major_ID}>
              {major.major_name}
            </option>
          ))}
        </TextField>
      </div>
      {/* Search */}
      <div className="md:w-1/3">
        <TextField
          label="Search by ID or name"
          className="w-full"
          onChange={onSearchFieldChangeHandler}
          InputProps={{ sx: { borderRadius: 3 } }}
        />
      </div>
    </div>
  );
};

export default TeacherFilters;
