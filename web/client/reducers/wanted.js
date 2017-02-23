export default function wanted(state = [], action) {
  switch (action.type) {
    case 'WANTED':
      return action.wanted;
    default:
      return state;
  }
}
