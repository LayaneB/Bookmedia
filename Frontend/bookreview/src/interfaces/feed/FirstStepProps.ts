export type FirstStepProps = {
    form: {
        title: string
        author: string
        synopsis: string
        bookGenre: string
    }
    onChange: () => void
    activeStep : number
    steps: string[]
    addBookGenre: () => void
    removeBookGenre: (item: string) => void | undefined
    bookArray: string[]
}