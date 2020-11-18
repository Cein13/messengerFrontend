import { Component, OnInit } from '@angular/core';
import {Message} from '../../common/message';
import {MessageService} from '../../services/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  currentUser: string;

  constructor(private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.route.snapshot.paramMap.get('name');
    this.testDataStatus3();
  }

  private testDataStatus3(): void{
    console.log('Current User: ' + this.currentUser); }

}


