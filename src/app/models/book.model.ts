import { BookInterface } from "./bookInterface";

export class Book implements BookInterface {
    title: string;
    author: string;
    genre: string;
    isbn: number;
    price: number | null;
    pubDate: string;

  constructor(title: string, author: string, genre: string, isbn: number, price: number | null, pubDate: string) {
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.isbn = isbn;
      this.price = price;
      this.pubDate = pubDate;
  }
}