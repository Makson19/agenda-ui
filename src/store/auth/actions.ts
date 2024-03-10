import { createAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import { withPayloadType } from '../../utils/functions'

interface ISignInRequestParams {
  login: string
  password: string
  navigateTo?: NavigateFunction
}

interface ISignInSuccessfulParams {
  token: string,
  id: string
  name: string
  email: string
  birthday: string
}

interface ISignUpRequestParams {
  name: string
  email: string
  password: string
  birthday?: string
  phone?: string
}

export const signInResquest = createAction('auth/SIGNIN_USER_REQUEST', withPayloadType<ISignInRequestParams>())
export const signInSuccess = createAction('auth/SIGNIN_USER_SUCCESS', withPayloadType<ISignInSuccessfulParams>())
export const signInFailure = createAction<string | undefined>('auth/SIGNIN_USER_FAILURE')

export const signOutRequest = createAction('auth/SIGNOUT_USER_REQUEST')
export const signOutSuccess = createAction('auth/SIGNOUT_USER_SUCCESS')
export const signOutFailure = createAction('auth/SIGNOUT_USER_FAILURE')

export const signUpRequest = createAction('auth/SIGNUP_USER_REQUEST', withPayloadType<ISignUpRequestParams>())
export const signUpSuccess = createAction('auth/SIGNUP_USER_SUCCESS')
export const signUpFailure = createAction<string | undefined>('auth/SIGNUP_USER_FAILURE')
