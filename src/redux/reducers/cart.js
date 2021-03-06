const initial_state = {
  items: [],
};

export const cartReducer = (state = initial_state, action) => {
  if (action.type === "ADD_TO_CART") {
    const newItem = [...state.items];
    newItem.push(action.payload);

    return {
      ...state,
      items: newItem,
    };
  } else if (action.type === "DELETE_ITEM") {
    // console.log(state.items.result);
    const items = [...state.items];
    console.log(action.payload);
    items.splice(action.payload, 1);

    return {
      ...state,
      items,
    };
  } else if (action.type === "EDIT_QTY") {
    const items = [...state.items];
    items[action.payload.idx].quantity = action.payload.quantity;

    return {
      ...state,
      items,
    };
  } else if (action.type === "GET_USER_CART") {
    return {
      ...state,
      items: action.payload,
    };
  } else if (action.type === "EMPTY_CART") {
    return init_state;
  }

  return state;
};
