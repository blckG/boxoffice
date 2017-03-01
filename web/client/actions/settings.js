export function getSettings() {
  return dispatch => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch({
            type: 'SETTINGS',
            settings: json.settings
          });
        }
      });
  };
}

export function saveSettings(settings) {
  return dispatch => {
    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        dispatch({
          type: 'SETTINGS',
          settings: json.settings
        });
      }
    });
  };
}
