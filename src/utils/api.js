const api = "http://localhost:3001";

export const CATEGORIES = "categories";
export const POSTS = "posts";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

//used for 'GET /categories', GET /posts
export const getAll = schema =>
  fetch(`${api}/${schema}`, { headers })
    .then(res => res.json())
    .then(data => data);

//used for GET /posts/:id, GET /comments/:id
export const getData = (schema, id) =>
  fetch(`${api}/${schema}/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

//used for GET /:category/posts
export const getCategoryData = (category, schema, id) =>
  fetch(`${api}/${category}/${schema}`, { headers })
    .then(res => res.json())
    .then(data => data);

//used for 'POST /posts' , 'POST /comments'
export const postData = (schema, body) =>
  fetch(`${api}/${schema}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => data);

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(res => res.json())
    .then(data => data.books);
