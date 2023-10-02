import { z } from "zod";
import dayjs from "dayjs";
import { Announcement } from "../../../interfaces/common.interface";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const get_announcement_status_text = (status: number | undefined) => {
  let status_text;

  if (status === 1) {
    status_text = "Shown";
  } else {
    status_text = "Hidden";
  }

  return status_text;
};

const validateAnnoucementObject = (
  announcementObject: any,
  setValidationErrors: any,
  callback: any
) => {
  const AnnouncementSchema = z.object({
    announcement_status: z.number(),
    announcement_title: z.string().nonempty(),
    announcement_description: z.string().nonempty(),
    announcement_image: z.string(),
  });

  const validationErrors: any = {
    announcement_title: "",
    announcement_status: "",
    announcement_description: "",
  };

  // Perform validation and collect error messages. //
  const validationResult = AnnouncementSchema.safeParse(announcementObject);

  // If validation fails. //
  // Don't submit. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "announcement_title":
          validationErrors.announcement_title =
            "The title should not be empty.";
          break;
        case "announcement_description":
          validationErrors.announcement_description =
            "The description should not be empty.";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    callback(false);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

export const handleAnnouncementCreate = async (
  announcementCreateObject: any,
  announcementImage: any,
  announcementImageName: string,
  setValidationErrors: any,
  callback: (status: boolean) => void
) => {
  const currentDate = dayjs();

  const validation = validateAnnoucementObject(
    announcementCreateObject,
    setValidationErrors,
    callback
  );

  // If the validation passes. //
  if (validation) {
    // Announcement information. //
    const announcementCreateObjectToPost = {
      announcement_status: announcementCreateObject.announcement_status,
      announcement_title: announcementCreateObject.announcement_title,
      announcement_description:
        announcementCreateObject.announcement_description,
      announcement_image: `/assets/files/announcements/${announcementImageName}`,
      announcement_create_datetime: currentDate,
    };
    const announcementCreateObjectJSON = JSON.stringify(
      announcementCreateObjectToPost
    );

    // Announcement image. //
    const announcementCreateImage = new FormData();
    if (announcementImage != null) {
      announcementCreateImage.append("image", announcementImage);
    }
    announcementCreateImage.append("filename", `${announcementImageName}`);

    // Upload the announcement information. //
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v1/announcement/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: announcementCreateObjectJSON,
        }
      );

      if (response.status) {
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      callback(false);
    }

    // Upload the image information into a CDN. //
    if (announcementImage != null) {
      try {
        await fetch(`${API_ENDPOINT}/api/v1/upload/image/announcement`, {
          method: "POST",
          body: announcementCreateImage,
        });
      } catch (error) {
        callback(false);
      }
    }
  }
};

export const handleAnnouncementUpdate = async (
  announcementUpdateObject: any,
  announcementImage: any,
  announcementImageName: string,
  setValidationErrors: any,
  callback: (status: boolean) => void
) => {
  const updatedAnnouncementToUpdate = {
    announcement_ID: announcementUpdateObject.announcement_ID,
    announcement_status: parseInt(
      announcementUpdateObject.announcement_status,
      10
    ),
    announcement_title: announcementUpdateObject.announcement_title,
    announcement_description: announcementUpdateObject.announcement_description,
    announcement_create_datetime:
      announcementUpdateObject.announcement_create_datetime,
    announcement_image: announcementUpdateObject.announcement_image,
  };

  const validation = validateAnnoucementObject(
    updatedAnnouncementToUpdate,
    setValidationErrors,
    callback
  );

  // If the validation passes. //
  if (validation) {
    // Announcement information. //
    const announcementUpdateObjectToPost = {
      id: updatedAnnouncementToUpdate.announcement_ID,
      announcementInfo: {
        announcement_status: updatedAnnouncementToUpdate.announcement_status,
        announcement_title: updatedAnnouncementToUpdate.announcement_title,
        announcement_description:
          updatedAnnouncementToUpdate.announcement_description,
        announcement_image: `/assets/files/announcements/${announcementImageName}`,
        announcement_create_datetime:
          updatedAnnouncementToUpdate.announcement_create_datetime,
      },
    };
    const announcementUpdateObjectJSON = JSON.stringify(
      announcementUpdateObjectToPost
    );

    // Announcement image. //
    const announcementUpdateImage = new FormData();
    if (announcementImage != null) {
      announcementUpdateImage.append("image", announcementImage);
    }
    announcementUpdateImage.append("filename", `${announcementImageName}`);

    // Upload the announcement information. //
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v1/announcement/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: announcementUpdateObjectJSON,
        }
      );

      if (response.status) {
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      callback(false);
    }

    // Upload the image information into a CDN. //
    if (announcementImage != null) {
      try {
        await fetch(`${API_ENDPOINT}/api/v1/upload/image/announcement`, {
          method: "POST",
          body: announcementUpdateImage,
        });
      } catch (error) {
        callback(false);
      }
    }
  }
};
