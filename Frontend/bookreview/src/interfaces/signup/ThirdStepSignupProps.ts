export type ThirdStepSignupProps = {
    // children: React.ReactNode; 
    handleButtonClick: (event: any) => void,
    fisrtStepForm: {
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    },
    secondStepForm: {
        firstName:string,
        lastName: string,
        birthDate: Date,
        phoneNumber: string,
        state: string,
        country: string,
        role: "reader" | "writer" | "both",
        publicLocation: boolean,
        literaryGenre: string
    },
    activeStep: number,
    steps: string[]
    literaryArray: string[]
    loading: boolean
}