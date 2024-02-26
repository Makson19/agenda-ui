import { createReducer } from '@reduxjs/toolkit'
import { signInFailure, signInResquest, signInSuccess, signOutRequest } from './actions'
import { AnyAction } from 'redux-saga'

interface IUser {
  id: number
  name: string
  birthday: string
  email: string
  token: string
}

interface IInitialStateType {
  isFetching: boolean
  isLoading: boolean
  isError: boolean
  messageError?: string
  user: IUser | null
  isLogged: boolean
}

const initialState: IInitialStateType = {
  isFetching: false,
  isLoading: false,
  isError: false,
  messageError: undefined,
  user: null,
  isLogged: false
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signInResquest, (state) => ({
      ...state,
      isFetching: true,
      isLoading: true,
      isError: false,
      messageError: undefined,
      isLogged: false
    }))
    .addCase(signInSuccess, (state, action: AnyAction) => ({
      ...state,
      isFetching: false,
      isLoading: false,
      isError: false,
      messageError: undefined,
      isLogged: true,
      user: {
        ...state.user,
        ...action.payload
      }
    }))
    .addCase(signInFailure, (state, action: AnyAction) => ({
      ...state,
      isFetching: false,
      isLoading: false,
      isError: true,
      messageError: action.payload
    }))
    .addCase(signOutRequest, () => ({
      ...initialState
    }))
})

export default authReducer
