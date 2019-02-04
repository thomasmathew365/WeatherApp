const data = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATA':
      return [
        ...state,
        {
          data: action.value
        }
      ]
    default:
      return state
  }
}
​
export default data
