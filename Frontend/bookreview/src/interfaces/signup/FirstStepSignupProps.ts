export type FirstStepSignupProps = {
    form: {
        username: string
        email: string
        password: string
        confirmPassword: string
    }
    onChange: () => void
    activeStep : number
    steps: string[]
}