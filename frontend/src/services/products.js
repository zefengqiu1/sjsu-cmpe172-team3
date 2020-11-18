import { get, post, put, del } from "../utils/request";

/**
 * get product list
 * @param {*} page
 */
export function listApi(page = 1) {
  return get("/api/v1/admin/products", { page, per: 2 });
}

export function getNum(data)
{
  return get("/api/v1/admin/productnum", data);
}
/**
 * create data
 * @param {*} data
 */
export function createApi(data) {
  return post("/api/v1/admin/products", data);
}

/**
 * get data by id
 * @param {*} id
 */
export function getOneById(id) {
  return get(`/api/v1/admin/products/${id}`);
}

/**
 * update data
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id, data) {
  return put(`/api/v1/admin/products/${id}`, data);
}

/**
 * delete data
 * @param {*} id
 * @param {*} data
 */
export function delOne(id, data) {
  return del(`/api/v1/admin/products/${id}`);
}
