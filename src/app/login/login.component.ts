import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  onSubmit() {
    this.loginService
      .signInWithEmail({ email: this.email, password: this.password })
      .subscribe({
        next: (data) => {
          console.log(data.user);
        },
      });
    this.router.navigate(['/catalogue']);
  }
}
