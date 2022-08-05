import { Button, Chip, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FirstStepProps } from "../../interfaces/feed/FirstStepProps";

const FirstStep = (props: FirstStepProps) => {

    const { form, onChange, activeStep, steps, addBookGenre, removeBookGenre, bookArray } = props

    const handleDelete = (chipToDelete: string) => () => {
        removeBookGenre(chipToDelete)
    };

    const renderGenre = bookArray.map((genre: string, index: number) => {
        return (
            <Chip
                label={genre}
                onDelete={handleDelete(genre)}
            />
        )
    })

    return (
        <>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Título"
                name="title"
                type="text"
                autoComplete="title"
                autoFocus
                value={form.title}
                onChange={onChange}
            />

            <TextField
                variant="outlined"
                required
                fullWidth
                id="author"
                label="Autor"
                type="author"
                name="author"
                autoComplete="author"
                autoFocus
                value={form.author}
                onChange={onChange}
            />

            <Box sx={{ display: 'flex', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="bookGenre"
                    label="Gêneros Literários"
                    name="bookGenre"
                    autoComplete="bookGenre"
                    autoFocus
                    value={form.bookGenre}
                    onChange={onChange}
                />
                <Button
                    onClick={addBookGenre}
                    disabled={bookArray.length > 4}
                >
                    Adicionar
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {renderGenre}
            </Box>

            <TextField
                variant="outlined"
                multiline
                maxRows={4}
                minRows={4}
                required
                fullWidth
                id="synopsis"
                label="Sinopse"
                name="synopsis"
                autoComplete="synopsis"
                autoFocus
                value={form.synopsis}
                onChange={onChange}
            />


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    sx={{ mr: 1 }}
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

export default FirstStep