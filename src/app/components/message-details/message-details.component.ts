import { Component, OnInit } from '@angular/core';
import {Message} from '../../common/message';
import {MessageService} from '../../services/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  originalMessages: Message[];
  currentUser: string;
  messageId: number;
  currentBoxStatus = 'inbox';

  constructor(private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listAllMessagesForUser();
    });
    this.listAllMessagesForUser();
  }

  private listAllMessagesForUser(): void {
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.messageId = +this.route.snapshot.paramMap.get('id');
    this.currentBoxStatus = this.route.snapshot.paramMap.get('box-status');
    this.messageService.getAllMessagesForUser(this.currentUser).
      subscribe(
        data => {
          this.originalMessages = data._embedded.messages;
        }
      );
    this.testMessageDetailsComponentData();
  }
  private testMessageDetailsComponentData(): void{
      console.log('Current User: ' + this.currentUser +
                   '\nCurrent message id: ' + this.messageId); }

}


