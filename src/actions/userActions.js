// const bind
export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
// user url set
const userUrl = `https://reqres.in/api/users`;

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = response => ({
  type: FETCH_USERS_SUCCESS,
  payload: { response }
});

export const updateUsersSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user }
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

// fetch action
export function fetchUsers(page) {
  console.log("Page Number", page);
  return dispatch => {
    dispatch(fetchUsersBegin());
    return fetch(`${userUrl + '?page=' + page}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUsersSuccess(json));
        return json;
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error))
      });
  };
}

// put request for update
export function updateUsers(dataAction) {
  let id = dataAction.id;
  return dispatch => {
    dispatch(fetchUsersBegin());
    return fetch(`${userUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAction),
    })
    .then(res => res.json())
    .then(json => {
      dispatch(updateUsersSuccess(json));
    })
    .catch(error => {
      dispatch(fetchUsersFailure(error))
    });
  }
}

// HTTP errors handling since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}