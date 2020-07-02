import axios from "axios"

export async function getMovieList(start = 1, limit = 10) {
  var resp = await axios.get("/api/movies", {
    params: {
      start: start,
      limit: limit
    }
  });
  console.log(resp)
  return resp.data.data;
}


export async function getMovie(movieId) {
  var resp = await axios.get(`/api/movie/${movieId}`);
  console.log(resp)
  return resp.data.data;
}
