import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homefoodtrucker, ngbd-dropdown-basic, ngbd-carousel-pause, ngbd-nav-markup',
  templateUrl: './homefoodtrucker.component.html',
  styleUrls: ['./homefoodtrucker.component.css'],
  styles: [`
    .botonNav:hover {
      background-color: #ffffff88;
    }
  `]
})
export class HomefoodtruckerComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  url_home: String;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  prueba = [1,2,3];
  //aca van los string en base64 con "data:image/png;base64," delante 
  //images=[]; 
  //aca van los nombres de los ft
  ft = ["Mollys","Barfuss","Prueba","Antares","Peñon","Baum","Sale con Pan"];
  //aca van los puntajes de los ft
  puntajes = [2700,2500,2000,1980,1900,1800,1780,1750];

  constructor(private userService: UsuarioserviceService,
              private router: Router,
              private ftService: FoodtruckService,) {}

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngOnInit(): void {
    this.user_username="felaornella" //tempFela this.user_username = sessionStorage.getItem('username');
    this.user_tipo="FoodTrucker"  //tempFela this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.url_home="home-" + this.user_tipo.toLowerCase();
  }

  logOut() {
    this.userService.logOut();
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.images.push('data:image/png;base64,' + btoa(e.target.result));
  }

  /*

  METODOS DE PRUEBA PARA EL ENVIO DE IMAGENES EN BASE64, TODAVIA NO ANDA

  onSubmit(login: NgForm) {
    this.change=true;
    this.code=btoa(login.value.image);
    this.ftService.addPic(login,this.base64textString).subscribe(
      (usuario) => {
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
      }
    );
  }

  decodeM(){
    this.decode=true;
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }*/

}
