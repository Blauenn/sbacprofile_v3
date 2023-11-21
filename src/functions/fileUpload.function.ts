import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Upload file or image //
export const uploadFile = async (file: any, fileName: any, url: string) => {
  // Get the file object from the state. //
  const fileToUpload = new FormData();
  fileToUpload.append("file", file);
  fileToUpload.append("filename", `${fileName}`);

  try {
    const result = await fetch(`${API_ENDPOINT}${url}`, {
      method: "post",
      body: fileToUpload,
    });
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
