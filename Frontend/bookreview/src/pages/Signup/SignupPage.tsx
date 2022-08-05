import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FirstStepSignup from '../../components/Signup/FirstStepSignup'
import SecondStepSignup from '../../components/Signup/SecondStepSinup'
import { useForm } from '../../hooks/useForm'
import Logo from '../../assets/logo.jpg'
import ThirdStepSignup from '../../components/Signup/ThirdStepSignup'
import { SignupDTO } from '../../interfaces/signup/SignupDTO'
import { GlobalContext } from '../../global/GlobalContext'
import { signup } from '../../services/requests'
import { useNavigate } from 'react-router'


export default function SignupPage() {

    const { states, setters } = React.useContext(GlobalContext)
    const { token, loading } = states
    const { setToken, setLoading } = setters

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = React.useState(0)
    const [literaryArray, setLiteraryArray] = React.useState<string[]>([])

    React.useEffect(() => {
        const tokenNow = window.sessionStorage.getItem('token')
        const tokenN = tokenNow && JSON.parse(tokenNow)
        if(!tokenN?.token && token.token){window.sessionStorage.setItem('token', JSON.stringify(token))}
        (tokenN?.token || token.token) && navigate('/feed')
      }, [token])

    const [fisrtStepForm, onChangeFisrtStepForm] = useForm({
        username: '',
        email: '',
        password: ''
    })

    const [secondStepForm, onChangeSecondStepForm] = useForm({
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

    const handleNext = async (event: any) => {
        event.preventDefault();
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

            await signup('user/signup', body, setToken, setLoading)
            setActiveStep(0)
            setLiteraryArray([])
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const addLiteraryGenre = () => {
        setLiteraryArray(prevLiteraryGenre => [...prevLiteraryGenre, secondStepForm.literaryGenre])
    }

    const removeLiteraryGenre = (chipToDelete: string): void | undefined => {
        const array: string[] = [...literaryArray]
        const index = array.findIndex((genre: string) => genre === chipToDelete)
        array.splice(index, 1)
        setLiteraryArray(array)
    }

    const steps = [
        { label: 'Credenciais' },
        { label: 'Informações gerais' },
        { label: 'Confirmação' }
    ]

    const handleReset = () => {
        setActiveStep(0);
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

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '40px' }} >
                <Box sx={{ height: '20%' }} component={"img"} src={Logo} alt={'livro aberto'} />
                <Typography variant='h3'>BookMedia</Typography>
                <Typography>Um universo de possibilidades bem aqui</Typography>
            </Box>
            <Box sx={{ width: '50%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        return (
                            <Step key={step.label} {...stepProps}>
                                <StepLabel {...labelProps}>{step.label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box component={"form"} onSubmit={handleNext} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', width: '100%', mt: 2 }}>
                            {renderForm(activeStep + 1)}
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Box>
    );
}