import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Classroom, Major } from "../../interfaces/common.interface";
import StudentClassFilter from "./StudentClassFilter.component";

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
      "http://api.sbacprofile-collection.cloudns.ph/api/v1/classroom/getClassroomByLevel",
      1,
      setlowerLevel1
    );
    post(
      "http://api.sbacprofile-collection.cloudns.ph/api/v1/classroom/getClassroomByLevel",
      2,
      setlowerLevel2
    );
    post(
      "http://api.sbacprofile-collection.cloudns.ph/api/v1/classroom/getClassroomByLevel",
      3,
      setlowerLevel3
    );
    post(
      "http://api.sbacprofile-collection.cloudns.ph/api/v1/classroom/getClassroomByLevel",
      4,
      sethigherLevel1
    );
    post(
      "http://api.sbacprofile-collection.cloudns.ph/api/v1/classroom/getClassroomByLevel",
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
          select
          onChange={onMajorChangeHandler}
          className="w-full"
          label="Major"
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
      <div className="flex justify-between flex-row gap-2 md:w-1/3">
        {/* Level */}
        <TextField
          label="Level"
          select
          onChange={onLevelChangeHandler}
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3 } }}>
          <option value="0">All</option>
          <option value="1">Lower 1</option>
          <option value="2">Lower 2</option>
          <option value="3">Lower 3</option>
          <option value="4">Higher 1</option>
          <option value="5">Higher 2</option>
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
          label="Search by ID or name"
          className="w-full"
          onChange={onSearchFieldChangeHandler}
          InputProps={{ sx: { borderRadius: 3 } }}
        />
      </div>
    </div>
  );
};

export default StudentFilters;
