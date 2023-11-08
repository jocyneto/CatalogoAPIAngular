import { Component } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { Usuario } from 'src/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  email: String = '';
  password: String = '';
  dataSource!: Usuario;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  addLogin(form: NgForm) {
    this.isLoadingResults = true;

    this.api.login(form).subscribe({
      next: (res) => {
        this.dataSource = res;
        localStorage.setItem('jwt', this.dataSource.token);
        this.isLoadingResults = false;
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        console.log(err);
        this.isLoadingResults = false;
      },
    });
  }
}
