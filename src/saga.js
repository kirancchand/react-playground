import { put, takeEvery, all, call, takeLeading} from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const API_URL="https://restcountries.eu/rest/v2/all";
export function* helloSaga()
{
  console.log("helloSaga");
}

///watcher function
function* getDataSaga() //watchIncrementAsync
{
  yield takeLeading('GET_DATA',getData)
}
//worker function
function* getData()
{
  const response = yield fetch(API_URL);
  const data = yield response.json();
  console.log(data);
  debugger;
  yield put({type:'SET_DATA',data:data})
}

function* fetchAPI()
{
   // const response = yield call(fetch, API_URL);
  const response = yield fetch(API_URL);
  return yield response.json();
}

export default function* rootSaga() {
  yield all([
    //watchIncrementAsync
    getDataSaga()
  ])
}