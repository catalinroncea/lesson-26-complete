import {all, call, put, takeEvery} from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {convertCollectionsSnapshotToMap, firestore} from '../../firebase/firebase.utils';
import {fetchCollectionsFailure, fetchCollectionsSuccess} from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}
