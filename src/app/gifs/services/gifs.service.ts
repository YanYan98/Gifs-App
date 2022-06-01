import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsRespond } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apikey: string = '4PV6YlTeL5K91VuuAL9J2Vw2wuH4V1zG';
  private _historial: string[] = [];
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    //Historial persistente
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || '';
  }

  buscarGifs(query: string){
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apikey)
      .set('limit','10')
      .set('q',query);

    this.http.get<SearchGifsRespond>(`${this._servicioURL}/search`,{params})
      .subscribe(resp =>{
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      })
      
  }
}
