export interface SecondStepProps{
    handleButtonClick: (event: any) => void,
    form: {
        userFeedback: string,
        userRate: number,
    },
    onChange: () => void,
    activeStep : number,
    steps: string[]
}