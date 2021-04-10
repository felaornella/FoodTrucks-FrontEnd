import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foodtruck } from '../model/foodtruck';
import { NewfoodtruckComponent } from '../components/newfoodtruck/newfoodtruck.component';

@Injectable({
  providedIn: 'root',
})
export class FoodtruckService {
  elEstado: string;
  constructor(private http: HttpClient, private router: Router) {}

  createFoodtruck(ft: NgForm): String {
    let id = sessionStorage.getItem('id');
    let dueñoID = { id: `${id}` };
    let ftruck = {
      nombre: ft.value.nombre,
      tipo_servicio: ft.value.tipo_servicio,
      descripcion: ft.value.descripcion,
      url: ft.value.url,
      instagram: ft.value.instagram,
      facebook: ft.value.facebook,
      whatsapp: ft.value.whatsapp,
      dueno: dueñoID,
    };
    this.http.post<any>(`${environment.url}/foodtruck`, ftruck).subscribe(
      (response) => {
        this.elEstado = 'Exito';
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
        this.elEstado = 'Fallido';
      }
    );
    return this.elEstado;
  }

  deleteFoodtruck(idFt: string): Observable<Object> {
    return this.http.delete(`${environment.url}/foodtruck/${idFt}`);
  }

  getFoodtrucks(): Observable<Foodtruck[]> {
    let id = sessionStorage.getItem('id');
    return this.http.get<Foodtruck[]>(`${environment.url}/foodtruck/${id}`);
  }

  recuperarData(): Observable<Foodtruck> {
    let id = sessionStorage.getItem('idFt');
    return this.http
      .get<Foodtruck>(`${environment.url}/foodtruck/recuperarIndividual/${id}`);
  }
  
  updateFt(ft: NgForm): Observable<Foodtruck>{
    let id = sessionStorage.getItem('idFt');

    let idO = sessionStorage.getItem('id');
    let dueñoID = { id: `${idO}` };
    let ftruck = {
      nombre: ft.value.nombre,
      tipo_servicio: ft.value.tipo_servicio,
      descripcion: ft.value.descripcion,
      url: ft.value.url,
      instagram: ft.value.instagram,
      facebook: ft.value.facebook,
      whatsapp: ft.value.whatsapp,
      dueno: dueñoID,
    };
    return this.http.put<Foodtruck>(
        `${environment.url}/foodtruck/${id}`,
        ftruck,
        {
          headers: { token: '1123456' },
        }
      );
  }

  topFoodtrucks(): Observable<Foodtruck[]>{
    return this.http.get<Foodtruck[]>(`${environment.url}/foodtruck/topFoodtrucks`)
  }

  /*
  DEBERIA ANDAR PERO ALGO RARO PASA CON ECLIPSE O ACA, NO SE

  addPic(form: NgForm, base64textString): Observable<Foodtruck> {
    let picBody = base64textString[0];
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Foodtruck>(
      `${environment.url}/usuario/pruebaImagen/1`,
      picBody.toString(),requestOptions
    );
  }
  */

}
