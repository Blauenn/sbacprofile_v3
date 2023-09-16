import { z } from "zod";
import dayjs from "dayjs";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleAnnouncementCreate = async (
  announcementAddObject: any,
  announcementImage: any,
  announcementImageName: string,
  setValidationErrors: any,
  callback: (status: boolean) => void
) => {
  const currentDate = dayjs();

  const AnnouncementSchema = z.object({
    announcement_status: z.number(),
    announcement_title: z.string().nonempty(),
    announcement_description: z.string().nonempty(),
    announcement_image: z.string(),
  });

  const validationErrors: any = {
    announcement_title: "",
    announcement_description: "",
  };

  // Perform validation and collect error messages. //
  const validationResult = AnnouncementSchema.safeParse(announcementAddObject);

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
    return;
  } else {
    setValidationErrors(validationErrors);
  }

  // If the validation passes. //
  // Announcement information. //
  const announcementAddObjectObject = {
    announcement_status: announcementAddObject.announcement_status,
    announcement_title: announcementAddObject.announcement_title,
    announcement_description: announcementAddObject.announcement_description,
    announcement_image: `/assets/files/announcements/${announcementImageName}`,
    announcement_create_datetime: currentDate,
  };
  const announcementAddObjectJSON = JSON.stringify(announcementAddObjectObject);

  // Announcement image. //
  const announcementAddImage = new FormData();
  if (announcementImage != null) {
    announcementAddImage.append("image", announcementImage);
  }
  announcementAddImage.append("filename", `${announcementImageName}`);

  // Upload the announcement information. //
  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/announcement/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: announcementAddObjectJSON,
    });

    if (response.status) {
      console.log("Upload success.");
      callback(true);
    } else {
      console.log("Upload failed.");
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
        body: announcementAddImage,
      });
    } catch (error) {
      callback(false);
    }
  }
};
