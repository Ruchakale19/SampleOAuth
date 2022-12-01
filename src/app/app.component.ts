
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from './google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SampleForOAuth';

  mailSnippets: string[] = []
  userInfo?: UserInfo

  constructor(private readonly googleApi: GoogleApiService) {
    debugger;
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
    debugger;
  }

  isLoggedIn(): boolean {
    debugger;
    return this.googleApi.isLoggedIn()
  }

  logout() {
    debugger;
    this.googleApi.signOut()
    debugger;
  }

  async getEmails() {
    debugger;
    if (!this.userInfo) {
      debugger;
      return;
    }
    debugger;
    const userId = this.userInfo?.info.sub as string;
    const messages = await lastValueFrom(this.googleApi.emails(userId));
    debugger;
    messages.messages.forEach( (element: any) => {
      debugger;
      const mail = lastValueFrom(this.googleApi.getMail(userId, element.id))
      mail.then( mail => {
        debugger;
        this.mailSnippets.push(mail.snippet)
        debugger;
      })
      debugger;
    });
    debugger;
  }
}