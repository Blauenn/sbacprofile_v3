// Check if the value has a number //
export const has_number = (value: string) => {
  return /\d/.test(value);
};
// Check if both array has the same values //
export const arrays_equality_check = (
  firstArray: any[],
  secondArray: any[]
) => {
  // Check if array is different in length. //
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  // Sort both arrays //
  const sortedFirstArray = firstArray.slice().sort();
  const sortedSecondArray = secondArray.slice().sort();

  // Compare the sorted arrays //
  for (let i = 0; i < sortedFirstArray.length; i++) {
    if (sortedFirstArray[i] !== sortedSecondArray[i]) {
      // Values at index i are different //
      return false;
    }
  }

  // All values are equal //
  return true;
};

export const capitalize_first_letter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
