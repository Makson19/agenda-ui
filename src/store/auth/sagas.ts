import { all, call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, isAxiosError } from 'axios'
import {
  signInResquest,
  signInSuccess,
  signInFailure,
  signOutRequest,
  signOutSuccess,
  signOutFailure
} from './actions'
import { signIn } from './services'
import { persistor } from '../index'

interface ISignInUserPayload {
  payload: {
    login: string
    password: string
  }
}

function* signInUser({ payload }: ISignInUserPayload) {
  console.log('payload', payload)
  try {
    const { login, password } = payload
    const params = {
      email: login,
      password
    }
    const response: AxiosResponse = yield call(signIn, { params })
    console.log('response', response)
    if (response.status === 200) {
      yield put(signInSuccess({
        token: response.data.token,
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        birthday: response.data.user.birthday
      }))
      window.location.href = '/'
    }
  } catch (error) {
    if (isAxiosError(error)) {
      yield put(signInFailure(error.response?.data?.error))
    }
  }
}

function* signOutUser() {
  try {
    // yield call(services.signOut)
    yield put({ type: 'app:RESET_STORE' })
    yield put(signOutSuccess())
    window.location.href = '/login'
  } catch (error) {
    yield put({ type: 'app:RESET_STORE' })
    yield put(signOutFailure())
  } finally {
    persistor.pause()
    persistor.flush().then(() => {
      return persistor.purge()
    })
  }
}

function* watchSign() {
  yield takeLatest(signInResquest, signInUser)
}

function* watchSignOut() {
  yield takeLatest(signOutRequest, signOutUser)
}

export default function* authSagas() {
  yield all([
    watchSign(),
    watchSignOut(),
  ])
}

