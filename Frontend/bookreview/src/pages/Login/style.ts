import { Button } from '@mui/material'
import styled from 'styled-components'
import { colors } from '../../theme/Colors'

export const BoxContent = styled.div`
    width: 40%;
    margin: auto;

    .MuiButton-root{
        color: white;
        background: ${colors.primaryOrange};
        &:hover{
            background: ${colors.secondaryOrange};

        }
    }
    
    .MuiInputLabel-root { 
        color: ${colors.secondaryGray};
        opacity: 90%;            
    }
    .MuiInputLabel-root.Mui-focused{
        color: ${colors.secondaryOrange};
    }

   .MuiOutlinedInput-root {
        & > fieldset { 
            border-color: ${colors.secondaryGray}; 
            opacity: 80%;
        }
    }

    .MuiOutlinedInput-root.Mui-focused {
        & > fieldset{
            border-color: ${colors.secondaryOrange};
        }
    }
    .MuiOutlinedInput-root:hover {
        & > fieldset {
            border-color: "white";
            opacity: 90%
        }
    }

    .MuiCircularProgress-circle{
        height: '20px';
    }
`

export const ButtonLogin = styled(Button)({
    width: '100%',
    height: '40px',
    fontSize: '16px',
    letterSpacing: '-0.39px',
    padding: '12px',
    background: colors.primaryOrange
})

