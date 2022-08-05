import { Button, Rating, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { SecondStepProps } from "../../interfaces/feed/SecondStepProps"

const SecondStep = (props: SecondStepProps) => {

    const { handleButtonClick, form, onChange, activeStep, steps, } = props


    return (
        <>

            <Box sx={{ display: 'flex', flexDirection:'column', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    multiline
                    maxRows={4}
                    minRows={4}
                    required
                    fullWidth
                    id="userFeedback"
                    label="Feedback"
                    name="userFeedback"
                    autoComplete="userFeedback"
                    autoFocus
                    value={form.userFeedback}
                    onChange={onChange}
                />

                {/* <TextField
                    variant="outlined"
                    fullWidth
                    required
                    id="userRate"
                    label="Nota"
                    name="userRate"
                    autoComplete="userRate"
                    autoFocus
                    type='number'
                    value={form.userRate}
                    onChange={onChange}
                /> */}
                <Rating value={form.userRate} name ="userRate" onChange={onChange} precision={0.5} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    sx={{ mr: 1 }}
                    onClick={handleButtonClick}
                >
                    Voltar
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    type='submit'
                >
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
            </Box>
        </>
    )
}

export default SecondStep