import { get, post} from "../utils/request";

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
  return get("/api/v1/admin/users", { page, per: 2 });
}