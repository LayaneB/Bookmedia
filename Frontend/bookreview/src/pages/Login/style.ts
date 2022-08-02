import { Button } from "@mui/material"
import styled from "styled-components"
import { colors } from "../../theme/Colors";


export const BoxContent = styled.div`
    width: 80%;

    .MuiButton-root{
        color: white;
        background: ${colors.primaryOrange};
        &:hover{
            background: ${colors.secondaryOrange};

        }
    }

    .MuiButton-root .MuiButton-text{
        color: 'white';
    }

    .MuiCircularProgress-circle{
        height: '20px';
    }

    @media screen and (min-device-width : 1025px){
        width: 40%;
        margin: auto;
    }
`

export const ButtonLogin = styled(Button)({
    width: '100%',
    height: '40px',
    fontSize: '16px',
    letterSpacing: '-0.39px',
    padding: '12px',
    background: colors.primaryOrange
});

