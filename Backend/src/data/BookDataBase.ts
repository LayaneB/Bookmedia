import { InternalError } from "../errors/InternalError"
import { InsertBookDTO } from "../model/DTOs/insertBookDTO"
import { BaseDataBase } from "./BaseDataBase"

export class BookDataBase extends BaseDataBase {
    private static mainTableName = "teppa_book"
    private static auxiliarTableName = "teppa_book_genre"

    public insertBook = async (input: InsertBookDTO): Promise<void> => {
        try {
            await BaseDataBase.connection(BookDataBase.mainTableName)
                .insert({
                    id: input.getId(),
                    userId: input.getUserId(),
                    title: input.getTitle(),
                    synopsis: input.getSynopsis(),
                    author: input.getAuthor(),
                    userOpinion: input.getUserOpinion(),
                    userRate: input.getUserRate()
                })

            const bookGenres: string[] = input.getBookGenre()

            for (const bookGenre of bookGenres) {
                await BaseDataBase.connection(BookDataBase.auxiliarTableName)
                    .insert({
                        user_id: input.getUserId(),
                        book_id: input.getId(),
                        book_genre: bookGenre
                    })
            }

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

}
