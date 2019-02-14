import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {SpotifyService} from "../../services/spotify.service";
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent  {
	loading:boolean;
	artista:any ={};
	topTracks:any[] =[]; 
  constructor(private router:ActivatedRoute, private spotify:SpotifyService) {
  	this.loading = true;
  	this.router.params.subscribe(params=>{
  		this.getArtista(params['id']);
  		this.getTopTracks(params['id']);
  	})

   }


   getArtista(id:string){
   	this.spotify.getArtista(id).subscribe(data=>{
   		//console.log(data);
   		this.artista = data;
   		this.loading = false;
   	}, (error)=>{
        this.spotify.GetToken().subscribe((data:string)=>{  
          localStorage.setItem('spoti', data);
        });
     });
   }

   getTopTracks(id:string){
   	this.spotify.getTopTracks(id).subscribe((data)=>{
   		this.topTracks = data;
   		console.log(this.topTracks);
   	}, (error)=>{
        this.spotify.GetToken().subscribe((data:string)=>{
          localStorage.setItem('spoti', data);
      });
     });
   	
   }

  
}
