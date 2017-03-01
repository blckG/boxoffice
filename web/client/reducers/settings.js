export default function settings(state = {}, action) {
  switch (action.type) {
    case 'SETTINGS':
      return action.settings;
    default:
      return state;
  }
}
