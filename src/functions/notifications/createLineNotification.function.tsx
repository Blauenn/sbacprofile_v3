export const createLineNotification = () => {
  const urlLineNotification = "https://notify-api.line.me/api/notify";
  const token = "d7LYEY9gAlnapc1cccA79PSsnGmZ6ZevIOmy0yQa9pS";

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const formData = new FormData();
  formData.append("message", "Test Message!");

  fetch(urlLineNotification, {
    method: "POST",
    headers: headers,
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok (status: ${response.status})`
        );
      }
      return response.text();
    })
    .then((body) => {
      console.log(body);
    })
    .catch((err) => {
      console.error(err);
    });
};
