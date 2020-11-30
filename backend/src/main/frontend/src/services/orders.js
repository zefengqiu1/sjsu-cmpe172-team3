import {get, post, put, del} from "../utils/request";

/**
 * get orders list
 * @param {*} page
 */
export function orderApi(page = 1){
    return get ("api/v1/admin/orders", {page, per: 6});
}

export function getNum(data)
{
  return get("/api/v1/admin/orderNum", data);
}
/**
 * create data
 * @param {*} data
 */
export function createApi(data) {
  return post("/api/v1/admin/orders", data);
}

/**
 * get data by id
 * @param {*} id
 */
export function getOneById(id) {
  return get(`/api/v1/admin/orders/${id}`);
}

/**
 * update data
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id, data) {
  return put(`/api/v1/admin/orders/${id}`, data);
}

/**
 * delete data
 * @param {*} id
 * @param {*} data
 */
export function delOne(id, data) {
  return del(`/api/v1/admin/orders/${id}`);
}
