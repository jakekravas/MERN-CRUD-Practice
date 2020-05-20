export default (state, action) => {
  switch(action.type){
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload
      }
    case "NOTE_ERROR":
      return {
        ...state,
        notes: null,
        error: action.payload
      }
    default:
      return state;
  }
}