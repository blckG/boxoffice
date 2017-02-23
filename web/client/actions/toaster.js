export function toast(message, type = 'notice', delay = 5000) {
  return dispatch => {
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        type,
        message
      }
    });

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_TOAST'
      });
    }, delay);
  };
}

export function clearToast(index) {
  return dispatch => {
    dispatch({
      type: 'CLEAR_TOAST',
      index
    });
  };
}
