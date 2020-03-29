export default async function fetchData({ method, url, json }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: json ? JSON.stringify(json) : null,
  });

  if (method === 'DELETE' && response.status === 200) {
    return;
  }

  return await response.json();
}
