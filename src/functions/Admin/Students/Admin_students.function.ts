import { z } from "zod";
import { capitalizeFirstLetter } from "../../stringManipulation.function";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleStudentCreate = async (
  studentToCreate: any,
  studentCreateImage: any,
  setValidationErrors: any,
  setIsSubmitting: any,
  setIsCreateSuccess: any,
  callback: any
) => {
  // Disable the submit button. //
  setIsSubmitting(true);

  const updatedStudentToCreate = {
    student_ID: parseInt(studentToCreate.student_ID, 10),
    student_position: parseInt(studentToCreate.student_position, 10),
    student_first_name: studentToCreate.student_first_name,
    student_last_name: studentToCreate.student_last_name,
    student_nickname: studentToCreate.student_nickname,
    student_first_name_thai: studentToCreate.student_first_name_thai,
    student_last_name_thai: studentToCreate.student_last_name_thai,
    student_nickname_thai: studentToCreate.student_nickname_thai,
    student_major: parseInt(studentToCreate.student_major, 10),
    student_gender: parseInt(studentToCreate.student_gender, 10),
    student_level: parseInt(studentToCreate.student_level, 10),
    student_class: studentToCreate.student_class,
    student_phone: studentToCreate.student_phone,
    student_line_ID: studentToCreate.student_line_ID,
    student_image: studentToCreate.student_image,
    student_email: studentToCreate.student_email,
  };

  const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
  const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
  const emailRegex = /\S+@\S+\.\S+/; // Email regex //
  const numberRegex = /^\d+$/; // Numbers only //

  const StudentSchema = z.object({
    student_ID: z.number().refine((value) => {
      if (!value) {
        return false;
      }
      if (!numberRegex.test(value.toString())) {
        return false;
      }
      if (value.toString().length !== 5) {
        return false;
      }
      return true;
    }),
    student_position: z
      .number()
      .refine((value) => value !== 0, { message: "Please select a position" }),
    student_first_name: z
      .string()
      .nonempty()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "First name must contain only English alphabets.",
      }),
    student_last_name: z
      .string()
      .nonempty()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "Last name must contain only English alphabets.",
      }),
    student_nickname: z
      .string()
      .refine((value) => !value || englishAlphabetRegex.test(value), {
        message: "Nickname must contain only English alphabets.",
      }),
    student_first_name_thai: z
      .string()
      .nonempty()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai first name must contain only Thai alphabets.",
      }),
    student_last_name_thai: z
      .string()
      .nonempty()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai last name must contain only Thai alphabets.",
      }),
    student_nickname_thai: z
      .string()
      .refine((value) => !value || thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    student_gender: z.number().refine((value) => value !== 0, {
      message: "Please select a gender.",
    }),
    student_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    student_level: z.number().refine((value) => value !== 0, {
      message: "Please select a level.",
    }),
    student_class: z
      .string()
      .nonempty()
      .refine(
        (value) => {
          if (!value) {
            return false; // Class is required
          }
          if (!numberRegex.test(value)) {
            return false; // Class must contain only numbers.
          }
          return true; // Valid class
        },
        {
          message: "Invalid Class",
        }
      ),
    student_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    student_line_ID: z.string(),
    student_image: z.string(),
    student_email: z
      .string()
      .nonempty()
      .refine((value) => emailRegex.test(value), {
        message: "Invalid email address.",
      }),
  });

  const validationErrors: any = {
    student_ID: "",
    student_position: "",
    student_first_name: "",
    student_last_name: "",
    student_nickname: "",
    student_first_name_thai: "",
    student_last_name_thai: "",
    student_nickname_thai: "",
    student_gender: "",
    student_major: "",
    student_level: "",
    student_class: "",
    student_phone: "",
    student_line_ID: "",
    student_email: "",
    student_image: "",
  };

  // Perform validation. //
  const validationResult = StudentSchema.safeParse(updatedStudentToCreate);

  // Check if the image is uploaded. //
  if (!studentCreateImage) {
    validationErrors.student_image = "Image is required.";
  }

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "student_ID":
          validationErrors.student_ID = "Student ID is invalid.";
          break;
        case "student_position":
          validationErrors.student_position =
            issue.message || "Position is invalid.";
          break;
        case "student_first_name":
          validationErrors.student_first_name =
            issue.message || "First name is invalid.";
          break;
        case "student_last_name":
          validationErrors.student_last_name =
            issue.message || "Last name is invalid.";
          break;
        case "student_nickname":
          validationErrors.student_nickname =
            issue.message || "Nickname is invalid.";
          break;
        case "student_first_name_thai":
          validationErrors.student_first_name_thai =
            issue.message || "Thai first name is invalid.";
          break;
        case "student_last_name_thai":
          validationErrors.student_last_name_thai =
            issue.message || "Thai last name is invalid.";
          break;
        case "student_nickname_thai":
          validationErrors.student_nickname_thai =
            issue.message || "Thai nickname is invalid.";
          break;
        case "student_gender":
          validationErrors.student_gender =
            issue.message || "Gender is invalid.";
          break;
        case "student_major":
          validationErrors.student_major = issue.message || "Major is invalid.";
          break;
        case "student_level":
          validationErrors.student_level = issue.message || "Level is invalid.";
          break;
        case "student_class":
          validationErrors.student_class = issue.message || "Class is invalid.";
          break;
        case "student_phone":
          validationErrors.student_phone = issue.message || "Phone is invalid.";
          break;
        case "student_line_ID":
          validationErrors.student_line_ID =
            issue.message || "Line ID is invalid.";
          break;
        case "student_email":
          validationErrors.student_email = issue.message || "Email is invalid.";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    setIsSubmitting(false);
    return;
  } else {
    setValidationErrors(validationErrors);
  }

  // If validation passes. //
  // Create the student. //
  // Student image //
  let studentCreateImageFileName;
  let profileImageExtension;
  if (studentCreateImage) {
    const fileName = studentCreateImage.name.toLowerCase();
    profileImageExtension = fileName.split(".").pop();

    const studentCreateImageForm = new FormData();
    if (studentCreateImage != null) {
      studentCreateImageForm.append("image", studentCreateImage);
    }
    studentCreateImageFileName = `${
      updatedStudentToCreate.student_ID
    }_${updatedStudentToCreate.student_first_name.toLowerCase()}.${profileImageExtension}`;
    studentCreateImageForm.append("filename", studentCreateImageFileName);

    // Upload the image into the CDN. //
    try {
      await fetch(`${API_ENDPOINT}/api/v1/upload/image/student`, {
        method: "POST",
        body: studentCreateImageForm,
      });
    } catch (error) {
      setIsCreateSuccess(false);
    }
  }

  // Student information //
  // Get the user input from the state. //
  const studentToAddObject = {
    student_ID: updatedStudentToCreate.student_ID,
    student_position: 1,
    student_first_name: capitalizeFirstLetter(
      updatedStudentToCreate.student_first_name
    ),
    student_last_name: capitalizeFirstLetter(
      updatedStudentToCreate.student_last_name
    ),
    student_nickname: capitalizeFirstLetter(
      updatedStudentToCreate.student_nickname
    ),
    student_first_name_thai: updatedStudentToCreate.student_first_name_thai,
    student_last_name_thai: updatedStudentToCreate.student_last_name_thai,
    student_nickname_thai: updatedStudentToCreate.student_nickname_thai,
    student_gender: updatedStudentToCreate.student_gender,
    student_major: updatedStudentToCreate.student_major,
    student_level: updatedStudentToCreate.student_level,
    student_class: updatedStudentToCreate.student_class,
    student_phone: updatedStudentToCreate.student_phone,
    student_line_ID: updatedStudentToCreate.student_line_ID,
    student_email: updatedStudentToCreate.student_email
      .toString()
      .toLowerCase(),
    student_image: `/assets/profilePic/students/${
      updatedStudentToCreate.student_ID
    }_${updatedStudentToCreate.student_first_name.toLowerCase()}.${profileImageExtension}`,
  };
  const studentAddJSON = JSON.stringify(studentToAddObject);

  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/student/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: studentAddJSON,
    });

    if (response.status) {
      setIsCreateSuccess(true);
      callback();
    } else {
      setIsCreateSuccess(false);
    }
  } catch (error) {
    setIsCreateSuccess(false);
  }

  setIsSubmitting(false);
  callback();
};

