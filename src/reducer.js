export const initialState = {
  user: "Eliott",
};

// we define actions in import { connect } from 'react-redux'

export const actionTypes = {
  SET_USER: "SET_USER",
};

// redux is addressing a data layer  which makes data accessiable through out
// the entireity of an app

// state is what the data layer looks like
// actions - what action we want to take on the data
const reducer = (state, action) => {
  console.log(action);

  // whenever an event is dispatched to the data layer,
  // it will have a type and a payload (in this case user)
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
