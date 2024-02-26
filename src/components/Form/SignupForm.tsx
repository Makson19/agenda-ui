import { Box, Button, Card, CardContent, Grid, Icon, Typography } from '@mui/material'
import { Field, Form } from 'react-final-form'
import Input from '../Input/Input'

interface IValues {
  name: string
  birthday?: Date
  phone?: string
  email: string
  password: string
  confirm_password: string
}


const SignupForm = () => {

  const validate = (values: IValues) => {
    const errors: any = {}
    if (!values?.name) {
      errors.name = 'Campo obrigatório'
    }

    if (!values?.email) {
      errors.email = 'Campo obrigatório'
    }

    if (values?.email && (!values.email?.includes('@') || !values.email?.includes('') || !values.email?.endsWith('.com'))) {
      errors.email = 'E-mail inválido.'
    }

    if (!values?.password) {
      errors.password = 'Campo obrigatório'
    }

    if (values?.password.length < 6) {
      errors.password = 'A senha deve ter no mínimo 6 caracteres.'
    }

    if (!values?.confirm_password) {
      errors.confirm_password = 'Campo obrigatório'
    }

    if (values?.password !== values?.confirm_password) {
      errors.confirm_password = 'As senhas devem ser iguais.'
    }

    return errors
  }

  const onSumitForm = (values: IValues) => {
    console.log('values', values) // eslint-disable-line
  }

  return (
    <Card sx={{ maxWidth: '650px', width: '100%' }}>
      <CardContent>
        <Box sx={{ padding: '16px' }}>
          <Box alignItems='center' display='flex' gap='8px' justifyContent='center' marginBottom='32px'>
            <Icon sx={{ fontSize: 40 }}>contacts</Icon>
            <Typography variant='h6'>Agenda.App</Typography>
          </Box>

          <Box>
            <Form
              onSubmit={onSumitForm}
              validate={validate}
              render={({ handleSubmit, values }) => {
                console.log('values', values)
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={12}>
                        <Field
                          name='name'
                          label='Nome Completo'
                          type='text'
                          component={Input}
                          placeholder='Digite seu nome...'
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Field
                          name='birthday'
                          label='Data de nascimento'
                          type='date'
                          component={Input}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Field
                          name='phone'
                          label='Telefone'
                          type='tel'
                          component={Input}
                          maxLength={15}
                          placeholder='(00) 00000-0000'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          name='email'
                          label='E-mail'
                          type='email'
                          component={Input}
                          placeholder='Digite seu e-mail...'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          name='password'
                          label='Senha'
                          type='password'
                          component={Input}
                          placeholder='Senha...'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          name='confirm_password'
                          label='Confirme sua senha'
                          type='password'
                          component={Input}
                          placeholder='Confirme sua senha...'
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ marginTop: '16px' }}>
                        <Button
                          type='submit'
                          variant='contained'
                          sx={{ fontSize: '18px', width: '100%' }}
                        >
                          Cadastrar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SignupForm