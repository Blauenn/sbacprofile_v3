import { z } from "zod";
import { Student } from "../../../interfaces/common.interface";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleStudentUpdate = async (
  studentToUpdate: Student,
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
  const numberRegex = /^\d+$/; // Numbers only //

  const StudentSchema = z.object({
    student_ID: z.number(),
    student_position: z.number(),
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
      .refine((value) => englishAlphabetRegex.test(value), {
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
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    student_gender: z.number(),
    student_major: z.number(),
    student_level: z.number(),
    student_class: z
      .string()
      .nonempty()
      .refine((value) => numberRegex.test(value), {
        message: "Class must only contain numbers.",
      }),
    student_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    student_line_ID: z.string(),
    student_image: z.string(),
    student_email: z.string().nonempty(),
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
  // Don't submit. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails.
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
      console.log(error);
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
      console.log("Error:", response.status, response.statusText);
      setIsUpdateSuccess(false);
    }
  } catch (error) {
    setIsUpdateSuccess(false);
  }

  setIsSubmitting(false);
  callback();
};
