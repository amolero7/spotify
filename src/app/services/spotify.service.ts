import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


import {map} from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery(query:string){
    /*console.log(localStorage.getItem('spoti'))
    var token = 'bearer '+localStorage.getItem('spoti');
    console.log(token)*/
  	const headers = new HttpHeaders({
  		'Authorization': 'Bearer '+localStorage.getItem('spoti')
  	});
  	const url = `https://api.spotify.com/v1/${query}`;
  	return this.http.get(url,{headers});
  }

  getNewReleases(){
  		return this.getQuery('browse/new-releases?limit=20').pipe(map(data =>data['albums'].items));
  }


  getArtistas(termino:string){

  	return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe(map(data=>data['artists'].items));

  }

  getArtista(id:string){
    return this.getQuery(`artists/${id}`)
      //.pipe(map(data=> data['artists'].items));
    
  }
  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=ES`).pipe(map(data=>data['tracks']));
  }


  GetToken(){
    return this.http.get("https://vrpocr20180219045320.azurewebsites.net/api/GetToken");
  }

}
