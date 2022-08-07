import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { FirstStepSignupProps } from '../../interfaces/signup/FirstStepSignupProps'
import { Container } from './style'

const FirstStepSignup = (props: FirstStepSignupProps) => {

    const { form, onChange, activeStep, steps } = props

    return (
        <Container>
            <TextField
                variant="outlined"
                size="small"
                required
                fullWidth
                id="username"
                label="Nick"
                name="username"
                type="text"
                autoComplete="username"
                autoFocus
                value={form.username}
                onChange={onChange}
            />

            <TextField
                variant="outlined"
                size="small"
                required
                fullWidth
                id="email"
                label="E-mail"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={onChange}
                inputProps={{
                    pattern: "[a-zA-Z0-9._%+-#&]+@[a-z0-9.-]+.[a-z]{2,}$",
                    title: "formato de e-mail inválido: nome@email.com"
                }}
            />

            <TextField
                variant="outlined"
                size="small"
                required
                fullWidth
                id="password"
                label="Senha"
                type="password"
                name="password"
                autoComplete="password"
                autoFocus
                value={form.password}
                onChange={onChange}
                inputProps={{
                    pattern: "^[a-zA-Z0-9\u00C0-\u00FF\\.#@$%*& ]{8,}$",
                    title: "A senha deve ter no mínimo 8 caracteres."
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    sx={{ mr: 1 }}
                >
                    Voltar
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    type='submit'
                >
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
            </Box>
        </Container>
    )
}

export default FirstStepSignup