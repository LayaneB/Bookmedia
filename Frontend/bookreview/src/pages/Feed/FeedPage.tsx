import React from 'react'
import CardFeed from '../../components/CardFeed/CardFeed'
import { GlobalContext } from '../../global/GlobalContext'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { BooksDTO } from '../../interfaces/feed/BooksDTO'
import { deleteBookById, getAllBooks, postBook } from '../../services/requests'
import { colors } from '../../theme/Colors'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress, IconButton, Modal, Typography, Box } from '@mui/material'
import { useForm } from '../../hooks/useForm'
import FirstStep from '../../components/RegisterBook/FirstStep'
import SecondStep from '../../components/RegisterBook/SecondStep'
import { PostBookDTO } from '../../interfaces/feed/PostBookDTO'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export default function FeedPage() {
    const navigate = useNavigate()
    const { states, setters } = React.useContext(GlobalContext)
    const { loading, reloadData } = states
    const { setLoading, setReloadData, setToken } = setters
    const [books, setBooks] = React.useState<BooksDTO[]>([])
    const [open, setOpen] = React.useState(false)
    const [activeStep, setActiveStep] = React.useState(0)
    const [bookArray, setBookArray] = React.useState<string[]>([])
    const [fisrtStepForm, onChangeFisrtStepForm, clearfields, cleanOne] = useForm({
        title: '',
        author: '',
        bookGenre: '',
        synopsis: ''
    })
console.log(fisrtStepForm)
    const [secondStepForm, onChangeSecondStepForm] = useForm({
        userFeedback: '',
        userRate: 0
    })

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
    }

    useProtectedPage()

    const notify = (error: string) => toast.error(error)

    React.useEffect(() => {
        getAllBooks('book/feed', setBooks, setLoading, notify)
    }, [reloadData])

    // Modal
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // Stepper
    const handleNext = async (event: any) => {
        event.preventDefault()
        if (activeStep === steps.length - 1) {
            const body: PostBookDTO = {
                title: fisrtStepForm.title as string,
                author: fisrtStepForm.author as string,
                bookGenre: bookArray as string[],
                synopsis: fisrtStepForm.synopsis as string,
                userFeedback: secondStepForm.userFeedback as string,
                userRate: Number(secondStepForm.userRate)
            }

            await postBook('book', body, setReloadData, reloadData, setLoading, notify)
            setActiveStep(0)
            setBookArray([])
            clearfields()
            handleClose()
        } else {
            if (bookArray.length > 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            } else {
                notify("Você deve adicionar pelo menos um gênero literário.")
            }
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const addBookGenre = () => {
        if (fisrtStepForm.bookGenre) {
            setBookArray(prevBookGenre => [...prevBookGenre, fisrtStepForm.bookGenre])
            cleanOne(fisrtStepForm, 'bookGenre')
        }
    }

    const removeBookGenre = (chipToDelete: string): void | undefined => {
        const array: string[] = [...bookArray]
        const index = array.findIndex((genre: string) => genre === chipToDelete)
        array.splice(index, 1)
        setBookArray(array)
    }

    const steps = ['Informações do Livro', 'Avaliação do usuário']

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

    // Feed
    const deleteBook = (id: string): void => {
        deleteBookById(`book/${id}`, setLoading, setReloadData, reloadData, notify)
    }

    const renderBooks = books.map((book: BooksDTO, index: number) => {
        return <CardFeed key={index} book={book} deleteBook={deleteBook} />
    })

    // header
    const logOut = () => {
        localStorage.removeItem("token")
        setToken({
            token: '',
            id: ''
        })
        navigate('/login')
    }

    const goTo = () => {
        const tokenNow = window.localStorage.getItem('token')
        const token = tokenNow && JSON.parse(tokenNow)
        navigate(`/profile/${token.id}`)
    }

    return (
        <Box sx={{ maxWidth: '100vw', minHeight: '100vh' }}>
            <Box sx={{ height: '10vh', width: '100%', background: colors.primaryOrange, display: 'flex', alignItems: 'center', justifyContent: 'right', gap: '5%', padding: '2%' }}>
                <IconButton onClick={goTo} sx={{ background: colors.primaryOrange, color: 'white', "&:hover": { background: colors.secondaryOrange } }}>
                    <AccountBoxIcon />
                </IconButton>
                <IconButton onClick={logOut} sx={{ background: colors.primaryOrange, color: 'white', "&:hover": { background: colors.secondaryOrange } }}>
                    <LogoutIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', gap: '20px', padding: '20px 0', color: 'white' }}>
                {
                    loading ?
                        <Box sx={{ height: '90vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress color="warning" size={'25px'} />
                        </Box>
                        :
                        <>
                            {renderBooks}
                        </>
                }
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{ color: colors.secondaryGray }}>
                        Postar Crítica
                    </Typography>
                    <Box sx={{ width: '100%' }}>
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

            <ToastContainer
                autoClose={4000}
                theme={"dark"}
                position={"top-center"}
            />
        </Box>
    )
}