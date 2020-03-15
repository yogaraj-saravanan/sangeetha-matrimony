import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {AngularFireModule} from '@angular/fire';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminConsoleComponent,
        UserDetailComponent,
        AddUserComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatMomentDateModule,
        FormsModule,
        NgxBootstrapSliderModule,
        MultiselectDropdownModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
