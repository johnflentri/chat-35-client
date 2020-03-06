function reducer(state = [], action) {
  // console.log('action test:', action)
  switch (action.type) {
    case "ALL_MESSAGES":
      // console.log('payload test:', action.payload)
      return action.payload
    default:
      return state
  }
}

export default reducer