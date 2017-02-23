export default function toasts(state = [], action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.toast];
    case 'CLEAR_TOAST':
      if (action.index) {
        return state.filter((item, index) => index !== action.index);
      }
      return state.slice(1);
    default:
      return state;
  }
}
