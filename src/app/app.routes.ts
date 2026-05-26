import { Routes } from '@angular/router';
import{TinyURlAddComponent} from'../app/tiny-url/tiny-url-add.component'

export const routes: Routes = [
     { path: '', redirectTo: 'tinyurl', pathMatch: 'full' }, 
        {path:'tinyurl', component: TinyURlAddComponent }

];
