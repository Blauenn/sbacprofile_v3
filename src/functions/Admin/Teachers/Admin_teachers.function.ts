import { z } from "zod";
import { capitalize_first_letter } from "../../stringManipulation.function";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
const emailRegex = /\S+@\S+\.\S+/; // Email regex //
const numberRegex = /^\d+$/; // Numbers only //

const validateTeacherObject = (
  teacherObject: any,
  setValidationErrors: any,
  teacherImage?: any
) => {
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
      .min(1)
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "First name must contain only English alphabets.",
      }),
    teacher_last_name: z
      .string()
      .min(1)
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
      .min(1)
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai first name must contain only Thai alphabets.",
      }),
    teacher_last_name_thai: z
      .string()
      .min(1)
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
      .min(1)
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
  const validationResult = TeacherSchema.safeParse(teacherObject);

  // Check if the image is uploaded. //
  if (!teacherImage) {
    validationErrors.teacher_image = "Image is required.";
  }

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
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

const uploadTeacherImage = async (
  teacherObject: any,
  teacherImageObject: any
) => {
  let teacherImageFileExtension;
  const fileName = teacherImageObject.name.toLowerCase();
  teacherImageFileExtension = fileName.split(".").pop();

  const teacherImageObjectForm = new FormData();
  if (teacherImageObject != null) {
    teacherImageObjectForm.append("image", teacherImageObject);
  }
  const teacherImageFileName = `${
    teacherObject.teacher_ID
  }_${teacherObject.teacher_first_name.toLowerCase()}.${teacherImageFileExtension}`;
  teacherImageObjectForm.append("filename", teacherImageFileName);

  // Upload the image into the CDN. //
  try {
    await fetch(`${API_ENDPOINT}/api/v1/upload/image/teacher`, {
      method: "POST",
      body: teacherImageObjectForm,
    });
    // Return the uploaded image file name //
    return teacherImageFileName;
  } catch (error) {
    return false;
  }
};

export const handleTeacherCreate = async (
  teacherCreateObject: any,
  teacherCreateImage: any,
  setValidationErrors: any
) => {
  const updatedTeacherToCreate = {
    primary_teacher_ID: teacherCreateObject.primary_teacher_ID,
    teacher_ID: parseInt(teacherCreateObject.teacher_ID, 10),
    teacher_position: parseInt(teacherCreateObject.teacher_position, 10),
    teacher_first_name: teacherCreateObject.teacher_first_name,
    teacher_last_name: teacherCreateObject.teacher_last_name,
    teacher_nickname: teacherCreateObject.teacher_nickname,
    teacher_first_name_thai: teacherCreateObject.teacher_first_name_thai,
    teacher_last_name_thai: teacherCreateObject.teacher_last_name_thai,
    teacher_nickname_thai: teacherCreateObject.teacher_nickname_thai,
    teacher_major: parseInt(teacherCreateObject.teacher_major, 10),
    teacher_gender: parseInt(teacherCreateObject.teacher_gender, 10),
    teacher_phone: teacherCreateObject.teacher_phone,
    teacher_line_ID: teacherCreateObject.teacher_line_ID,
    teacher_image: teacherCreateObject.teacher_image,
    teacher_email: teacherCreateObject.teacher_email,
  };

  // Perform the validation //
  const validation = validateTeacherObject(
    updatedTeacherToCreate,
    setValidationErrors,
    teacherCreateImage
  );

  // If validation passes. //
  if (validation) {
    // Create the teacher. //
    // Teacher image //
    let teacherImageFileName;
    if (teacherCreateImage) {
      // After the image is uploaded, the image name will be returned. //
      teacherImageFileName = await uploadTeacherImage(
        teacherCreateObject,
        teacherCreateImage
      );
    }

    // Teacher information //
    // Get the user input from the state. //
    const teacherToAddObject = {
      teacher_ID: updatedTeacherToCreate.teacher_ID,
      teacher_position: updatedTeacherToCreate.teacher_position,
      teacher_first_name: capitalize_first_letter(
        updatedTeacherToCreate.teacher_first_name
      ),
      teacher_last_name: capitalize_first_letter(
        updatedTeacherToCreate.teacher_last_name
      ),
      teacher_nickname: capitalize_first_letter(
        updatedTeacherToCreate.teacher_nickname
      ),
      teacher_first_name_thai: updatedTeacherToCreate.teacher_first_name_thai,
      teacher_last_name_thai: updatedTeacherToCreate.teacher_last_name_thai,
      teacher_nickname_thai: updatedTeacherToCreate.teacher_nickname_thai,
      teacher_gender: updatedTeacherToCreate.teacher_gender,
      teacher_major: updatedTeacherToCreate.teacher_major,
      teacher_phone: updatedTeacherToCreate.teacher_phone,
      teacher_line_ID: updatedTeacherToCreate.teacher_line_ID,
      teacher_email: updatedTeacherToCreate.teacher_email
        .toString()
        .toLowerCase(),
      teacher_image: `/assets/profilePic/teachers/${teacherImageFileName}`,
    };
    const teacherAddJSON = JSON.stringify(teacherToAddObject);

    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/teacher/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: teacherAddJSON,
      });

      if (response.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export const handleTeacherUpdate = async (
  teacherUpdateObject: any,
  teacherUpdateImage: any,
  setValidationErrors: any
) => {
  const updatedTeacherToUpdate = {
    primary_teacher_ID: teacherUpdateObject.primary_teacher_ID,
    teacher_ID: parseInt(teacherUpdateObject.teacher_ID, 10),
    teacher_position: parseInt(teacherUpdateObject.teacher_position, 10),
    teacher_first_name: teacherUpdateObject.teacher_first_name,
    teacher_last_name: teacherUpdateObject.teacher_last_name,
    teacher_nickname: teacherUpdateObject.teacher_nickname,
    teacher_first_name_thai: teacherUpdateObject.teacher_first_name_thai,
    teacher_last_name_thai: teacherUpdateObject.teacher_last_name_thai,
    teacher_nickname_thai: teacherUpdateObject.teacher_nickname_thai,
    teacher_major: parseInt(teacherUpdateObject.teacher_major, 10),
    teacher_gender: parseInt(teacherUpdateObject.teacher_gender, 10),
    teacher_phone: teacherUpdateObject.teacher_phone,
    teacher_line_ID: teacherUpdateObject.teacher_line_ID,
    teacher_image: teacherUpdateObject.teacher_image,
    teacher_email: teacherUpdateObject.teacher_email,
  };

  // Perform the validation //
  const validation = validateTeacherObject(
    updatedTeacherToUpdate,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Update the teacher. //
    // Teacher image //
    let teacherImageFileName;
    if (teacherUpdateImage) {
      // After the image is uploaded, the image name will be returned. //
      teacherImageFileName = await uploadTeacherImage(
        teacherUpdateObject,
        teacherUpdateImage
      );
    }

    const teacherUpdateObjectObject = {
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
            ? `/assets/profilePic/teachers/${teacherImageFileName}`
            : updatedTeacherToUpdate.teacher_image,
      },
    };
    const teacherUpdateJSON = JSON.stringify(teacherUpdateObjectObject);

    // Update the teacher information in the table. //
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/teacher/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: teacherUpdateJSON,
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export const handleTeacherDelete = async (teacher_ID: number) => {
  const teacherDelete = {
    id: teacher_ID,
  };
  const teacherDeleteJSON = JSON.stringify(teacherDelete);

  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/teacher/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: teacherDeleteJSON,
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
