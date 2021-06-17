import http from "../httpCommon";

class ProfileDataService {
  getAll() {
    return http.get("/profile");
  }

  get(id) {
    return http.get(`/profile/${id}`);
  }

  create(data) {
    return http.post("/profile", data);
  }

  update(id, data) {
    return http.put(`/profile/${id}`, data);
  }

  delete(id) {
    return http.delete(`/profile/${id}`);
  }
}

export default new ProfileDataService();