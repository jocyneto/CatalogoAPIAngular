import { Component } from '@angular/core';
import { ApiService } from 'src/Services/api.service';
import { Categoria } from 'src/model/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent {
  displayedColumns: string[] = ['nome', 'imagem', 'acao'];
  dataSource!: Categoria[];
  isLoadingResults = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCategorias().subscribe(
      (res) => {
        this.dataSource = res;
        console.log(this.dataSource);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
