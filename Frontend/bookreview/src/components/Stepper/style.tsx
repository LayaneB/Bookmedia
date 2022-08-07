import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import styled from 'styled-components'
import { colors } from '../../theme/Colors'

export const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                `linear-gradient( 95deg,${colors.secondaryOrange} 0%,${colors.primaryOrange} 50%,${colors.primaryGray} 100%)`,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                `linear-gradient( 95deg,${colors.secondaryOrange} 0%,${colors.primaryOrange} 50%,${colors.primaryGray} 100%)`,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: colors.primaryGray,
        borderRadius: 1,
    },
}))

export const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
    backgroundColor: colors.primaryGray,
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            `linear-gradient( 136deg, ${colors.secondaryOrange} 0%, ${colors.primaryOrange} 50%, ${colors.primaryGray} 100%)`,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            `linear-gradient( 136deg, ${colors.secondaryOrange} 0%, ${colors.primaryOrange} 50%,${colors.primaryGray} 100%)`,
    }),
}))
