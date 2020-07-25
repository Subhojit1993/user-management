import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_USER_SUCCESS
} from '../actions/userActions';

const initialState = {
  persons: [],
  loading: false,
  error: null,
  page: 0,
  total_pages: 0,
  updatedUser: {}
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_USERS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something later on as usecase
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
        updatedUser: {}
      };

    case FETCH_USERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the persons with the ones from the server
      let personsArr = state.persons.concat(action.payload.response.data);
      return {
        ...state,
        loading: false,
        persons: personsArr,
        page: action.payload.response.page,
        total_pages: action.payload.response.total_pages,
        updatedUser: {}
      };

    case UPDATE_USER_SUCCESS:
      // update the user
      let updatedUser = action.payload.user;
      let updatedUsers = state.persons.map(person => {
        if(person.id === updatedUser.id)
          return {...updatedUser};
        return person;
      });
      // All done: set loading "false".
      // Also, replace the persons with the updated users
      return {
        ...state,
        loading: false,
        persons: updatedUsers,
        updatedUser: {...action.payload.user}
      };

    case FETCH_USERS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, hence, set `persons` empty.
      return {
        ...state,
        loading: false,
        updatedUser: {},
        error: action.payload.error,
        persons: []
      };

    default:
      // default case in a reducer
      return state;
  }
}