export class BookModel {
    constructor(
        private id: string,
        private userId: string,
        private title: string,
        private synopsis: string,
        private author: string,
        private bookGenre: string[],
        private userOpinion: string,
        private userRate: number
    ){}

    public getId(){
        return this.id
    }
    public getUserId(){
        return this.userId
    }
    public getTitle(){
        return this.title
    }
    public getSynopsis(){
        return this.synopsis
    }
    public getAuthor(){
        return this.author
    }
    public getBookGenre(){
        return this.bookGenre
    }
    public getUserOpinion(){
        return this.userOpinion
    }
    public getUserRate(){
        return this.userRate
    }
}