import { Box } from "@mui/system"
import React from "react"
import CardFeed from "../../components/CardFeed/CardFeed"
import { GlobalContext } from "../../global/GlobalContext"
import { useProtectedPage } from "../../hooks/useProtectedPage"
import { BooksDTO } from "../../interfaces/feed/BooksDTO"
import { getRequest } from "../../services/requests"

export default function FeedPage() {
    const [books, setBooks] = React.useState<BooksDTO[]>([])
    const [logout, setLogout] = React.useState(false)
    const { states, setters } = React.useContext(GlobalContext)
    const { loading } = states
    const { setLoading } = setters

    useProtectedPage(logout)

    React.useEffect(() => {
        getRequest('book/feed', setBooks, setLoading)
    }, [])

    const renderBooks = books.map((book: BooksDTO) => {
        return <CardFeed book={book} />
    })

    console.log(books)
    return (
        <Box sx={{display:'flex', flexDirection:'column', width:'100vw', alignItems:'center', gap:'10px'}}>
            {renderBooks}
        </Box>
    )
}