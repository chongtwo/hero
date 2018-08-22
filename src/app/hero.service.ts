import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs'; 
//http需要的符号
import { HttpClient,  HttpHeaders } from '@angular/common/http';
//错误处理用到的符号
import { tap, catchError} from 'rxjs/operators';

import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]>{
    // 由tap实现发送消息的功能
    // this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
    //让Observable返回对象经过一个错误处理管道
    .pipe(
        // tap窥探observable对象，并做一些操作，如此处是发送消息
        tap(heroes => this.log(`fetched heroes`)),
        //handleError(操作名，出错时返回的安全值)，详见下列函数定义
        catchError(this.handleError(`getHeroes`, []))
      );
  }

  getHero(id: number): Observable<Hero>{
    // this.messageService.add(`HeroService: fetched hero id=${id}`)
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added hero w/ id =${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number'? hero: hero.id
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).
      pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
