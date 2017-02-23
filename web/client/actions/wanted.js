export function getWanted() {
  return dispatch => {
    fetch('/api/wanted')
      .then(res => res.json())
      .then(wanted => {
        dispatch({
          type: 'WANTED',
          wanted
        });
      });
  };
}
