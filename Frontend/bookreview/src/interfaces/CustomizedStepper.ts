import { StepIconProps } from "@mui/material";

export interface CustomizedStepper {
    activeStep: number,
    steps: string[],
    ColorlibStepIcon: (props: StepIconProps) => JSX.Element
}