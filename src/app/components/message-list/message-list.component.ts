import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Message} from '../../common/message';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list-table.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  originalMessages: Message[];
  currentMessages: Message[];
  currentUser: string;
  readStatus = false;
  currentBoxStatus = 'inbox';
  mailBoxTitle = 'Inbox';

  constructor(private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.route.paramMap.subscribe(() => {
      this.listAllMessagesForUser();
      this.listInboxMessages();
      this.listSentMessages();
      this.listMessagesByReadStatus();
      this.testDataStatus();
    });
    this.listAllMessagesForUser();

  }

  private listAllMessagesForUser(): void {
    if (this.route.snapshot.paramMap.get('box-status') === 'inbox'){
    this.currentBoxStatus = 'inbox';
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.messageService.getAllMessagesForUser(this.currentUser).
    subscribe(
      data => {
        this.originalMessages = data._embedded.messages;
      }
    );
  }}

  private listInboxMessages(): void {
    if (this.route.snapshot.paramMap.get('box-status') === 'inbox'){
      this.currentBoxStatus = 'inbox';
      this.mailBoxTitle = 'Inbox';
      this.currentUser = this.route.snapshot.paramMap.get('name');
      this.messageService.getMessagesByReceiver(this.currentUser).
      subscribe(
      data => {
        this.currentMessages = data._embedded.messages;
        this.mailBoxTitle = 'Inbox';
      }
    );
  }}
  private listSentMessages(): void {
    if (this.route.snapshot.paramMap.get('box-status') === 'sent'){
      this.currentBoxStatus = 'sent';
      this.mailBoxTitle = 'Sent';
      this.currentUser = this.route.snapshot.paramMap.get('name');
      this.messageService.getMessagesBySender(this.currentUser).
      subscribe(
      data => {
        this.currentMessages = data._embedded.messages;
      }
    );
  }}

  private listMessagesByReadStatus(): void {
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.currentBoxStatus = this.route.snapshot.paramMap.get('box-status');
    const filteredList = [];
    const readParamExist: boolean = this.route.snapshot.paramMap.has('read-status');
    if (readParamExist){
      if (this.route.snapshot.paramMap.get('read-status') === 'read'){
        this.readStatus = true;
     }else if (this.route.snapshot.paramMap.get('read-status') === 'unread'){
        this.readStatus = false;
     }else{
        this.readStatus = false;
     }
      this.messageService.getMassagesByReadStatus(this.readStatus).
        subscribe(
      data => {
              const tempArray = data._embedded.messages;
              for (const tempMessage of tempArray){
                  for (const theMessage of this.currentMessages){
                      if ((tempMessage.message === theMessage.message) && (theMessage.wasRead === this.readStatus)){
                          filteredList.push(theMessage);
                      }
                  }
              }
              this.currentMessages = filteredList;
           }
        );
    }else{
      console.log('Undefined list for messages');
    }
  }
  private testDataStatus(): void{
    console.log('Current User: ' + this.currentUser +
              '\nCurrent mailbox title: ' + this.mailBoxTitle +
              '\nCurrent mailbox route: ' + this.currentBoxStatus +
              '\nCurrent read-status: ' + this.readStatus); }

}

