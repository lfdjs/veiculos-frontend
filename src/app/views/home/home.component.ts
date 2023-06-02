import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

// const ELEMENT_DATA: Veiculo[] = [
//   { id: 1, placa: 'JJJ1234', chassi: 'CFAR!$%', renavam: 123456789, modelo: 'Teste', marca: 'Teste', ano: 2023 },
// ];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [VeiculoService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'];
  //dataSource = ELEMENT_DATA;
  dataSource!: Veiculo[];

  constructor(
    public dialog: MatDialog,
    public veiculoService: VeiculoService
  ) {
    this.veiculoService.getElements()
      .subscribe((data: Veiculo[]) => {
        this.dataSource = data;
        console.log("Dados a mostrar: ",data);
      });

  }

  ngOnInit(): void {

  }

  openDialog(element: Veiculo | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      // (id, placa, chassi, renavam, modelo, marca, ano)
      data: element === null ? {
        id: null,
        placa: '',
        chassi: null,
        renavam: '',
        modelo: '',
        marca: '',
        ano: ''


      } : {
        id: element.id,
        placa: element.placa,
        chassi: element.chassi,
        renavam: element.renavam,
        modelo: element.modelo,
        marca: element.marca,
        ano: element.ano
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editElement(element: Veiculo): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }
}
export { Veiculo };

