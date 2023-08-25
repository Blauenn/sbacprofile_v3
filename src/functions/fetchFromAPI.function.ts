export const getData = async (url: string, callback: any) => {
  await fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((request) => {
      callback(request.result);
    });
};

export const getDataAuthenticated = async (
  url: string,
  accessToken: string,
  callback: any
) => {
  await fetch(url, {
    method: "get",
    headers: { "Content-Type": "application/json", authorization: accessToken },
  })
    .then((response) => response.json())
    .then((request) => {
      callback(request.result);
    });
};

export const postData = async (url: string, body: any, callback: any) => {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  const data = await response.json();
  if (data.status) {
    callback(data.result);
  } else {
    callback(data.status);
  }
};

export const postDataAutheticated = async (
  url: string,
  body: any,
  accessToken: string,
  callback: any
) => {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json", authorization: accessToken },
    body: body,
  });
  const data = await response.json();
  callback(data.status);
};
