import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ColorlibConnector } from './style';
import { CustomizedStepper } from '../../interfaces/CustomizedStepper';

export default function CustomizedSteppers(props: CustomizedStepper) {
    const { activeStep, steps, ColorlibStepIcon } = props
    return (
        <Stack sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
