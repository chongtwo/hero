import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Observable, Subject } from 'rxjs';
import { HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // $符号表示该属性是一个observable对象
  heroes$: Observable<Hero[]>;
  // Subject是rxjs中的符号，即是observable的数据源，又是一个observable对象，有next()方法
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // 每次输入框内有值键入，就会调用此函数，每次都会塞给searchTerms
  search(term: string):void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
