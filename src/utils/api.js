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

//get categoeries and posts
export const getInitialData = () => {
  return Promise.all([
    fetch(`${api}/categories`, { headers })
      .then(res => res.json())
      .then(data => data.categories),
    fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .then(data => data)
  ]).then(([categories, posts]) => ({
    categories,
    posts
  }));
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

//used for 'POST /posts/:id' , 'POST /comments/:id' option - [String]: Either "upVote" or "downVote".
export const postVote = (schema, id, option) =>
  fetch(`${api}/${schema}/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(option)
  })
    .then(res => res.json())
    .then(data => data);

//used for 'PUT /posts/:id' , 'PUT /comments/:id'
export const putData = (schema, id, post) => {
  return fetch(`${api}/${schema}/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());
};

//used for 'DELETE /posts/:id' , 'DELETE /comments/:id'
export const deleteData = (schema, id) => {
  return fetch(`${api}/${schema}/${id}`, {
    method: "DELETE",
    headers
  });
};
