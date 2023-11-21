import { z } from "zod";
import { ValidationErrors } from "../../interfaces/common.interface";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

const validateClassroomObject = (
  classroomObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const ClassroomSchema = z.object({
    classroom_level: z.number(),
    classroom_class: z.number(),
    classroom_major: z.number(),
    classroom_homeroom_teacher: z.number(),
  });

  const validationErrors: ValidationErrors = {
    classroom_level: "",
    classroom_class: "",
    classroom_major: "",
    classroom_homeroom_teacher: "",
  };

  // Perform validation. //
  const validationResult = ClassroomSchema.safeParse(classroomObject);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      switch (issue.path[0]) {
        case "classroom_level":
          validationErrors.classroom_level = "Classroom level is invalid.";
          break;
        case "classroom_class":
          validationErrors.classroom_class = "Classroom number is invalid.";
          break;
        case "classroom_major":
          validationErrors.classroom_major = "Classroom major is invalid.";
          break;
        case "classroom_homeroom_teacher":
          validationErrors.classroom_homeroom_teacher =
            "Classroom homeroom teacher is invalid.";
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

export const handleClassroomUpdate = async (
  classroomUpdateObject: any,
  setValidationErrors: any
) => {
  const updatedClassroomToUpdate = {
    classroom_ID: classroomUpdateObject.classroom_ID    ,
    classroom_level: parseInt(classroomUpdateObject.classroom_level),
    classroom_class: parseInt(classroomUpdateObject.classroom_class),
    classroom_major: parseInt(classroomUpdateObject.classroom_major),
    classroom_homeroom_teacher: parseInt(
      classroomUpdateObject.classroom_homeroom_teacher
    ),
  };

  // Perform the validation //
  const validation = validateClassroomObject(
    updatedClassroomToUpdate,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Update the classroom. //
    const classroomToUpdateObject = {
      id: updatedClassroomToUpdate.classroom_ID,
      classroomInfo: {
        classroom_level: updatedClassroomToUpdate.classroom_level,
        classroom_class: updatedClassroomToUpdate.classroom_class,
        classroom_major: updatedClassroomToUpdate.classroom_major,
        classroom_homeroom_teacher:
          updatedClassroomToUpdate.classroom_homeroom_teacher,
      },
    };
    const classroomUpdateJSON = JSON.stringify(classroomToUpdateObject);

    // Change the data in the classroom table //
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/classroom/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: classroomUpdateJSON,
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
