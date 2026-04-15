import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  private loginService = inject(LoginService);

  onSubmit() {
    this.loginService
      .signInWithEmail({ email: this.email, password: this.password })
      .then((response) => {
        if (response.error) {
          console.error('Login failed:', response.error.message);
        } else {
          console.log('Login successful:', response.data);
        }
      });
  }
}
