import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { SecondStepSignupProps } from "../../interfaces/signup/SecondStepSignupProps"

const SecondStepSignup = (props: SecondStepSignupProps) => {

    const { handleButtonClick, form, onChange, activeStep, steps, addLiteraryGenre, removeLiteraryGenre, literaryArray } = props

    const handleDelete = (chipToDelete: string) => () => {
        removeLiteraryGenre(chipToDelete)
    };
    const renderGenre = literaryArray.map((genre: string, index: number) => {
        return (
            <Chip
                label={genre}
                onDelete={handleDelete(genre)}
            />
        )
    })
    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    required
                    id="firstName"
                    label="Nome"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    value={form.firstName}
                    onChange={onChange}
                />

                <TextField
                    variant="outlined"
                    fullWidth
                    required
                    id="lastName"
                    label="Sobrenome"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                    value={form.lastName}
                    onChange={onChange}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="state"
                    label="Estado"
                    name="state"
                    autoComplete="state"
                    autoFocus
                    value={form.state}
                    onChange={onChange}
                />

                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="country"
                    label="País"
                    name="country"
                    autoComplete="country"
                    autoFocus
                    value={form.country}
                    onChange={onChange}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <TextField
                    required
                    fullWidth
                    type="date"
                    id="birthDate"
                    label="Data de Nascimento"
                    name="birthDate"
                    autoComplete="birthDate"
                    autoFocus
                    value={form.birthDate}
                    onChange={onChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="tel"
                    id="phoneNumber"
                    label="Celular"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    autoFocus
                    value={form.phoneNumber}
                    onChange={onChange}
                />
            </Box>
        
            <FormControlLabel
                control={
                    <Checkbox
                        checked={form.publicInformations}
                        onChange={onChange}
                        name="publicInformations"
                    />
                }
                label="Informações pessoais públicas"
            />

            <FormControl>
                <FormLabel>Qual o seu perfil?</FormLabel>
                <RadioGroup
                    row
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={onChange}
                    defaultValue={"leitor"}
                >
                    <FormControlLabel value="leitor" control={<Radio />} label="Leitor" />
                    <FormControlLabel value="escritor" control={<Radio />} label="Escritor" />
                    <FormControlLabel value="leitor e escritor" control={<Radio />} label="Ambos" /> 
                </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="literaryGenre"
                    label="Gêneros Literários"
                    name="literaryGenre"
                    autoComplete="literaryGenre"
                    autoFocus
                    value={form.literaryGenre}
                    onChange={onChange}
                />
                <Button
                    onClick={addLiteraryGenre}
                    disabled={literaryArray.length > 4}
                >
                    Adicionar
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {renderGenre}
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

export default SecondStepSignup