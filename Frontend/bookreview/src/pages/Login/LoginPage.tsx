import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useForm } from '../../hooks/useForm'
import Logo from '../../assets/logo.jpg'
import { CircularProgress, TextField } from '@mui/material'
import { postRequest } from '../../services/requests'
import { BoxContent, ButtonLogin } from './style'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../../global/GlobalContext'


export default function LoginPage() {

  const { states, setters } = React.useContext(GlobalContext)
  const { token, loading } = states
  const { setToken, setLoading } = setters

  const [form, onChange] = useForm({
    email: '',
    password: ''
  })

  const navigate = useNavigate()


  React.useEffect(() => {
    token && window.sessionStorage.setItem('token', token)
    token && navigate('/signup')
  }, [token])

  // React.useEffect(() => {
  //   // token && navigate('/feed')
  // }, [loading])

  const login = (event: any) => {
    event.preventDefault()
    postRequest('user/login', form, setToken, setLoading)
  }

  return (
    <Box sx={{ maxWidth: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '40px', gap: '20px' }} >
        <Box sx={{ height: '20%' }} component={"img"} src={Logo} alt={'livro aberto'} />
        <Box>
          <Typography variant='h3'>BookMedia</Typography>
          <Typography>Um universo de possibilidades bem aqui</Typography>
        </Box>
      </Box>
      <BoxContent>
        <Box component={"form"} onSubmit={login} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', width: '100%' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type='email'
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={onChange}
          />


          <TextField
            variant="outlined"
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            type='password'
            autoComplete="password"
            autoFocus
            value={form.password}
            onChange={onChange}
          />

          <ButtonLogin
            type="submit"
            fullWidth
            sx={{ mb: 1, mt: 1 }}
          >
            {loading ? <CircularProgress color="inherit" size={'25px'} /> : <>Continuar</>}

          </ButtonLogin>

          <hr />

          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/signup')}
          >
            Criar uma conta!
          </Button>

        </Box>

      </BoxContent>
    </Box>
  );
}




