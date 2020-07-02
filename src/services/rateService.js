import axios from "axios";

var token = localStorage.getItem("token");

export async function getComments(movieId, start = 1, limit = 10) {
  var resp = await axios.get(`/api/rate/${movieId}`, {
    params: {
      start: start,
      limit: limit
    }
  });
  console.log("resp.data.data -- comments");
  console.log(resp)
  return resp.data.data;
}


export async function getUserAComment(movieId, userId) {
  console.log(`/api/rate/${movieId}/my/${userId}`);
  var resp = await axios.get(`/api/rate/${movieId}/my/${userId}`);
  console.log(resp.data);
  return resp.data;
}

export async function makeRate(rate) {
  console.log("service make rate " + rate);
  if (token == null) {
    return null;
  }
  var resp = await axios.post('/api/rate', rate, {
    headers: {
      token: token
    }
  });
  return resp.data;
}

export async function deleteRate(cid) {
  var resp = await axios.delete(`/api/rate/${cid}`, {
    headers: {
      token: token
    }
  });
  return resp.data;
}

export async function updateRate(rate) {
  var resp = await axios.put('/api/rate', rate, {
    headers: {
      token: token
    }
  });
  return resp.data;
}
