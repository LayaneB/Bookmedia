export type SecondStepSignupProps = {
    // children: React.ReactNode; 
    handleButtonClick: (event: any) => void,
    form: {
        name:string,
        lastName: string,
        birthDate: Date,
        phoneNumber: string,
        state: string,
        country: string,
        role: "reader" | "writer" | "both",
        publicLocation: boolean,
        literaryGenre: string
    },
    onChange: () => void,
    activeStep: number,
    steps: { label: string; }[]
    addLiteraryGenre: () => void
    removeLiteraryGenre: (item: string) => void | undefined
    literaryArray: string[]
}