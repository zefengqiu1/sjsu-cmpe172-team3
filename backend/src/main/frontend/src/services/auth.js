import {put, del, get, post} from "../utils/request";

/**
 * user login
 * @param {*} user
 *  userName
 *  password
 */
export function loginApi(user) {
  return post("/api/v1/auth/manager_login", user);
}

export function registerApi(user) {
  return post("/api/v1/auth/register", user);
}

export function listUserApi(page = 1) {
  return get("/api/v1/auth/users", { page, per: 2 });
}

export function delUser(id, data) {
  return del(`/api/v1/auth/users/${id}`);
}

export function getUserById(id) {
  return get(`/api/v1/auth/users/${id}`);
}

/**
 * update data
 * @param {*} id
 * @param {*} data
 */
export function modifyUser(id, data) {
  return put(`/api/v1/auth/users/${id}`, data);
}