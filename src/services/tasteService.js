import axios from "axios";

export async function getAllTastes() {
  var resp = await axios.get("/api/taste");
  return resp.data;
}


export async function getMyTaste(userId) {
  var resp = await axios.get("/api/taste/" + userId);
  return resp.data;
}

export async function updateTaste(userTaste) {
  var token = localStorage.getItem("token");
  var resp = await axios.post('/api/taste', userTaste, {
    headers: {
      token: token
    }
  });
  return resp.data;
}
