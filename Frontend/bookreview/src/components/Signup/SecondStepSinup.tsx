import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { SecondStepSignupProps } from "../../interfaces/signup/SecondStepSignupProps"
import { colors } from "../../theme/Colors"
import { Container } from "./style"

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
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    size="small"
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
                    size="small"
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
                    size="small"
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
                    size="small"
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
                    size="small"
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
                    size="small"
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
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]{11}', title: 'Insira os 11 digitos incluindo o DDD' }}

                />
            </Box>

            <FormControlLabel
                control={
                    <Checkbox
                        size="small"
                        checked={form.publicInformations}
                        onChange={onChange}
                        name="publicInformations"
                        sx={{
                            '&.Mui-checked': {
                                color: colors.secondaryOrange,
                            }
                        }}
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
                    <FormControlLabel
                        value="leitor"
                        control={
                            <Radio
                                size="small"
                                sx={{
                                    '&.Mui-checked': {
                                        color: colors.secondaryOrange,
                                    }
                                }} />
                        }
                        label="Leitor" />
                    <FormControlLabel
                        value="escritor"
                        control={
                            <Radio
                                size="small"
                                sx={{
                                    '&.Mui-checked': {
                                        color: colors.secondaryOrange,
                                    }
                                }} />
                        }
                        label="Escritor" />
                    <FormControlLabel
                        value="leitor e escritor"
                        control={
                            <Radio
                                size="small"
                                sx={{
                                    '&.Mui-checked': {
                                        color: colors.secondaryOrange,
                                    }
                                }} />
                        }
                        label="Ambos" />
                </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    size="small"
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
        </Container>
    )
}

export default SecondStepSignup