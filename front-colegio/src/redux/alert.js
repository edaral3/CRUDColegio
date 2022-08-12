import { v4 as uuid } from "uuid";

const SET_ALERT = "SET_ALERT";
const DELETE_ALERT = "DELETE_ALERT";

export default function alertasReducer(state = [], action) {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case DELETE_ALERT:
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
}

export const setAlert = (item) => (dispatch) => {
    item.id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: item,
    });
    setTimeout(
        () =>
            dispatch(
                dispatch({
                    type: DELETE_ALERT,
                    payload: item.id,
                })
            ),
        2000
    );
};

export const deleteAlert = (id) => (dispatch) => {
    dispatch({
        type: DELETE_ALERT,
        payload: id,
    });
};
