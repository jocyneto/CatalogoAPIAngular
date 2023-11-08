import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  logoutForm!: FormGroup;
  isLoadingResults = false;
  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.logoutForm = this.formBuilder.group({});
  }

  addLogout() {
    localStorage.removeItem('jwt');
    this.isLoadingResults = true;
    this.router.navigate(['/login']);
  }
}
