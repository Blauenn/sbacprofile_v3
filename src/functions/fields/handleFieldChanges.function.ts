export const handle_input_change = (event: any, object: any, setObject: any) => {
  setObject({ ...object, [event.target.name]: event.target.value });
};

export const handle_file_input_change = (
  fieldQuery: string,
  event: any,
  setLeaveNoticeFile: any,
  setLeaveNoticeFileName: any,
  setFileSizeNotice: any
) => {
  if (event.target.files[0]) {
    const maxSizeInBytes = 20 * 1024 * 1024; // 20MB in bytes. //

    // Handle the case when the file size exceeds 20MB. //
    if (event.target.files[0].size > maxSizeInBytes) {
      setFileSizeNotice(true);

      // Reset the value within the input. //
      const inputField = document.querySelector(fieldQuery) as HTMLInputElement;
      if (inputField) {
        inputField.value = "";
      }
      return;
    }

    setFileSizeNotice(false);
    // Set the uploaded file into a state. //
    setLeaveNoticeFile(event.target.files[0]);

    const currentDate = new Date();
    // Generate an 8-digit unique ID based on the current time as a seed. //
    const seed = currentDate.getTime();
    const uniqueID = Math.floor(Math.random() * seed)
      .toString()
      .padStart(8, "0");

    // Format the date (DDMMYY_HHMM). //
    const formattedDate = `${currentDate.getDate()}${
      currentDate.getMonth() + 1
    }${currentDate.getFullYear()}_${currentDate.getHours()}${currentDate.getMinutes()}`;
    // Get the file extension. //
    const fileNameParts = event.target.files[0].name.split(".");
    const fileExtension = fileNameParts.pop().toLowerCase();

    // Combine the formatted date, unique ID and file extension. //
    const leaveNoticeFileName = `${formattedDate}_${uniqueID}.${fileExtension}`;

    setLeaveNoticeFileName(leaveNoticeFileName);
  }
};

export const handle_image_change = (
  event: any,
  setImagePreview: any,
  setImage: any,
  setFileSizeNotice: any,
  setImageName?: any
) => {
  if (event.target.files[0]) {
    const maxSizeInBytes = 20 * 1024 * 1024; // 20MB in bytes. //

    // Check if the image is either jpg, jpeg, or png. //
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileName = event.target.files[0].name.toLowerCase();

    if (!allowedExtensions.includes(fileName.split(".").pop())) {
      setImagePreview("");
      setImage(null);
      if (setImageName) {
        setImageName("");
      }
      return;
    }

    // Handle the case when the file size exceeds 20MB. //
    if (event.target.files[0].size > maxSizeInBytes) {
      setImagePreview("");
      setImage(null);
      setFileSizeNotice(true);
      return;
    } else {
      setFileSizeNotice(false);
    }

    // Set the image preview //
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(event.target.files[0]);

    // Set the image and its information into a state. //
    setImage(event.target.files[0]);

    // Image name //
    const fileNameParts = event.target.files[0].name.split(".");
    const fileExtension = fileNameParts.pop();

    const currentDate = new Date();
    // Generate an 8-digit unique ID based on the current time as a seed. //
    const seed = currentDate.getTime();
    const uniqueID = Math.floor(Math.random() * seed)
      .toString()
      .padStart(8, "0");

    // Format the date (DDMMYY_HHMM). //
    const formattedDate = `${currentDate.getDate()}${
      currentDate.getMonth() + 1
    }${currentDate.getFullYear()}_${currentDate.getHours()}${currentDate.getMinutes()}`;
    // Combine the formatted date, unique ID and file extension. //
    const leaveNoticeFileName = `${formattedDate}_${uniqueID}.${fileExtension}`;
    if (setImageName) {
      setImageName(leaveNoticeFileName);
    }
  }
};
