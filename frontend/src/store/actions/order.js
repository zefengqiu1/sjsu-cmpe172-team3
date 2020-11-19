import { orderApi } from "../../services/orders";

export const loadOrder = payload => async dispatch => {
  console.log(payload);
  const res = await orderApi(payload.page);
  // dispatch trigger reducer to change data
  dispatch({
    type: "ORDER_LOADED",
    payload: { ...res, page: payload.page }
  });
};
