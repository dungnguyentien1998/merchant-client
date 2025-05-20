import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  login() {
    this.loading = true;
    this.apiService.authenticate(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.apiService.setToken(response.token);
          this.loading = false;
          this.router.navigate(['/order']);
        } else {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Login Failed',
              message: 'Wrong username or password'
            }
          });
        }

      },
      error: (error) => {
        this.loading = false;
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Login Failed',
            message: 'Something wrong'
          }
        });
      }
    });
  }
}
