import { Component, OnInit } from '@angular/core';
import { Login } from "../interfaces";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as bulmaToast from 'bulma-toast'


@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html'
})
export class FormularioLoginComponent implements OnInit {
  // El modelo ligado al formulario, por defecto vacío
  loginModel = new Login(null, null);

  adjuntosJson:any = []

  //Config
  private apiURL = "https://reqres.in/api/register";

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // adjuntosToJson(event:any){
  //   let files = event.target.files;
  //   for (let i = 0; i < files.length; i++) {
  //     let file = files.item(i);
  //     this.toBase64(file)
  //   }
  //   this.mascotaModel.adjunto = this.adjuntosJson
  // }

  // toBase64(file:any) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(this.adjuntosJson.push({
  //       'fileName':`${file.name}`,
  //       'base64':`${reader.result}`
  //     }));
  //     reader.onerror = error => reject(error);
  //   });
  // };

  formularioEnviado(){
    // this.enviarEmpresa(this.mascotaModel)
    this.enviarEmpresa(this.loginModel)
  }

  enviarEmpresa(objJson:any) {
    this.http.post(this.apiURL, JSON.stringify(objJson), this.httpOptions)
    .subscribe({
        next: data => {
          bulmaToast.toast({
            message: 'Se registro correctamente',
            type: 'is-success',
            position:'bottom-center',
          })
            console.log(data)
        },
        error: error => {
          bulmaToast.toast({
            message: `${error.error.error}`,
            type: 'is-danger',
            position:'bottom-center',
          })
            console.error('There was an error!', error);
        }
    })
  }
}
