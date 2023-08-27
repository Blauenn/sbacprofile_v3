// Check if the value has a number //
export const hasNumber = (value: string) => {
  return /\d/.test(value);
};
export const studentRoleLengthCheck = (userRoleLength: number) => {
  return userRoleLength == 5;
};
export const teacherRoleLengthCheck = (userRoleLength: number) => {
  return userRoleLength == 7 || userRoleLength == 8;
};
