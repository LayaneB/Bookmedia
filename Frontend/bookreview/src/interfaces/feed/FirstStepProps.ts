export type FirstStepProps = {
    // children: React.ReactNode; 
    form: {
        title: string,
        author: string,
        synopsis: string,
        bookGenre: string
    },
    onChange: () => void,
    activeStep : number,
    steps: string[],
    addBookGenre: () => void,
    removeBookGenre: (item: string) => void | undefined,
    bookArray: string[]
}