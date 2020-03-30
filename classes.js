export class Book
{
    constructor(bookName,price,date,author){
        this.bookName = bookName;
        this.price = price;
        this.date = date;
        this.author = author;
    }
}
export class Author
{
    constructor(authorName,authorEmail)
    {
        this.authorName = authorName;
        this.authorEmail = authorEmail;
    }
}