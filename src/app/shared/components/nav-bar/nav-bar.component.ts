import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  role: string = '';
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    const subscription = this.authService.currentUser$.subscribe({
      next: (data) => {
        this.role = data?.user_metadata?.['role'] || '';
        this.isAuthenticated = !!data?.role || !!this.role;
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onLogout() {
    const subscription = this.authService.signOut().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
