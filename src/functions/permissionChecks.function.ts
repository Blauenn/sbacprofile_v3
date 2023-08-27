export const studentAccessOnly = (userPosition: number) => {
  return userPosition === 1 || userPosition === 2;
};
export const teacherAccessOnly = (userPosition: number) => {
  return userPosition === 3 || userPosition === 4;
};
export const headAccessOnly = (userPosition: number) => {
  return userPosition === 4;
};
export const adminAccessOnly = (userPosition: number) => {
  return userPosition === 5 || userPosition === 6;
};
