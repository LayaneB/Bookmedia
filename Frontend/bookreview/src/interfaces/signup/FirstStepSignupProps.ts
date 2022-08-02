export type FirstStepSignupProps = {
    // children: React.ReactNode; 
    form: {
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    },
    onChange: () => void
    activeStep : number,
    steps: { label: string; }[]
}