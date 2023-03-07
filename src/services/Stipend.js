import BaseApi from "./API";

class Stipend {
  static async create(data) {
    const response = await BaseApi.post("/stipends/create", data);
    return response;
  }

  static async stipends() {
    const response = await BaseApi.get("/stipends/me");
    return response;
  }
}

export default Stipend;
