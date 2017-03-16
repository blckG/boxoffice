export function getWanted() {
  return dispatch => {
    fetch('/api/wanted')
      .then(res => res.json())
      .then(json => {
        dispatch(wanted(json));
      });
  };
}

export function removeWanted(imdbId, removeData) {
  return dispatch => {
    fetch('/api/wanted/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({imdbId, removeData})
    })
    .then(res => res.json())
    .then(json => {
      dispatch(getWanted());
    });
  };
}


export function wanted(wanted) {
  return {
    type: 'WANTED',
    wanted
  };
}
