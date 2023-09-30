// Check if the value has a number //
export const hasNumber = (value: string) => {
  return /\d/.test(value);
};

export const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
