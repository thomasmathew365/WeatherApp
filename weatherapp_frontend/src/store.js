const redux = require('redux')
const reactRedux = require('react-redux')

const GET_ALL_CURRENCIES = 'get_all_currencies'
const initialState = {
  listData: []
}
const rootReducer = (state=initialState , action) => { // if(!state){state = initialState} / state = state||initialState
  switch(action.type) {
    case GET_ALL_CURRENCIES:
      return reduceCurrencyDownload(state, action)
    default:
      return state
  }
}

const reduceCurrencyDownload = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {listData: action.value})
  return newState;
}

const store = redux.createStore(rootReducer)

// const mapStateToProps = (state) => ({listDate: state.listDate})
const mapStateToProps = (state) => {
  return {
    listData: state.listData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setListData (listData) {
      dispatch({type: GET_ALL_CURRENCIES, value: listData})
    }
  }
}

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

export {connector}
export {store}
