import { z } from "zod";
import { Teacher } from "../../../interfaces/common.interface";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleTeacherUpdate = async (
  teacherToUpdate: Teacher,
  teacherUpdateImage: any,
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

  const TeacherSchema = z.object({
    teacher_ID: z.number(),
    teacher_position: z.number(),
    teacher_first_name: z
      .string()
      .nonempty()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "First name must contain only English alphabets.",
      }),
    teacher_last_name: z
      .string()
      .nonempty()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "Last name must contain only English alphabets.",
      }),
    teacher_nickname: z
      .string()
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "Nickname must contain only English alphabets.",
      }),
    teacher_first_name_thai: z
      .string()
      .nonempty()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai first name must contain only Thai alphabets.",
      }),
    teacher_last_name_thai: z
      .string()
      .nonempty()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai last name must contain only Thai alphabets.",
      }),
    teacher_nickname_thai: z
      .string()
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    teacher_gender: z.number(),
    teacher_major: z.number(),
    teacher_level: z.number(),
    teacher_class: z
      .string()
      .nonempty()
      .refine((value) => numberRegex.test(value), {
        message: "Class must only contain numbers.",
      }),
    teacher_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    teacher_line_ID: z.string(),
    teacher_image: z.string(),
    teacher_email: z.string().nonempty(),
  });

  const validationErrors: any = {
    teacher_ID: "",
    teacher_position: "",
    teacher_first_name: "",
    teacher_last_name: "",
    teacher_nickname: "",
    teacher_first_name_thai: "",
    teacher_last_name_thai: "",
    teacher_nickname_thai: "",
    teacher_gender: "",
    teacher_major: "",
    teacher_level: "",
    teacher_class: "",
    teacher_phone: "",
    teacher_line_ID: "",
    teacher_email: "",
  };

  // Perform validation. //
  const validationResult = TeacherSchema.safeParse(teacherToUpdate);

  // If validation fails. //
  // Don't submit. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails.
      switch (issue.path[0]) {
        case "teacher_ID":
          validationErrors.teacher_ID =
            issue.message || "Teacher ID is invalid.";
          break;
        case "teacher_position":
          validationErrors.teacher_position =
            issue.message || "Position is invalid.";
          break;
        case "teacher_first_name":
          validationErrors.teacher_first_name =
            issue.message || "First name is invalid.";
          break;
        case "teacher_last_name":
          validationErrors.teacher_last_name =
            issue.message || "Last name is invalid.";
          break;
        case "teacher_nickname":
          validationErrors.teacher_nickname =
            issue.message || "Nickname is invalid.";
          break;
        case "teacher_first_name_thai":
          validationErrors.teacher_first_name_thai =
            issue.message || "Thai first name is invalid.";
          break;
        case "teacher_last_name_thai":
          validationErrors.teacher_last_name_thai =
            issue.message || "Thai last name is invalid.";
          break;
        case "teacher_nickname_thai":
          validationErrors.teacher_nickname_thai =
            issue.message || "Thai nickname is invalid.";
          break;
        case "teacher_gender":
          validationErrors.teacher_gender =
            issue.message || "Gender is invalid.";
          break;
        case "teacher_major":
          validationErrors.teacher_major = issue.message || "Major is invalid.";
          break;
        case "teacher_level":
          validationErrors.teacher_level = issue.message || "Level is invalid.";
          break;
        case "teacher_class":
          validationErrors.teacher_class = issue.message || "Class is invalid.";
          break;
        case "teacher_phone":
          validationErrors.teacher_phone = issue.message || "Phone is invalid.";
          break;
        case "teacher_line_ID":
          validationErrors.teacher_line_ID =
            issue.message || "Line ID is invalid.";
          break;
        case "teacher_email":
          validationErrors.teacher_email = issue.message || "Email is invalid.";
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
  // Update the teacher. //
  // Teacher image //
  let teacherUpdateImageFileName;
  if (teacherUpdateImage && typeof teacherUpdateImage === "object") {
    const fileName = teacherUpdateImage.name.toLowerCase();
    const profileImageExtension = fileName.split(".").pop();

    const teacherUpdateImageForm = new FormData();
    if (teacherUpdateImage != null) {
      teacherUpdateImageForm.append("image", teacherUpdateImage);
    }
    teacherUpdateImageFileName = `${
      teacherToUpdate.teacher_ID
    }_${teacherToUpdate.teacher_first_name.toLowerCase()}.${profileImageExtension}`;
    teacherUpdateImageForm.append("filename", teacherUpdateImageFileName);

    // Upload the image into the CDN. //
    try {
      await fetch(`${API_ENDPOINT}/api/v1/upload/image/teacher`, {
        method: "POST",
        body: teacherUpdateImageForm,
      });
    } catch (error) {
      console.log(error);
      setIsUpdateSuccess(false);
    }
  }

  const teacherToUpdateObject = {
    id: teacherToUpdate.primary_teacher_ID,
    teacherInfo: {
      teacher_ID: teacherToUpdate.teacher_ID,
      teacher_position: teacherToUpdate.teacher_position,
      teacher_first_name: teacherToUpdate.teacher_first_name,
      teacher_last_name: teacherToUpdate.teacher_last_name,
      teacher_nickname: teacherToUpdate.teacher_nickname,
      teacher_first_name_thai: teacherToUpdate.teacher_first_name_thai,
      teacher_last_name_thai: teacherToUpdate.teacher_last_name_thai,
      teacher_nickname_thai: teacherToUpdate.teacher_nickname_thai,
      teacher_major: teacherToUpdate.teacher_major,
      teacher_gender: teacherToUpdate.teacher_gender,
      teacher_phone: teacherToUpdate.teacher_phone,
      teacher_line_ID: teacherToUpdate.teacher_line_ID,
      teacher_email: teacherToUpdate.teacher_email.toString().toLowerCase(),
      teacher_image:
        teacherUpdateImage && typeof teacherUpdateImage === "object"
          ? `/assets/profilePic/teachers/${teacherUpdateImageFileName}`
          : teacherToUpdate.teacher_image,
    },
  };
  const teacherUpdateJSON = JSON.stringify(teacherToUpdateObject);

  // Update the teacher information in the table. //
  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/teacher/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: teacherUpdateJSON,
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
