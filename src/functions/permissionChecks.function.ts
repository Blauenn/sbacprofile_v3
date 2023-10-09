export const student_access_only = (userPosition: number) => {
  return userPosition === 1 || userPosition === 2;
};
export const teacher_access_only = (userPosition: number) => {
  return userPosition === 3 || userPosition === 4;
};
export const head_access_only = (userPosition: number) => {
  return userPosition === 4;
};
export const admin_access_only = (userPosition: number) => {
  return userPosition === 5 || userPosition === 6;
};
