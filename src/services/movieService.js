import axios from "axios"

export async function getMovieList(start = 1, limit = 12) {
  var resp = await axios.get("/api/movies", {
    params: {
      start: start,
      limit: limit
    }
  });
  return resp.data.data;
}

export async function search(content, start = 1, limit = 12) {
  var resp = await axios.get(`/api/movies/search/${content}`, {
    params: {
      start: start,
      limit: limit
    }
  });
  console.log(resp);
  return resp.data;
}


export async function getByTag(tag, start = 1, limit = 12) {
  var resp = await axios.get("/api/movies/tag", {
    params: {
      ...tag,
      start: start,
      limit: limit
    }
  });
  console.log(resp);
  return resp.data;
}


export async function getChart(start = 1, limit = 12) {
  var resp = await axios.get("/api/movies/chart", {
    params: {
      start: start,
      limit: limit
    }
  });
  return resp.data.data;
}


export async function getWishList(userId, start = 1, limit = 12) {
  var token = localStorage.getItem("token");
  var resp = await axios.get(`/api/people/${userId}/wish`, {
    params: {
      start: start,
      limit: limit
    },
    headers: {
      token: token
    }
  });
  return resp.data.data;
}

export async function getWatchedList(userId, start = 1, limit = 12) {
  var token = localStorage.getItem("token");
  var resp = await axios.get(`/api/people/${userId}/collect`, {
    params: {
      start: start,
      limit: limit
    },
    headers: {
      token: token
    }
  });
  return resp.data.data;
}


export async function getMovie(movieId) {
  var resp = await axios.get(`/api/movie/${movieId}`);
  console.log(resp)
  return resp.data.data;
}
