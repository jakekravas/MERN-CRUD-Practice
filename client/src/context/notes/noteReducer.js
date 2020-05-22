export default (state, action) => {
  switch(action.type){
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload
      }
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map(
          note => note._id === action.payload._id ? action.payload : note
        )
      }
    case "NOTE_ERROR":
      return {
        ...state,
        notes: null,
        error: action.payload
      }
    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload
      }
    case "CLEAR_CURRENT":
      return {
        ...state,
        current: null
      }
    default:
      return state;
  }
}