import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../common/message';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8080/messages';

  constructor(private httpClient: HttpClient) {
  }
  getAllMessages(): Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(this.baseUrl);
  }

  getMessagesBySender(name: string): Observable <GetResponse> {
    // build url based on  sent messages
    const searchUrl = `${this.baseUrl}/search/findMessagesBySenderName?name=${name}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  getMessagesByReceiver(name: string): Observable <GetResponse> {
    // build url based on  received messages
    const searchUrl = `${this.baseUrl}/search/findMessagesByReceiverName?name=${name}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getAllMessagesForUser(name: string): Observable<GetResponse> {
    // build url based on user
    const searchUrl = `${this.baseUrl}/search/findMessagesBySenderNameOrReceiverName?sender=${name}&receiver=${name}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getMessagesByDate(date: string): Observable<GetResponse> {
    // build url based on date yyyy-mm-dd format
    const searchUrl = `${this.baseUrl}/search/findMessagesByDateCreated?yyyy_mm_dd=${date}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  getMassagesByReadStatus(wasRead: boolean): Observable<GetResponse> {
    // build url based on read status
    const searchUrl = `${this.baseUrl}/search/findMessagesByWasRead?wasRead=${wasRead}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

}

interface GetResponse {
  _embedded: {
    messages: Message[];
  };
}
