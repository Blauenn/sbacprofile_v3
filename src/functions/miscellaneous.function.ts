import { Teacher } from "../interfaces/common.interface";

export const teacher_check = (teacher_ID: number, teachers: Teacher[]) => {
  return teachers.some((teacher: Teacher) => teacher_ID === teacher.teacher_ID);
};
