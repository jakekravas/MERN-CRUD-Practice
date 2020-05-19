export default (state, action) => {
  switch(action.type){
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload
      }
    case "NOTES_ERROR":
      return {
        ...state,
        notes: null,
        error: action.payload
      }
    default:
      return state;
  }
}