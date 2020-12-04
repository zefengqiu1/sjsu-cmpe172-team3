import { listApi } from "../../services/products";

export const loadProduct = payload => async dispatch => {
  console.log(payload);
  const res = await listApi(payload.page);
  // dispatch trigger reducer to change data
  dispatch({
    type: "PRODUCT_LOADED",
    payload: { ...res, page: payload.page }
  });
};
