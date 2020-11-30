import { listUserApi } from "../../services/auth";

export const loadUsers = payload => async dispatch => {
  console.log(payload);
  const res = await listUserApi(payload.page);
  // dispatch trigger reducer to change data
  dispatch({
    type: "USER_LOADED",
    payload: { ...res, page: payload.page }
  });
};
