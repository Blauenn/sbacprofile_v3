// Check if the value has a number //
export const has_number = (value: string) => {
  return /\d/.test(value);
};

export const capitalize_first_letter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
