import { z } from "zod";
import { ValidationErrors } from "../../../interfaces/common.interface";
import { uploadFile } from "../../fileUpload.function";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

const validateRequestFormObject = (
  requestFormObject: any,
  setValidationErrors: any
) => {
  const RequestFormSchema = z.object({
    request_form_title: z.string().min(1),
    request_form_description: z.string().min(1),
  });

  const validationErrors: ValidationErrors = {
    request_form_title: "",
    request_form_description: "",
  };

  const validationResult = RequestFormSchema.safeParse(requestFormObject);

  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      if (issue.path[0] === "request_form_title") {
        validationErrors.request_form_title = "The title should not be empty.";
      } else if (issue.path[0] === "request_form_description") {
        validationErrors.request_form_description =
          "The description should not be empty.";
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

export const handleRequestFormCreate = async (
  requestFormCreateObject: any,
  request_form_student_ID: number,
  requestFormFile: any,
  requestFormFileName: string,
  setValidationErrors: any
) => {
  // Perform the validation //
  const validation = validateRequestFormObject(
    requestFormCreateObject,
    setValidationErrors
  );

  // If validation passes //
  if (validation) {
    // Upload the file //
    if (requestFormFile) {
      uploadFile(
        requestFormFile,
        requestFormFileName,
        "/api/v1/upload/file/requestForm"
      );
    }

    // Upload the request form information. //
    const requestFormObject = {
      request_form_student_ID: request_form_student_ID,
      request_form_title: requestFormCreateObject.request_form_title,
      request_form_description:
        requestFormCreateObject.request_form_description,
      request_form_attached_file: requestFormFile
        ? `/assets/files/requestForms/${requestFormFileName}`
        : "",
    };
    const requestFormJSON = JSON.stringify(requestFormObject);

    // Add the data into the request_form table. //
    try {
      const result = await fetch(
        `${API_ENDPOINT}/api/v1/forms/requestForm/create`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: requestFormJSON,
        }
      );
      const response = await result.json();

      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export const handleRequestFormDelete = async (request_form_ID: number) => {
  const requestFormToDelete = {
    id: request_form_ID,
  };
  const requestFormToDeleteJSON = JSON.stringify(requestFormToDelete);

  // Delete the leave notice //
  try {
    const result = await fetch(
      `${API_ENDPOINT}/api/v1/forms/requestForm/delete`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: requestFormToDeleteJSON,
      }
    );
    const response = await result.json();

    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
