import styled from "styled-components";
import { colors } from "../../theme/Colors"

export const BoxContainer = styled.div`
    height:10vh;
    width:100%; 
    background:${colors.primaryOrange};
    display: flex;
    align-items: center;
    justify-content: right;
    gap:5%;
    padding: 2%;
    a{
        color: ${colors.secondaryGray};
        text-decoration: none;
    }
`