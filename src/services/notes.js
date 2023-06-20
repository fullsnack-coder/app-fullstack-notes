export const getNotes = async () => {
  const resp = await fetch("http://localhost:3000/notes", {
    method: "GET",
  });

  const respJSON = await resp.json();
  return respJSON;
};

export const addNote = async ({ title, body }) => {
  const resp = await fetch("http://localhost:3000/notes", {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respJSON = await resp.json();

  return respJSON;
};

export const editNote = async ({ id, title, body }) => {
  const resp = await fetch(`http://localhost:3000/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respJSON = await resp.json();

  return respJSON;
};

export const deleteNote = async (id) => {
  const resp = await fetch(`http://localhost:3000/notes/${id}`, {
    method: "DELETE",
  });

  const respJSON = await resp.json();

  return respJSON;
};
