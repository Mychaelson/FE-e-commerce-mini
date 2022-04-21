const initial_state = {
  items: [],
};

export const cartReducer = (state = initial_state, action) => {
  if (action.type === "ADD_TO_CART") {
    const newItem = [...state];
    newItem.push(action.payload);

    return {
      ...state,
      items: newItem,
    };
  } else if (action.type === "DELETE_ITEM") {
    const items = [...state];
    items.splice(action.payload);

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
  } else if (action.type === "EMPTY_CART") {
    return init_state;
  }

  return state;
};
