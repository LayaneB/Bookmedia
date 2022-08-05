import { Box } from "@mui/system"
import React from "react"
import CardFeed from "../../components/CardFeed/CardFeed"
import Header from "../../components/Header/Header"
import { GlobalContext } from "../../global/GlobalContext"
import { useProtectedPage } from "../../hooks/useProtectedPage"
import { BooksDTO } from "../../interfaces/feed/BooksDTO"
import { deleteBookById, getAllBooks, postBook } from "../../services/requests"
import { colors } from "../../theme/Colors"
import AddIcon from '@mui/icons-material/Add'
import { IconButton, Modal, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import FirstStep from "../../components/RegisterBook/FirstStep"
import SecondStep from "../../components/RegisterBook/SecondStep"
import { PostBookDTO } from "../../interfaces/feed/PostBookDTO"

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import {GoSignOut} from 'react-icons/go'



export default function FeedPage() {
    const [books, setBooks] = React.useState<BooksDTO[]>([])
    const [logout, setLogout] = React.useState(false)
    const [reload, setReload] = React.useState(false)
    const { states, setters } = React.useContext(GlobalContext)
    const { loading } = states
    const { setLoading } = setters

    const [activeStep, setActiveStep] = React.useState(0)
    const [bookArray, setBookArray] = React.useState<string[]>([])
    const [fisrtStepForm, onChangeFisrtStepForm, clearfields] = useForm({
        title: '',
        author: '',
        bookGenre: '',
        synopsis: ''
    })
   
    const [secondStepForm, onChangeSecondStepForm] = useForm({
        userFeedback: '',
        userRate: 0
    })
    console.log(secondStepForm.userRate)
    const handleNext = async (event: any) => {
        event.preventDefault();
        if (activeStep === steps.length - 1) {
            const body: PostBookDTO = {
                title: fisrtStepForm.title as string,
                author: fisrtStepForm.author as string,
                bookGenre: bookArray as string[],
                synopsis: fisrtStepForm.synopsis as string,
                userFeedback: secondStepForm.userFeedback as string,
                userRate: Number(secondStepForm.userRate)
            }

            await postBook('book', body, setReload, reload, setLoading)
            setActiveStep(0)
            setBookArray([])
            clearfields()
            handleClose()
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const addBookGenre = () => {
        setBookArray(prevBookGenre => [...prevBookGenre, fisrtStepForm.bookGenre])
    }

    const removeBookGenre = (chipToDelete: string): void | undefined => {
        const array: string[] = [...bookArray]
        const index = array.findIndex((genre: string) => genre === chipToDelete)
        array.splice(index, 1)
        setBookArray(array)
    }

    const steps = [
        { label: 'Informações do Livro' },
        { label: 'Avaliação do usuário' }
    ]

    const renderForm = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStep
                    form={fisrtStepForm}
                    onChange={onChangeFisrtStepForm}
                    activeStep={activeStep}
                    steps={steps}
                    addBookGenre={addBookGenre}
                    removeBookGenre={removeBookGenre}
                    bookArray={bookArray}
                />
            case 2:
                return <SecondStep
                    form={secondStepForm}
                    onChange={onChangeSecondStepForm}
                    handleButtonClick={handleBack}
                    activeStep={activeStep}
                    steps={steps}
                />
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '45%',
        bgcolor: '#e0dede',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useProtectedPage(logout)

    React.useEffect(() => {
        getAllBooks('book/feed', setBooks, setLoading)
    }, [reload])

    const deleteBook = (id: string): void => {
        deleteBookById(`book/${id}`, setLoading, setReload, reload)
    }

    // const updateBook = (id: string) => {
    //     updateRequest(`book/${id}`, setLoading)
    // }

    const renderBooks = books.map((book: BooksDTO) => {
        return <CardFeed book={book} deleteBook={deleteBook} />
    })

    // const logOut = () => {
    //     window.sessionStorage.removeItem("token")
    //     setLogout(true)
    // }

    return (
        <Box sx={{ maxWidth: '100vw', minHeight: '100vh', background: '#0f0f0ffc' }}>
            <Header
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '20px', padding: '20px 0', background: '#0f0f0ffc' }}>
                {
                    loading ?
                        <>
                            carregando ...
                        </>
                        :
                        <>
                            {renderBooks}
                        </>
                }
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Postar Crítica
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((step, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};

                                return (
                                    <Step key={step.label} {...stepProps}>
                                        <StepLabel {...labelProps}>{step.label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                        <React.Fragment>
                            <Box component={"form"} onSubmit={handleNext} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', width: '100%', mt: 2 }}>
                                {renderForm(activeStep + 1)}
                            </Box>
                        </React.Fragment>
                    </Box>
                </Box>
            </Modal>
            <IconButton onClick={handleOpen} sx={{ position: 'fixed', bottom: '5vh', right: '5vw', background: colors.primaryOrange, color: 'white', "&:hover": { background: colors.secondaryOrange } }}>
                <AddIcon />
            </IconButton>
        </Box>

    )
}