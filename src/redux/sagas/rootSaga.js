import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getBooks, setBooks } from '../booksSlice';

// function uses axios to fetch data from our api
let callAPI = async ({ url, method, data }) => {
    return await axios.request({
      url,
      method,
      data,
    })
}

function* fetchBooks(action) {
    try {
        const books = yield call(()=>
					callAPI(
						{
							url: 'https://gist.githubusercontent.com/nanotaboada/6396437/raw/855dd84436be2c86e192abae2ac605743fc3a127/books.json',
							method: 'get'
						}
					)
        )
        yield put(setBooks([...books.data.books]));
    } catch (e) {
      yield put(setBooks([]));
			console.log(e);
    }
}

function* watcherSaga() {
    yield takeLatest(getBooks, fetchBooks);
}

export default watcherSaga;