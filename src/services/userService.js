import axios from "axios";

export async function login(loginInfo) {
  var resp = await axios.post("/api/login", loginInfo);
  var token = resp.headers.token; // 拿到服务器的令牌
  if (token) {
    // 把令牌保存下来
    localStorage.setItem("token", token);
  }
  return resp.data;
}

// 使用保存的令牌从服务器换取登录信息
export async function whoAmI() {
  var token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  var resp = await axios.get("/api/whoami", {
    headers: {
      token: token,
    },
  });
  // console.log("whoami")
  // console.log(resp)
  return resp.data.data;
}

// 注销
export function loginOut() {
  localStorage.removeItem("token");
}

// 注册
export async function reg(userInfo) {
  var resp = await axios.post("/api/register", userInfo);
  return resp.data;
}


export async function updateProfile(userInfo) {
  var resp = await axios.post("/api/profile", userInfo);
  return resp.data;
}
