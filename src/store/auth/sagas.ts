import { all, call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, isAxiosError } from 'axios'
import {
  signInResquest,
  signInSuccess,
  signInFailure,
  signOutRequest,
  signOutSuccess,
  signOutFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} from './actions'
import { signIn, signUp } from './services'
import { persistor } from '../index'

interface ISignInUserPayload {
  payload: {
    login: string
    password: string
  }
}

interface ISignUpUserPayload {
  payload: {
    name: string,
    email: string,
    password: string,
    birthday: string,
    phone?: string
  }
}

function* signInUser({ payload }: ISignInUserPayload) {
  try {
    const { login, password } = payload
    const params = {
      email: login,
      password
    }

    const response: AxiosResponse = yield call(signIn, { ...params })

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

function* signUpUser({ payload }: ISignUpUserPayload) {
  console.log('payload', payload)
  try {
    const response: AxiosResponse = yield call(signUp, { ...payload })
    console.log('response', response)

    if (response.status === 201 || response.status === 200) {
      yield put(signUpSuccess())
      try {
        const params = {
          email: payload.email,
          password: payload.password
        }

        const response: AxiosResponse = yield call(signIn, { ...params })

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

  } catch (error) {
    if (isAxiosError(error)) {
      yield put(signUpFailure(error.response?.data?.error))
    }
  }
}

function* watchSign() {
  yield takeLatest(signInResquest, signInUser)
}

function* watchSignOut() {
  yield takeLatest(signOutRequest, signOutUser)
}

function* watchSignUp() {
  yield takeLatest(signUpRequest as any, signUpUser)
}

export default function* authSagas() {
  yield all([
    watchSign(),
    watchSignOut(),
    watchSignUp(),
  ])
}

