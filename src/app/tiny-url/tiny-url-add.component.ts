import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TinyUrlService } from './tiny-url.service';
import { TinyUrl } from './model/tiny-url';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup,Validators,FormBuilder ,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
@Component({
   selector: 'app-tiny-url-add',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './tiny-url-add.html',
  styleUrls: ['./tiny-url-add.css']
})
export class TinyURlAddComponent implements OnInit {

  tinyUrls: TinyUrl[]=[];
  originalUrl: string = '';
  userForm!: FormGroup;
  isPrivate: boolean = false;

  generatedShortUrl: string = '';

  publicUrls: any[] = [];

  filteredUrls: any[] = [];
  shortUrl:string='';
  searchText: string = '';
  constructor(private http: HttpClient,private service:TinyUrlService,private cdr: ChangeDetectorRef,private fb:FormBuilder) { }


  ngOnInit(): void {
     this.userForm = this.fb.group({
      // Built-in client-side validation
      urlname:['', [Validators.required]],
     isPrivate:[false]
    });
    this.getAllUrl();
  }

  getAllUrl(){
this.userForm.patchValue({
  urlname: '',
  isPrivate: false
  
});    this.service.getAllUrls().subscribe({
      next: (response:TinyUrl[]) => {
        console.log(response);
        this.tinyUrls=response;
        this.filteredUrls=response;
         this.cdr.detectChanges();
      },
      error: (error:Error) => {
        console.log(error);
      }

    });;
  }

  // Generate Tiny URL
  generateUrl(): void {
 if (this.userForm.invalid) return;
    if (! this.userForm.get('urlname')?.value) {
      alert('Please enter URL');
      return;
    }
    this.originalUrl=this.userForm.get('urlname')?.value
    let tinyUrl:TinyUrl=new TinyUrl();
    tinyUrl.OriginalUrl=this.originalUrl;
    tinyUrl.IsPrivate=this.userForm.get('isPrivate')?.value//this.isPrivate;

    this.service.addUrl(tinyUrl).subscribe({
      next: (response) => {
        this.generatedShortUrl=response.shortUrl;
        this.cdr.detectChanges();
        this.getAllUrl();
      },

      error: (error) => {
        console.log(error);
        alert(error.error);
      }

    });

  }
  clickNewUrl(event:any){
    event.preventDefault()
    let originalData = this.filteredUrls.find(x=>x.ShortCode==this.generatedShortUrl);
     window.open(originalData.OriginalUrl,'_blank')
  }
    // Copy URL
  updateClick(data: TinyUrl,event:any): void {
    event.preventDefault();
    if (!data?.ShortCode) {
      return;
    }


    data.Clicks = (data.Clicks ?? 0) + 1;

    this.service.updateUrl(data)
      .subscribe({

        next: () => {

          console.log('Updated');

        },

        error: (error:any) => {

          console.error(error);

        }

      });
     window.open(data.OriginalUrl,'_blank')
     
  }

  // Delete URL
  deleteUrl(id: number){

    if (!confirm('Are you sure to delete?')) {
      return;
    }

    this.service.deleteUrl(id).subscribe({

      next: () => {

        alert('Deleted Successfully');

        this.getAllUrl();
      },

      error: (error) => {

        console.log(error);

        alert('Delete Failed');
      }
    });

  }

  // Search URL
  searchUrls(): void {

    if (!this.searchText) {
      this.tinyUrls =this.filteredUrls;
return
      
  }
  this.tinyUrls =this.filteredUrls.filter(x=>x.OriginalUrl.toLowerCase().includes(this.searchText.toLowerCase()) || x.ShortCode.toLowerCase().includes(this.searchText.toLocaleLowerCase()))
}
copyShortUrl(ShortCode?:string){
 navigator.clipboard.writeText(ShortCode??"");
}

 get urlnameCtrl() {
    return this.userForm.get('urlname');
  }

}