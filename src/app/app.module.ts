import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from './services/message.service';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'view/:box-status/:name', component: MessageListComponent},
  {path: 'view/:box-status/:name/:read-status', component: MessageListComponent},
  {path: 'view/:box-status/:name/view-message/:id', component: MessageDetailsComponent},
  {path: 'send-message/:name', component: CreateMessageComponent},
  {path: 'confirmation/:name', component: ConfirmationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageListComponent,
    MessageDetailsComponent,
    CreateMessageComponent,
    ConfirmationComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