export const handleStudentUpdate = async (
  studentToUpdate: any,
  studentUpdateImage: any,
  setValidationErrors: any,
  setIsSubmitting: any,
  setIsUpdateSuccess: any,
  callback: any
) => {
  // Disable the submit button. //
  setIsSubmitting(true);

  const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
  const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
  const emailRegex = /\S+@\S+\.\S+/; // Email regex //
  const numberRegex = /^\d+$/; // Numbers only //

  const StudentSchema = z.object({
    student_ID: z.number().refine((value) => {
      if (!value) {
        return false;
      }
      if (!numberRegex.test(value.toString())) {
        return false;
      }
      if (value.toString().length !== 5) {
        return false;
      }
      return true;
    }),
    student_position: z
      .number()
      .refine((value) => value !== 0, { message: "Please select a position" }),
    student_first_name: z
      .string()
      .nonempty()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "First name must contain only English alphabets.",
      }),
    student_last_name: z
      .string()
      .nonempty()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "Last name must contain only English alphabets.",
      }),
    student_nickname: z
      .string()
      .refine((value) => !value || englishAlphabetRegex.test(value), {
        message: "Nickname must contain only English alphabets.",
      }),
    student_first_name_thai: z
      .string()
      .nonempty()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai first name must contain only Thai alphabets.",
      }),
    student_last_name_thai: z
      .string()
      .nonempty()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai last name must contain only Thai alphabets.",
      }),
    student_nickname_thai: z
      .string()
      .refine((value) => !value || thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    student_gender: z.number().refine((value) => value !== 0, {
      message: "Please select a gender.",
    }),
    student_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    student_level: z.number().refine((value) => value !== 0, {
      message: "Please select a level.",
    }),
    student_class: z
      .string()
      .nonempty()
      .refine(
        (value) => {
          if (!value) {
            return false; // Class is required
          }
          if (!numberRegex.test(value)) {
            return false; // Class must contain only numbers.
          }
          return true; // Valid class
        },
        {
          message: "Invalid Class",
        }
      ),
    student_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    student_line_ID: z.string(),
    student_image: z.string(),
    student_email: z
      .string()
      .nonempty()
      .refine((value) => emailRegex.test(value), {
        message: "Invalid email address.",
      }),
  });

  const validationErrors: any = {
    student_ID: "",
    student_position: "",
    student_first_name: "",
    student_last_name: "",
    student_nickname: "",
    student_first_name_thai: "",
    student_last_name_thai: "",
    student_nickname_thai: "",
    student_gender: "",
    student_major: "",
    student_level: "",
    student_class: "",
    student_phone: "",
    student_line_ID: "",
    student_email: "",
  };

  // Perform validation. //
  const validationResult = StudentSchema.safeParse(studentToUpdate);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "student_ID":
          validationErrors.student_ID =
            issue.message || "Student ID is invalid.";
          break;
        case "student_position":
          validationErrors.student_position =
            issue.message || "Position is invalid.";
          break;
        case "student_first_name":
          validationErrors.student_first_name =
            issue.message || "First name is invalid.";
          break;
        case "student_last_name":
          validationErrors.student_last_name =
            issue.message || "Last name is invalid.";
          break;
        case "student_nickname":
          validationErrors.student_nickname =
            issue.message || "Nickname is invalid.";
          break;
        case "student_first_name_thai":
          validationErrors.student_first_name_thai =
            issue.message || "Thai first name is invalid.";
          break;
        case "student_last_name_thai":
          validationErrors.student_last_name_thai =
            issue.message || "Thai last name is invalid.";
          break;
        case "student_nickname_thai":
          validationErrors.student_nickname_thai =
            issue.message || "Thai nickname is invalid.";
          break;
        case "student_gender":
          validationErrors.student_gender =
            issue.message || "Gender is invalid.";
          break;
        case "student_major":
          validationErrors.student_major = issue.message || "Major is invalid.";
          break;
        case "student_level":
          validationErrors.student_level = issue.message || "Level is invalid.";
          break;
        case "student_class":
          validationErrors.student_class = issue.message || "Class is invalid.";
          break;
        case "student_phone":
          validationErrors.student_phone = issue.message || "Phone is invalid.";
          break;
        case "student_line_ID":
          validationErrors.student_line_ID =
            issue.message || "Line ID is invalid.";
          break;
        case "student_email":
          validationErrors.student_email = issue.message || "Email is invalid.";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    setIsSubmitting(false);
    return;
  } else {
    setValidationErrors(validationErrors);
  }

  // If validation passes. //
  // Update the student. //
  // Student image //
  let studentUpdateImageFileName;
  if (studentUpdateImage && typeof studentUpdateImage === "object") {
    const fileName = studentUpdateImage.name.toLowerCase();
    const profileImageExtension = fileName.split(".").pop();

    const studentUpdateImageForm = new FormData();
    if (studentUpdateImage != null) {
      studentUpdateImageForm.append("image", studentUpdateImage);
    }
    studentUpdateImageFileName = `${
      studentToUpdate.student_ID
    }_${studentToUpdate.student_first_name.toLowerCase()}.${profileImageExtension}`;
    studentUpdateImageForm.append("filename", studentUpdateImageFileName);

    // Upload the image into the CDN. //
    try {
      await fetch(`${API_ENDPOINT}/api/v1/upload/image/student`, {
        method: "POST",
        body: studentUpdateImageForm,
      });
    } catch (error) {
      setIsUpdateSuccess(false);
    }
  }

  const studentToUpdateObject = {
    id: studentToUpdate.primary_student_ID,
    studentInfo: {
      student_ID: studentToUpdate.student_ID,
      student_position: studentToUpdate.student_position,
      student_first_name: studentToUpdate.student_first_name,
      student_last_name: studentToUpdate.student_last_name,
      student_nickname: studentToUpdate.student_nickname,
      student_first_name_thai: studentToUpdate.student_first_name_thai,
      student_last_name_thai: studentToUpdate.student_last_name_thai,
      student_nickname_thai: studentToUpdate.student_nickname_thai,
      student_major: studentToUpdate.student_major,
      student_gender: studentToUpdate.student_gender,
      student_level: studentToUpdate.student_level,
      student_class: studentToUpdate.student_class,
      student_phone: studentToUpdate.student_phone,
      student_line_ID: studentToUpdate.student_line_ID,
      student_email: studentToUpdate.student_email.toString().toLowerCase(),
      student_image:
        studentUpdateImage && typeof studentUpdateImage === "object"
          ? `/assets/profilePic/students/${studentUpdateImageFileName}`
          : studentToUpdate.student_image,
    },
  };
  const studentUpdateJSON = JSON.stringify(studentToUpdateObject);

  // Update the student information in the table. //
  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/student/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: studentUpdateJSON,
    });

    if (response.ok) {
      setIsUpdateSuccess(true);
      callback();
    } else {
      setIsUpdateSuccess(false);
    }
  } catch (error) {
    setIsUpdateSuccess(false);
  }

  setIsSubmitting(false);
  callback();
};
