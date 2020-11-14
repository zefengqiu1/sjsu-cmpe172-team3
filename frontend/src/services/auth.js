import { post } from "../utils/request";

/**
 * user login
 * @param {*} user
 *  userName
 *  password
 */
export function loginApi(user) {
  return post("/api/v1/auth/manager_login", user);
}
