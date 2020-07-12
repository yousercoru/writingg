import axios from "axios";
import { clientApi } from "./apis";

export function getAuthUser() {
  return clientApi.getClient().get(`api/auth/user`);
}

export function login(formData) {
  return clientApi.getClient().post(`api/auth`, formData);
}

export function updateAccount(formData) {
  return clientApi.getClient().put(`api/update-account`, formData);
}
