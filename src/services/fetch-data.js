export async function fetchData({ method, url, hasNoResponse, json }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
    method: method,
    headers: {
      'content-type': 'application/json',
    },
    body: json ? JSON.stringify(json) : null,
  });

  if (hasNoResponse) {
    return;
  }

  return await response.json();
}
