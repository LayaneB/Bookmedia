import styled from 'styled-components'
import { colors } from '../../theme/Colors'

export const BoxContainer = styled.div`
    background: ${colors.primaryGray};
    width: 50%;
    border-radius: 5px;
    padding: 0% 2% 2% 2%;
    color: #282626;

    .MuiChip-root{
        background-color: ${colors.primaryOrange};
        color: whitesmoke;
    }
`