import axiosInstance from "../../lib/api";

export const fetchUserCart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(`/cart`, {
        params: {
          userId: getState().user.id,
          _expand: "product",
        },
      });

      dispatch({
        type: "GET_USER_CART",
        payload: res.data.result,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
