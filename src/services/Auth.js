import BaseApi from "./API";

class Auth {
  static async register(data) {
    const response = await BaseApi.post("/register", data);
    return response;
  }

  static async login(data) {
    const response = await BaseApi.post("/login", data);
    return response;
  }

  static async getUser() {
    const response = await BaseApi.get("/user");
    return response;
  }

  static async logout() {
    const response = await BaseApi.get("/logout");
    return response;
  }

  static async forgot(data) {
    const response = await BaseApi.post("password/forgot", data);
    return response;
  }

  static async reset(data) {
    const response = await BaseApi.post("password/reset", data);
    return response;
  }

  static async verify(url) {
    const response = await BaseApi.get(url);
    return response;
  }
}

export default Auth;
