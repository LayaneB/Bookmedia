import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { ThirdStepSignupProps } from "../../interfaces/signup/ThirdStepSignupProps"


const ThirdStepSignup = (props: ThirdStepSignupProps) => {
    const { fisrtStepForm, secondStepForm, literaryArray, activeStep, steps, handleButtonClick, loading } = props

    const formatDate =  moment(secondStepForm.birthDate).format('DD/MM/YYYY')
    const styleBox = { display: 'flex', justifyContent: 'space-between' }
    const styleTypography = { fontWeight: 700 }

    return (
        <>
            <Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Nick:</Typography>{fisrtStepForm.username}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>E-mail: </Typography>{fisrtStepForm.email}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Senha:</Typography>{fisrtStepForm.password}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Nome:</Typography>{secondStepForm.name}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Sobrenome:</Typography>{secondStepForm.lastName}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Data de Nascimento:</Typography>{formatDate}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Celular:</Typography>{secondStepForm.phoneNumber}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Estado:</Typography>{secondStepForm.state}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>País:</Typography>{secondStepForm.country}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Manter Informações públicas:</Typography>{secondStepForm.publicLocation ? "sim" : "não"}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Perfil:</Typography>{secondStepForm.role}</Box>
                <Box sx={styleBox}> <Typography sx={styleTypography}>Gêneros Literários:</Typography>{literaryArray.join(', ')}</Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    sx={{ mr: 1 }}
                    onClick={handleButtonClick}
                >
                    Voltar
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    type='submit'
                >
                    {loading ? <CircularProgress color="inherit" size={'25px'} /> : (activeStep === steps.length - 1) ? 'Finalizar' : 'Próximo'}
                </Button>
            </Box>
        </>
    )
}

export default ThirdStepSignup