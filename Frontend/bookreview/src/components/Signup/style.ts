import styled from "styled-components";
import { colors } from "../../theme/Colors";


export const Container = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    gap: 10px;
    margin-bottom: 20px;

   .MuiButton-root{
      color: white;
      background: ${colors.primaryOrange};
      padding: 5 15px;

      &:hover{
          background: ${colors.secondaryOrange};
      }
      &:disabled{
        background-color: ${colors.primaryGray};
        color: ${colors.secondaryGray}
      }
    }

    .MuiCircularProgress-circle{
        height: '20px';
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
    
    .MuiButtonBase-root.MuiChip-root{
        background-color: transparent;
        border: 1px solid ${colors.secondaryGray};
        color: ${colors.primaryOrange};
    }

`