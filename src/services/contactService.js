import { fetchData } from './fetchData';

export async function getContacts(id, json) {
  return fetchData({
    method: 'GET',
    url: `/Contacts`,
  });
}

export async function addContact(json) {
  return fetchData({
    method: 'POST',
    url: `/Contacts`,
    json,
  });
}

export async function editContact(id, json) {
  return fetchData({
    method: 'PATCH',
    url: `/Contacts/${id}`,
    json,
  });
}

export async function deleteContact(id, json) {
  return fetchData({
    method: 'PATCH',
    url: `/Contacts/${id}`,
    json,
  });
}
