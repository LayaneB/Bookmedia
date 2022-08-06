import { Box, Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { CardFeedProps } from "../../interfaces/feed/CardFeedProps"
import moment from "moment"
import Rating from '@mui/material/Rating'
import { BoxContainer } from "./Style"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PersonIcon from '@mui/icons-material/Person'
import React from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router"
import { useParams } from "react-router"

const CardFeed = (props: CardFeedProps) => {
    const { book, deleteBook } = props
    const navigate = useNavigate()
    const tokenNow = window.localStorage.getItem('token')
    const token = tokenNow && JSON.parse(tokenNow)

    const renderBookGenre = book.bookGenre.map((genre: string, index: number) => {
        return (
            <Chip key={index} label={genre} variant="outlined" size="small" />
        )
    })
    const formatDate = moment(book.createdAt).format('DD/MM/YYYY')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const params = useParams()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        setAnchorEl(null);
        deleteBook(book.id)
    };
    const handleProfile = () => {
        setAnchorEl(null);
        navigate(`/profile/${book.userId}`)
    };

    return (
        <BoxContainer>
            {!params.id && <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: '5px' }}>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >{
                        book.userId === token.id ?
                            <>
                                <MenuItem onClick={handleDelete} sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}> <DeleteIcon sx={{ fontSize: '0.9rem' }} /> Excluir</MenuItem>
                                <MenuItem onClick={handleClose} sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}> <EditIcon sx={{ fontSize: '0.9rem' }} /> Editar</MenuItem>
                            </>
                            :
                            <>
                                <MenuItem onClick={handleProfile} sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}> <PersonIcon sx={{ fontSize: '0.9rem' }} /> Ver Perfil </MenuItem>
                            </>
                    }
                </Menu>
            </Box>
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', paddingTop:'20px' }}>
                <Typography sx={{ fontSize: '0.9rem' }}>{book.author}</Typography>
                <Typography sx={{ fontSize: '0.8rem' }}>{formatDate}</Typography>
            </Box>
            <Typography sx={{ textAlign: 'center', fontWeight: 500, textTransform: 'uppercase', margin: '15px 0px' }}>{book.title}</Typography>

            <Typography sx={{ textAlign: 'justify', fontSize: '0.9rem', mb: 1 }}>{book.synopsis}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1%', mb: 1 }}>
                {renderBookGenre}
            </Box>
            <hr />
            <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 500, textTransform: 'capitalize', gap: '5px', mt: '5px', fontSize: '0.9rem' }}><AccountCircleIcon sx={{ fontSize: '1.2rem' }} /> {book.username}</Typography>
            <Rating value={book.userRate} readOnly sx={{ marginTop: 1 }} precision={0.5} />
            <Typography sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>{book.userFeedback}</Typography>


        </BoxContainer>
    )
}

export default CardFeed