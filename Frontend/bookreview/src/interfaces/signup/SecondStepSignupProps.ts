export type SecondStepSignupProps = {
    handleButtonClick: (event: any) => void
    form: {
        name:string
        firstName: string
        lastName: string
        birthDate: Date
        phoneNumber: string
        state: string
        country: string
        role: "reader" | "writer" | "both"
        publicInformations: boolean
        literaryGenre: string
    }
    onChange: () => void
    activeStep: number
    steps: string[]
    addLiteraryGenre: () => void
    removeLiteraryGenre: (item: string) => void | undefined
    literaryArray: string[]
}