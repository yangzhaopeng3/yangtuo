import axios from "axios";

export async function getComments(movieId, start = 1, limit = 10) {
  var resp = await axios.get(`/api/rate/${movieId}`, {
    params: {
      start: start,
      limit: limit
    }
  });
  return resp.data.data;
}


export async function getUserAComment(movieId, userId) {
  var resp = await axios.get(`/api/rate/${movieId}/my/${userId}`);
  return resp.data;
}

export async function makeRate(rate) {
  var token = localStorage.getItem("token");
  var resp = await axios.post('/api/rate', rate, {
    headers: {
      token: token
    }
  });
  return resp.data;
}

export async function deleteRate(cid) {
  var token = localStorage.getItem("token");
  var resp = await axios.delete(`/api/rate/${cid}`, {
    headers: {
      token: token
    }
  });
  return resp.data;
}

export async function updateRate(rate) {
  var token = localStorage.getItem("token");
  var resp = await axios.put('/api/rate', rate, {
    headers: {
      token: token
    }
  });
  return resp.data;
}
