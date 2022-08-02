import { Chip, Typography } from "@mui/material"
import { CardFeedProps } from "../../interfaces/feed/CardFeedProps"
import moment from "moment"
import Rating from '@mui/material/Rating'
import { BoxContainer } from "./Style"
import { Box } from "@mui/system"

const CardFeed = (props: CardFeedProps) => {
    const { book } = props

    const renderBookGenre = book.bookGenre.map((genre: string, index: number) => {
        return (
            <Chip key={index} label={genre} variant="outlined" size="small" />
        )
    })
    const formatDate = moment(book.createdAt).format('DD/MM/YYYY')

    return (
        <BoxContainer>

            <Typography sx={{ textAlign: 'right', fontSize: '0.8rem' }}>{formatDate}</Typography>
            <Typography sx={{ textAlign: 'center', fontWeight: 500, textTransform: 'uppercase' }}>{book.title}</Typography>
            <Typography sx={{ textAlign: 'left', fontSize: '0.9rem', mb: 1 }}>{book.author}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1%', mb: 1 }}>
                {renderBookGenre}
            </Box>
            <Typography sx={{ textAlign: 'justify', fontSize: '0.9rem', mb: 1 }}>{book.synopsis}</Typography>
            <hr />
            <Rating value={book.userRate / 2} readOnly sx={{ marginTop: 1 }} />
            <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }}>{book.username}</Typography>
            <Typography sx={{ textAlign: 'justify' }}>{book.userFeedback}</Typography>

        </BoxContainer>
    )
}

export default CardFeed