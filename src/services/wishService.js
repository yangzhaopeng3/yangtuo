import axios from "axios";

export async function getUsersWishOfAMovie(wish) {
  var token = localStorage.getItem("token");
  var resp = await axios.get(`/api/wish/${wish.userId}/m/${wish.movieId}`, {
    headers: {
      token: token
    }
  });
  return resp.data;
}

export async function makeWish(wish) {
  var token = localStorage.getItem("token");
  var resp = await axios.post('/api/wish', wish, {
    headers: {
      token: token
    }
  });
  return resp.data;
}

export async function cancelWish(wid) {
  var token = localStorage.getItem("token");
  var resp = await axios.delete(`/api/wish/${wid}`, {
    headers: {
      token: token
    }
  });
  return resp.data;
}
