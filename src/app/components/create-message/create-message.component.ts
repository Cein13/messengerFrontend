import { Component, OnInit } from '@angular/core';
import {Message} from '../../common/message';
import {MessageService} from '../../services/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  originalMessages: Message[];
  currentUser: string;
  messageId: number;
  currentBoxStatus: 'inbox';

  constructor(private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.route.snapshot.paramMap.get('box-status');
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.currentUser = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(() => {
      this.listAllMessagesForUser();
      this.sendNewMessage();
      this.sendReply();
    });
    this.listAllMessagesForUser();
    this.sendNewMessage();
    this.sendReply();
  }

  private listAllMessagesForUser(): void {
    this.currentUser = this.route.snapshot.paramMap.get('box-status');
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.currentUser = this.route.snapshot.paramMap.get('id');
    this.messageService.getAllMessagesForUser(this.currentUser).
    subscribe(
      data => {
        this.originalMessages = data._embedded.messages;
      }
    );
    this.testDataStatus2();
  }
  private sendNewMessage(): void{
    // todo: create new message and send it to db, change void to return statement
  }
  private sendReply(): void{
    // todo: create new message based on recipient and send it to db, change void to return statement
  }
  private testDataStatus2(): void{
    console.log('Current User: ' + this.currentUser +
      '\nCurrent message id: ' + this.messageId); }

}


