import { Component, OnInit , ViewChild } from '@angular/core';
import { Books } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.css']
})
export class BooksItemComponent implements OnInit {

  books: Books[] = [];
  searchString : string = ''
  @ViewChild('author') author: string | undefined ;
  formsSearch : FormGroup  ;
  showError : boolean = false ;

  constructor(private booksService : BooksService , private builder : FormBuilder ) {

    this.formsSearch = this.builder.group({
      search : ['' , Validators.compose([Validators.required])]
    })

   }



  ngOnInit(): void {

  }

  onClickImage(book:Books) {
    //book.previewMode = !book.previewMode;
  }

  onSubmit() {
    this.getBooks()
  }


  private getBooks() {
    if(this.formsSearch.valid){
      this.showError = false ;
      this.booksService.getBooks(this.searchString).then(data => {
        this.books = data;
      })
    }else{
      this.showError = true ;
    }
  }

}
