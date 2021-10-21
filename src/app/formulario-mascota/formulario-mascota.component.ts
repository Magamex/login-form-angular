import { Component, OnInit } from '@angular/core';
import { Mascota } from "../mascota";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-mascota',
  templateUrl: './formulario-mascota.component.html',
  styleUrls: ['./formulario-mascota.component.css']
})
export class FormularioMascotaComponent implements OnInit {
  // El modelo ligado al formulario, por defecto vacío
  mascotaModel = new Mascota("", "", 0, "");

  adjuntosJson:any = []

  //Config
  private apiURL = "https://reqres.in/api/register";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  adjuntosToJson(event:any){
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        this.toBase64(file)
      }
      this.mascotaModel.adjunto = this.adjuntosJson
  }

  toBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(this.adjuntosJson.push({
        'fileName':`${file.name}`,
        'base64':`${reader.result}`
      }));
      reader.onerror = error => reject(error);
    });
  };

  formularioEnviado(){
    // this.enviarEmpresa(this.mascotaModel)
    this.enviarEmpresa({"email": "eve.holt@reqres.in"})
  }

  enviarEmpresa(objJson:any) {
    this.http.post(this.apiURL, JSON.stringify(objJson), this.httpOptions)
    .subscribe({
        next: data => {
            console.log(data)
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }
}
