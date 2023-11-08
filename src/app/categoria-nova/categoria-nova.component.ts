import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-categoria-nova',
  templateUrl: './categoria-nova.component.html',
  styleUrls: ['./categoria-nova.component.scss'],
})
export class CategoriaNovaComponent {
  categoriaForm!: FormGroup;
  nome: String = '';
  imagemUrl: String = '';

  isLoadingResults = false;
  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      nome: [null, Validators.required],
      imagemUrl: [null, Validators.required],
    });
  }

  addCategoria(form: NgForm) {
    this.isLoadingResults = true;
    this.api.adicionaCategoria(form).subscribe(
      (res) => {
        const id = res['categoriaId'];
        this.isLoadingResults = false;
        this.router.navigate(['/categorias']);
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
