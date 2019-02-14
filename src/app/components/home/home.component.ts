import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  nuevasCanciones:any[] = [];
  loading:boolean;
  error:boolean;
  mensajeError:string;

  constructor(private spotify:SpotifyService) { 
    this.loading = true;
    this.error = false;
  	this.spotify.getNewReleases().subscribe((data:any)=>{

  		this.nuevasCanciones =data;
  		this.loading = false;
  	},(error)=>{

      this.spotify.GetToken().subscribe((data:string)=>{
        console.log(data);
        localStorage.setItem('spoti', data);
      });


      console.log(error.error.error.message);
      this.mensajeError = error.error.error.message;
      this.error = true;
      this.loading = false;

    });

  	
  }

  ngOnInit() {
  }

}
