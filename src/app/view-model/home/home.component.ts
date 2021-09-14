import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/global/auth/auth.service';
import { userData } from 'src/app/global/modules/login/login';

@Component({
  selector: 'app-home',
  templateUrl: '../../view/home/home.component.html',
  styleUrls: ['../../view/home/home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) {
     }

  ngOnInit() {
    this.checkAuthLogin();
  }

  checkAuthLogin(): void {
    this.authService.user$.subscribe((value: typeof userData) => {
      console.log(value);
      if (value._id) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

}
