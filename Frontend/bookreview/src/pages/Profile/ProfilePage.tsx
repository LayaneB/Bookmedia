import { Box, Chip, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from "../../components/Header/Header";
import { colors } from "../../theme/Colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from "react";
import { deleteBookById, getBookByUser, getUser } from "../../services/requests";
import { useParams } from "react-router";
import { ProfileDTO } from "../../interfaces/profile/ProfileDTO";
import { GlobalContext } from "../../global/GlobalContext";
import moment from "moment";
import CardFeed from "../../components/CardFeed/CardFeed";
import { BooksDTO } from "../../interfaces/feed/BooksDTO";

export default function ProfilePage() {

    const params = useParams()
    const { states, setters } = React.useContext(GlobalContext)
    const { loading } = states
    const { setLoading } = setters
    const [reload, setReload] = React.useState(false)
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
        publicaLocation: 0
    })


    React.useEffect(() => {
        getUser(`user/${params.id}`, setUserData)
        getBookByUser(`book/${params.id}`, setBooks, setLoading)
    }, [params.id, setLoading])

    const renderGenre = userData.literaryGenres.map((genre: string, index: number) => {
        return (
            <Chip key={index} label={genre} variant="outlined" size="small" />
        )
    })

    const deleteBook = (id: string): void => {
        deleteBookById(`book/${id}`, setLoading, setReload, reload)
    }
    console.log(books)

    const renderBooks = books.map((book: BooksDTO) => {
        return <CardFeed book={book} deleteBook={deleteBook} />
    })

    return (
        <>
            <Header
            />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ height: '90vh', width: '20vw', background: '#0f0f0fed', color: colors.secondaryOrange, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingTop: '5%' }}>
                    <AccountCircleIcon sx={{ fontSize: '9rem' }} />
                    <Typography>{userData.firstName} {userData.lastName} - vulgo {userData.username}</Typography>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        {renderGenre}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CalendarMonthIcon /> {moment(userData.birthDate).format('DD/MM/YYYY')}</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><LocationOnIcon /> {userData.state}/{userData.country}</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><PhoneAndroidIcon /> (83)98233-1333</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}><AutoStoriesIcon /> {userData.role} </Typography>
                    </Box>

                </Box>
                <Box sx={{ minHeight: '90vh', width: '80vw', background: '#0f0f0ffc', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding:'20px 0px' }}>
                    {
                        loading ?
                            <Box sx={{color:"white"}}>
                                carregando ...
                            </Box>
                            :
                            <>
                                {renderBooks}
                            </>
                    }
                </Box>
            </Box>
        </>
    )
}