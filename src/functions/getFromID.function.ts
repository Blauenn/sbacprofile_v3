import { Level_Name } from "../constants/Levels.constant";
import { Club, Student, Teacher } from "../interfaces/common.interface";

// Students //
export const get_student_name_from_ID = (student_ID: number, students: any) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return `${student.student_first_name} ${student.student_last_name}`;
  }
};
export const get_student_first_name_from_ID = (student_ID: number, students: any) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return `${student.student_first_name}`;
  }
};
export const get_student_name_thai_from_ID = (
  student_ID: number,
  students: any
) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return `${student.student_first_name_thai} ${student.student_last_name_thai}`;
  }
};
export const get_student_first_name_thai_from_ID = (
  student_ID: number,
  students: any
) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return `${student.student_first_name_thai}`;
  }
};
export const get_student_major_from_ID = (
  student_ID: number,
  students: any
) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return student.student_major;
  }
};
export const get_student_classroom_from_ID = (
  student_ID: number,
  students: any
) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return `${Level_Name[student.student_level]}/${student.student_class}`;
  }
};
export const get_student_image_from_ID = (
  student_ID: number,
  students: any
) => {
  const student: any = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  if (student) {
    return `${student.student_image}`;
  }
};

// Teachers //
export const get_teacher_name_from_ID = (teacher_ID: number, teachers: any) => {
  const teacher: any = teachers.find(
    (teacher: Teacher) => teacher.teacher_ID == teacher_ID
  );

  if (teacher) {
    return `${teacher.teacher_first_name} ${teacher.teacher_last_name}`;
  }
};
export const get_teacher_major_from_ID = (
  teacher_ID: number,
  teachers: any
) => {
  const teacher: any = teachers.find(
    (teacher: Teacher) => teacher.teacher_ID == teacher_ID
  );

  if (teacher) {
    return teacher.teacher_major;
  }
};
export const get_teacher_name_thai_from_ID = (
  teacher_ID: number,
  teachers: any
) => {
  const teacher: any = teachers.find(
    (teacher: Teacher) => teacher.teacher_ID == teacher_ID
  );

  if (teacher) {
    return `${teacher.teacher_first_name_thai} ${teacher.teacher_last_name_thai}`;
  }
};
export const get_teacher_image_from_ID = (
  teacher_ID: number,
  teachers: any
) => {
  const teacher: any = teachers.find(
    (teacher: Teacher) => teacher.teacher_ID == teacher_ID
  );

  if (teacher) {
    return `${teacher.teacher_image}`;
  }
};

// Clubs //
export const get_club_name_from_ID = (club_ID: number, clubs: any) => {
  const foundClub = clubs.find((club: Club) => club.club_ID === club_ID);

  return foundClub.club_name;
};

export const get_clubMember_count_from_ID = (
  club_ID: number,
  clubMemberships: any
) => {
  const filteredClub = clubMemberships.filter(
    (club: Club) => club_ID == club.club_ID
  );

  return filteredClub.length;
};

export const get_student_count_from_classroom = (
  classroomLevel: number,
  classroomClass: number,
  students: Student[]
) => {
  const filteredStudentCount = students.filter(
    (student: Student) =>
      student.student_level == classroomLevel &&
      student.student_class == classroomClass
  );
  return filteredStudentCount.length;
};

export const get_classroom_from_student_ID = (
  student_ID: number,
  students: Student[]
) => {
  const foundStudent = students.find(
    (student: Student) => student.student_ID == student_ID
  );

  return foundStudent
    ? `${foundStudent.student_level}/${foundStudent.student_class}`
    : "0/0";
};
