import { Books } from "../models/book.model";
import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BooksService{

  constructor(private api : HttpClient){}

  apiRoot : string = 'https://www.googleapis.com/books/v1/volumes'


  getBooks(author: string) : Promise<Books[]> {
    return new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?q=inauthor:"${author}"&langRestrict=en`;
      this.api.get(apiURL).subscribe((data: any) => {
        let results : Books[] = data.items.map((item : any) => {
          return new Books(
            this.getSafe(() => item.volumeInfo.title),
            this.getSafe(() => item.volumeInfo.authors),
            this.getSafe(() => item.volumeInfo.imageLinks.thumbnail)
          )
        })
        resolve(results);
      },
        (err)=>{
          reject(err)
        }
      );
    }
    );
  }

  private getSafe<T> (f: () => T) : any {
    try {
      return f();
    } catch (error) {
      return undefined;
    }
  }

}
