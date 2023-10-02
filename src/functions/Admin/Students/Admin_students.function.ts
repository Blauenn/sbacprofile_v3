import { z } from "zod";
import { capitalizeFirstLetter } from "../../stringManipulation.function";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
const emailRegex = /\S+@\S+\.\S+/; // Email regex //
const numberRegex = /^\d+$/; // Numbers only //

const validateStudentObject = (
  studentObject: any,
  setValidationErrors: any,
  studentImage?: any
) => {
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
  const validationResult = StudentSchema.safeParse(studentObject);

  // Check if the image is uploaded. //
  if (!studentImage) {
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
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

const uploadStudentImage = async (
  studentObject: any,
  studentImageObject: any
) => {
  let studentImageFileExtension;
  const fileName = studentImageObject.name.toLowerCase();
  studentImageFileExtension = fileName.split(".").pop();

  const studentImageObjectForm = new FormData();
  if (studentImageObject != null) {
    studentImageObjectForm.append("image", studentImageObject);
  }
  const studentImageFileName = `${
    studentObject.student_ID
  }_${studentObject.student_first_name.toLowerCase()}.${studentImageFileExtension}`;
  studentImageObjectForm.append("filename", studentImageFileName);

  // Upload the image into the CDN. //
  try {
    await fetch(`${API_ENDPOINT}/api/v1/upload/image/student`, {
      method: "POST",
      body: studentImageObjectForm,
    });
    // Return the uploaded image file name //
    return studentImageFileName;
  } catch (error) {
    return false;
  }
};

export const handleStudentCreate = async (
  studentCreateObject: any,
  studentCreateImage: any,
  setValidationErrors: any
) => {
  const updatedStudentToCreate = {
    student_ID: parseInt(studentCreateObject.student_ID, 10),
    student_position: parseInt(studentCreateObject.student_position, 10),
    student_first_name: studentCreateObject.student_first_name,
    student_last_name: studentCreateObject.student_last_name,
    student_nickname: studentCreateObject.student_nickname,
    student_first_name_thai: studentCreateObject.student_first_name_thai,
    student_last_name_thai: studentCreateObject.student_last_name_thai,
    student_nickname_thai: studentCreateObject.student_nickname_thai,
    student_major: parseInt(studentCreateObject.student_major, 10),
    student_gender: parseInt(studentCreateObject.student_gender, 10),
    student_level: parseInt(studentCreateObject.student_level, 10),
    student_class: studentCreateObject.student_class,
    student_phone: studentCreateObject.student_phone,
    student_line_ID: studentCreateObject.student_line_ID,
    student_image: studentCreateObject.student_image,
    student_email: studentCreateObject.student_email,
  };

  // Perform the validation //
  const validation = validateStudentObject(
    updatedStudentToCreate,
    setValidationErrors,
    studentCreateImage
  );

  // If validation passes. //
  if (validation) {
    // Create the student. //
    // Student image //
    let studentImageFileName;
    if (studentCreateImage) {
      // After the image is uploaded, the image name will be returned. //
      studentImageFileName = uploadStudentImage(
        studentCreateObject,
        studentCreateImage
      );
    }

    // Student information //
    // Get the user input from the state. //
    const studentToAddObject = {
      student_ID: updatedStudentToCreate.student_ID,
      student_position: updatedStudentToCreate.student_position,
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
      student_image: `/assets/profilePic/students/${studentImageFileName}`,
    };
    const studentAddJSON = JSON.stringify(studentToAddObject);

    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/student/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: studentAddJSON,
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

export const handleStudentUpdate = async (
  studentUpdateObject: any,
  studentUpdateImage: any,
  setValidationErrors: any
) => {
  const updatedStudentToUpdate = {
    primary_student_ID: studentUpdateObject.primary_student_ID,
    student_ID: parseInt(studentUpdateObject.student_ID, 10),
    student_position: parseInt(studentUpdateObject.student_position, 10),
    student_first_name: studentUpdateObject.student_first_name,
    student_last_name: studentUpdateObject.student_last_name,
    student_nickname: studentUpdateObject.student_nickname,
    student_first_name_thai: studentUpdateObject.student_first_name_thai,
    student_last_name_thai: studentUpdateObject.student_last_name_thai,
    student_nickname_thai: studentUpdateObject.student_nickname_thai,
    student_major: parseInt(studentUpdateObject.student_major, 10),
    student_gender: parseInt(studentUpdateObject.student_gender, 10),
    student_level: parseInt(studentUpdateObject.student_level, 10),
    student_class: studentUpdateObject.student_class,
    student_phone: studentUpdateObject.student_phone,
    student_line_ID: studentUpdateObject.student_line_ID,
    student_image: studentUpdateObject.student_image,
    student_email: studentUpdateObject.student_email,
  };

  // Perform the validation //
  const validation = validateStudentObject(
    updatedStudentToUpdate,
    setValidationErrors,
  );

  // If validation passes. //
  if (validation) {
    // Update the student. //
    // Student image //
    let studentImageFileName;
    if (studentUpdateImage) {
      studentImageFileName = uploadStudentImage(
        studentUpdateObject,
        studentUpdateImage
      );
    }

    const studentUpdateObjectObject = {
      id: studentUpdateObject.primary_student_ID,
      studentInfo: {
        student_ID: studentUpdateObject.student_ID,
        student_position: studentUpdateObject.student_position,
        student_first_name: studentUpdateObject.student_first_name,
        student_last_name: studentUpdateObject.student_last_name,
        student_nickname: studentUpdateObject.student_nickname,
        student_first_name_thai: studentUpdateObject.student_first_name_thai,
        student_last_name_thai: studentUpdateObject.student_last_name_thai,
        student_nickname_thai: studentUpdateObject.student_nickname_thai,
        student_major: studentUpdateObject.student_major,
        student_gender: studentUpdateObject.student_gender,
        student_level: studentUpdateObject.student_level,
        student_class: studentUpdateObject.student_class,
        student_phone: studentUpdateObject.student_phone,
        student_line_ID: studentUpdateObject.student_line_ID,
        student_email: studentUpdateObject.student_email
          .toString()
          .toLowerCase(),
        student_image:
          studentUpdateImage && typeof studentUpdateImage === "object"
            ? `/assets/profilePic/students/${studentImageFileName}`
            : studentUpdateObject.student_image,
      },
    };
    const studentUpdateJSON = JSON.stringify(studentUpdateObjectObject);

    // Update the student information in the table. //
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/student/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: studentUpdateJSON,
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
