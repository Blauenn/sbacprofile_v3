import { z } from "zod";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleTeacherUpdate = async (
  teacherToUpdate: any,
  teacherUpdateImage: any,
  setValidationErrors: any,
  setIsSubmitting: any,
  setIsUpdateSuccess: any,
  callback: any
) => {
  // Disable the submit button. //
  setIsSubmitting(true);

  const updatedTeacherToUpdate = {
    primary_teacher_ID: teacherToUpdate.primary_teacher_ID,
    teacher_ID: parseInt(teacherToUpdate.teacher_ID, 10),
    teacher_position: parseInt(teacherToUpdate.teacher_position, 10),
    teacher_first_name: teacherToUpdate.teacher_first_name,
    teacher_last_name: teacherToUpdate.teacher_last_name,
    teacher_nickname: teacherToUpdate.teacher_nickname,
    teacher_first_name_thai: teacherToUpdate.teacher_first_name_thai,
    teacher_last_name_thai: teacherToUpdate.teacher_last_name_thai,
    teacher_nickname_thai: teacherToUpdate.teacher_nickname_thai,
    teacher_major: parseInt(teacherToUpdate.teacher_major, 10),
    teacher_gender: parseInt(teacherToUpdate.teacher_gender, 10),
    teacher_phone: teacherToUpdate.teacher_phone,
    teacher_line_ID: teacherToUpdate.teacher_line_ID,
    teacher_image: teacherToUpdate.teacher_image,
    teacher_email: teacherToUpdate.teacher_email,
  };

  const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
  const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
  const emailRegex = /\S+@\S+\.\S+/; // Email regex //
  const numberRegex = /^\d+$/; // Numbers only //

  const TeacherSchema = z.object({
    teacher_ID: z.number().refine((value) => {
      if (!value) {
        return false;
      }
      if (!numberRegex.test(value.toString())) {
        return false;
      }
      if (value.toString().length !== 8) {
        return false;
      }
      return true;
    }),
    teacher_position: z
      .number()
      .refine((value) => value !== 0, { message: "Please select a position" }),
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
      .refine((value) => !value || englishAlphabetRegex.test(value), {
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
      .refine((value) => !value || thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    teacher_gender: z.number().refine((value) => value !== 0, {
      message: "Please select a gender.",
    }),
    teacher_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    teacher_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    teacher_line_ID: z.string(),
    teacher_image: z.string(),
    teacher_email: z
      .string()
      .nonempty()
      .refine((value) => emailRegex.test(value), {
        message: "Invalid email address.",
      }),
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
    teacher_phone: "",
    teacher_line_ID: "",
    teacher_email: "",
  };

  // Perform validation. //
  const validationResult = TeacherSchema.safeParse(updatedTeacherToUpdate);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
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
      updatedTeacherToUpdate.teacher_ID
    }_${updatedTeacherToUpdate.teacher_first_name.toLowerCase()}.${profileImageExtension}`;
    teacherUpdateImageForm.append("filename", teacherUpdateImageFileName);

    // Upload the image into the CDN. //
    try {
      await fetch(`${API_ENDPOINT}/api/v1/upload/image/teacher`, {
        method: "POST",
        body: teacherUpdateImageForm,
      });
    } catch (error) {
      setIsUpdateSuccess(false);
    }
  }

  const teacherToUpdateObject = {
    id: updatedTeacherToUpdate.primary_teacher_ID,
    teacherInfo: {
      teacher_ID: updatedTeacherToUpdate.teacher_ID,
      teacher_position: updatedTeacherToUpdate.teacher_position,
      teacher_first_name: updatedTeacherToUpdate.teacher_first_name,
      teacher_last_name: updatedTeacherToUpdate.teacher_last_name,
      teacher_nickname: updatedTeacherToUpdate.teacher_nickname,
      teacher_first_name_thai: updatedTeacherToUpdate.teacher_first_name_thai,
      teacher_last_name_thai: updatedTeacherToUpdate.teacher_last_name_thai,
      teacher_nickname_thai: updatedTeacherToUpdate.teacher_nickname_thai,
      teacher_major: updatedTeacherToUpdate.teacher_major,
      teacher_gender: updatedTeacherToUpdate.teacher_gender,
      teacher_phone: updatedTeacherToUpdate.teacher_phone,
      teacher_line_ID: updatedTeacherToUpdate.teacher_line_ID,
      teacher_email: updatedTeacherToUpdate.teacher_email
        .toString()
        .toLowerCase(),
      teacher_image:
        teacherUpdateImage && typeof teacherUpdateImage === "object"
          ? `/assets/profilePic/teachers/${teacherUpdateImageFileName}`
          : updatedTeacherToUpdate.teacher_image,
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
      setIsUpdateSuccess(false);
    }
  } catch (error) {
    setIsUpdateSuccess(false);
  }

  setIsSubmitting(false);
  callback();
};
