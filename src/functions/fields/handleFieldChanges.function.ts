export const handleInputChange = (
  event: any,
  object: any,
  setObject: any
) => {
  setObject({ ...object, [event.target.name]: event.target.value });
};
