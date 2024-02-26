import { Box } from '@mui/system'
import { Alert, Button, Card, CardContent, CircularProgress, Icon, Snackbar, Typography, useTheme } from '@mui/material'
import { Field, Form } from 'react-final-form'
import createDecorator from 'final-form-focus'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input/Input'
import { signInResquest } from '../../store/auth/actions'
import { RootState } from '../../store'
import { Link as LinkRouter } from 'react-router-dom'

interface IValues {
  login: string
  password: string
}

const focusOnErrors = createDecorator()

const LoginForm = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isLoading, isError, messageError } = useSelector((state: RootState) => state.auth)

  const onSubmitForm = (values: IValues) => {
    dispatch(signInResquest(values))
  }

  const validate = (values: IValues) => {
    const errors: any = {}

    if (!values?.login) {
      errors.login = 'Campo obrigatório'
    }

    if (values?.login && (!values.login?.includes('@') || !values.login?.includes('') || !values.login?.endsWith('.com'))) {
      errors.email = 'E-mail inválido.'
    }

    if (!values?.password) {
      errors.password = 'Campo obrigatório'
    }

    return errors
  }

  return (
    <Card sx={{ maxWidth: '650px', width: '100%' }}>
      <CardContent>
        <Box
          sx={{
            background: theme.palette.background.paper,
            padding: '24px',
            width: '100%'
          }}
        >
          <Box alignItems='center' display='flex' gap='8px' justifyContent='center' marginBottom='32px'>
            <Icon sx={{ fontSize: 40 }}>contacts</Icon>
            <Typography variant='h6'>Agenda.App</Typography>
          </Box>
          <Form
            onSubmit={onSubmitForm}
            decorators={[focusOnErrors as any]}
            validate={validate}
            render={({ handleSubmit, values }) => {
              console.log('values', values)
              return (
                <Box>
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}
                    >
                      <Box>
                        <Field
                          name='login'
                          type='email'
                          label='E-mail'
                          component={Input}
                          placeholder='email@exemplo.com'
                        />
                      </Box>

                      <Box>
                        <Field
                          name='password'
                          type='password'
                          label='Senha'
                          component={Input}
                          placeholder='**********'
                        />
                      </Box>

                      <Box sx={{ marginTop: '16px' }}>
                        <Button
                          type='submit'
                          variant='contained'
                          sx={{
                            fontSize: '18px',
                            width: '100%',
                          }}
                          disabled={isLoading}
                          startIcon={
                            isLoading && (
                              <CircularProgress
                                size={20}
                                variant='indeterminate'
                                color='inherit'
                              />
                            )
                          }
                        >
                          Entrar
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              )
            }}
          />
          <Box sx={{ marginTop: '12px', textAlign: 'center' }}>
            <Typography sx={{ marginBottom: '4px' }}>Ainda não é cadastrado?</Typography>
            <Button
              component={LinkRouter}
              to='/cadastrar'
              variant='outlined'
            >
              Cadastre-se
            </Button>
          </Box>
          <Snackbar open={isError} autoHideDuration={200}>
            <Alert
              severity='error'
              variant='filled'
              sx={{ width: '100%' }}
            >
              {messageError}
            </Alert>
          </Snackbar>
        </Box>
      </CardContent>
    </Card>

  )
}

export default LoginForm