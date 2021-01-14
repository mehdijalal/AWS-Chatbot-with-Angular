import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes} from '@aws-amplify/ui-components';


const handleChatComplete = (event: Event) => {
  const { data, err } = (event as any).detail;
  if (data) console.log('Chat fulfilled!', JSON.stringify(data));
  if (err) console.error('Chat failed:', err);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;

  constructor(private ref: ChangeDetectorRef) {
    this.formFields = [
      { type: "username" },
      { type: "password" },
      { type: "email" }
    ];
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
    const chatbotElement = document.querySelector('amplify-chatbot');
    chatbotElement.addEventListener('chatCompleted', handleChatComplete);
  }

  ngOnDestroy() {
    const chatbotElement = document.querySelector('amplify-chatbot');
    chatbotElement.removeEventListener('chatCompleted', handleChatComplete);
    return onAuthUIStateChange;
  }
}