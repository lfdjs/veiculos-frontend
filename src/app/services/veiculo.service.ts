import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/Veiculo';

@Injectable()
export class VeiculoService {
    elementApiUrl = 'http://localhost:3333/api/veiculos';
    constructor(private http: HttpClient) { }

    getElements(): Observable<Veiculo[]> {
        return this.http.get<Veiculo[]>(this.elementApiUrl);
    }

}