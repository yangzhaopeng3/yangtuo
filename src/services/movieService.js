import axios from "axios"

export async function getMovieList(start = 1, limit = 10) {
  var resp = await axios.get("/api/movies", {
    params: {
      start: start,
      limit: limit
    }
  });
  return resp.data;
}


export async function getMovie(movieId) {
  var resp = await axios.get(`/api/movie/${movieId}`);
  return resp.data;
}

export async function getComments(movieId, start = 1, limit = 10) {
  var resp = await axios.get(`/api/rate/${movieId}`, {
    params: {
      start: start,
      limit: limit
    }
  });
  return resp.data;
}
