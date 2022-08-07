import * as React from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../../global/GlobalContext'
import { useForm } from '../../hooks/useForm'
import { Box, Typography, StepIconProps } from '@mui/material'
import FirstStepSignup from '../../components/Signup/FirstStepSignup'
import SecondStepSignup from '../../components/Signup/SecondStepSinup'
import ThirdStepSignup from '../../components/Signup/ThirdStepSignup'
import Logo from '../../assets/logo.jpg'
import { SignupDTO } from '../../interfaces/signup/SignupDTO'
import { signup } from '../../services/requests'
import LockIcon from '@mui/icons-material/Lock'
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import CustomizedSteppers from '../../components/Stepper/CustomizedSteppers'
import { ColorlibStepIconRoot } from '../../components/Stepper/style'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage() {

    const { states, setters } = React.useContext(GlobalContext)
    const { token, loading } = states
    const { setToken, setLoading } = setters
    const [activeStep, setActiveStep] = React.useState(0)
    const [literaryArray, setLiteraryArray] = React.useState<string[]>([])
    const navigate = useNavigate()

    React.useEffect(() => {
        const tokenNow = window.localStorage.getItem('token')
        const tokenN = tokenNow && JSON.parse(tokenNow)
        if (!tokenN?.token && token.token) { window.localStorage.setItem('token', JSON.stringify(token)) }
        (tokenN?.token || token.token) && navigate('/feed')
    }, [token])

    const [fisrtStepForm, onChangeFisrtStepForm] = useForm({
        username: '',
        email: '',
        password: ''
    })

    const [secondStepForm, onChangeSecondStepForm, cleanAll, cleanOne] = useForm({
        state: '',
        country: '',
        firstName: '',
        lastName: '',
        birthDate: new Date(),
        phoneNumber: '',
        role: "reader",
        publicInformations: false,
        literaryGenre: ''
    })

    const notify = (error: string) => toast.error(error)

    // stepper
    const steps = ['Credenciais', 'Informações Gerais', 'Confirmação']

    const handleNext = async (event: any) => {
        event.preventDefault()
        if (activeStep === steps.length - 1) {
            const body: SignupDTO = {
                username: fisrtStepForm.username,
                email: fisrtStepForm.email,
                password: fisrtStepForm.password,
                firstName: secondStepForm.firstName,
                lastName: secondStepForm.lastName,
                phoneNumber: secondStepForm.phoneNumber,
                birthDate: secondStepForm.birthDate,
                country: secondStepForm.country,
                state: secondStepForm.state,
                role: secondStepForm.role,
                literaryGenre: literaryArray,
                publicInformations: secondStepForm.publicInformations
            }

            await signup('user/signup', body, setToken, setLoading, notify)
            setActiveStep(0)
            setLiteraryArray([])

        } else {
            if (literaryArray.length === 0 && activeStep === 1) {
                notify("Você deve adicionar pelo menos um gênero literário.")
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const addLiteraryGenre = () => {
        if(secondStepForm.literaryGenre){
            setLiteraryArray(prevLiteraryGenre => [...prevLiteraryGenre, secondStepForm.literaryGenre])
            cleanOne('literaryGenre')
        }
    }

    const removeLiteraryGenre = (chipToDelete: string): void | undefined => {
        const array: string[] = [...literaryArray]
        const index = array.findIndex((genre: string) => genre === chipToDelete)
        array.splice(index, 1)
        setLiteraryArray(array)
    }

    const ColorlibStepIcon = (props: StepIconProps) => {
        const { active, completed, className } = props

        const icons: { [index: string]: React.ReactElement } = {
            1: <LockIcon />,
            2: <FolderSharedIcon />,
            3: <ThumbUpAltIcon />,
        }

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        )
    }

    const renderForm = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStepSignup
                    form={fisrtStepForm}
                    onChange={onChangeFisrtStepForm}
                    activeStep={activeStep}
                    steps={steps}
                />
            case 2:
                return <SecondStepSignup
                    form={secondStepForm}
                    onChange={onChangeSecondStepForm}
                    handleButtonClick={handleBack}
                    activeStep={activeStep}
                    steps={steps}
                    addLiteraryGenre={addLiteraryGenre}
                    removeLiteraryGenre={removeLiteraryGenre}
                    literaryArray={literaryArray}
                />
            case 3:
                return <ThirdStepSignup
                    fisrtStepForm={fisrtStepForm}
                    secondStepForm={secondStepForm}
                    handleButtonClick={handleBack}
                    activeStep={activeStep}
                    steps={steps}
                    literaryArray={literaryArray}
                    loading={loading}
                />
        }
    }

    return (
        <Box sx={{ maxWidth: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '40px', gap: '20px' }} >
                <Box sx={{ height: '20%' }} component={"img"} src={Logo} alt={'livro aberto'} />
                <Typography variant='h3'>BookMedia</Typography>
                <Typography>Um universo de possibilidades bem aqui</Typography>
            </Box>
            <Box sx={{ width: '40%' }}>
                <CustomizedSteppers
                    activeStep={activeStep}
                    steps={steps}
                    ColorlibStepIcon={ColorlibStepIcon}
                />
                <React.Fragment>
                    <Box component={"form"} onSubmit={handleNext} sx={{ width: '100%', mt: 2 }}>
                        {renderForm(activeStep + 1)}
                    </Box>
                </React.Fragment>
            </Box>
            <ToastContainer
                autoClose={4000}
                position={"top-center"}
                hideProgressBar={true}
            />
        </Box>
    )
}