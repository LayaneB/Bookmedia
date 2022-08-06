import { Box, Chip, CircularProgress, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { colors } from "../../theme/Colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from "react";
import { deleteBookById, getBookByUser, getUser } from "../../services/requests";
import { useNavigate, useParams } from "react-router";
import { ProfileDTO } from "../../interfaces/profile/ProfileDTO";
import { GlobalContext } from "../../global/GlobalContext";
import moment from "moment";
import CardFeed from "../../components/CardFeed/CardFeed";
import { BooksDTO } from "../../interfaces/feed/BooksDTO";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';

export default function ProfilePage() {
    const navigate = useNavigate()
    const params = useParams()
    const { states, setters } = React.useContext(GlobalContext)
    const { loading, reloadData } = states
    const { setLoading, setReloadData, setToken } = setters
    const [books, setBooks] = React.useState<BooksDTO[]>([])
    const [userData, setUserData] = React.useState<ProfileDTO>({
        id: '',
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: new Date(),
        country: '',
        state: '',
        role: '',
        literaryGenres: [],
        publicInformations: 0
    })

    useProtectedPage()

    const notify = (error: string) => toast.error(error)

    React.useEffect(() => {
        getUser(`user/${params.id}`, setUserData, notify)
        getBookByUser(`book/${params.id}`, setBooks, setLoading, notify)
    }, [params.id, setLoading])

    const renderGenre = userData.literaryGenres.map((genre: string, index: number) => {
        return (
            <Chip key={index} label={genre} size="small" sx={{
                "&.MuiChip-root": {
                    backgroundColor: 'transparent',
                    border: `1px solid ${colors.secondaryGray}`,
                    color: colors.primaryOrange
                }
            }}
            />
        )
    })

    const deleteBook = (id: string): void => {
        deleteBookById(`book/${id}`, setLoading, setReloadData, reloadData, notify)
    }

    const renderBooks = books.map((book: BooksDTO) => {
        return <CardFeed book={book} deleteBook={deleteBook} />
    })

    const phoneMask = () => {
        const x: RegExpMatchArray | null = userData.phoneNumber.replace(/\D/g, '').match(/(\d{2})(\d{5})(\d{4})/);
        const result = x && '(' + x[1] + ') ' + x[2] + '-' + x[3]
        return result
    }

    const logOut = () => {
        localStorage.removeItem("token")
        setToken({
          token:'',
          id:''
        })
        navigate('/login')
      }
    
      const goTo = () => {
          navigate('/feed')

      }

    return (
        <>
            <Box sx={{ height: '10vh', width: '100%', background: colors.primaryOrange, display: 'flex', alignItems: 'center', justifyContent: 'right', gap: '5%', padding: '2%' }}>
                <IconButton onClick={goTo} sx={{ background: colors.primaryOrange, color: 'white', "&:hover": { background: colors.secondaryOrange } }}>
                    <HomeIcon />
                </IconButton>
                <IconButton onClick={logOut} sx={{ background: colors.primaryOrange, color: 'white', "&:hover": { background: colors.secondaryOrange } }}>
                    <LogoutIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ height: '90vh', width: '20vw', background: '#0f0f0fed', color: colors.secondaryOrange, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingTop: '5%' }}>
                    <AccountCircleIcon sx={{ fontSize: '9rem' }} />
                    {
                        !loading ?
                            <>
                                <Typography>{userData.firstName} {userData.lastName}  ( {userData.username} )</Typography>
                                <Box sx={{ display: 'flex', gap: '10px' }}>
                                    {renderGenre}
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {
                                        userData.publicInformations ? <>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CalendarMonthIcon /> {moment(userData.birthDate).format('DD/MM/YYYY')}</Typography>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><LocationOnIcon /> {userData.state}/{userData.country}</Typography>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><PhoneAndroidIcon /> {phoneMask()}</Typography>
                                        </> : <></>
                                    }
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><AutoStoriesIcon /> {userData.role} </Typography>
                                </Box>
                            </>
                            :
                            <>
                            </>

                    }

                </Box>
                <Box sx={{ height: '90vh', width: '80vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px 0px', overflowY: 'scroll' }}>
                    {
                        loading ?
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <CircularProgress color="warning" size={'25px'} />
                            </Box>
                            :
                            <>
                                {renderBooks}
                            </>
                    }
                </Box>
            </Box>
            <ToastContainer
                autoClose={4000}
                // theme={"dark"}
                position={"top-center"}
                hideProgressBar={true}
            />
        </>
    )
}