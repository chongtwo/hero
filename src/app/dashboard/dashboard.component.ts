import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //定义heroes属性
  heroes: Hero[] = [];

  //在构造函数中定义私有属性heroService
  constructor(private heroService: HeroService) { }

  //在生命钩子中调用取数据方法
  ngOnInit() {
    this.getHeroes();
  }

  //取数据方法的定义
  getHeroes(): void {
    this.heroService.getHeroes().
      //订阅，匿名函数，变量 => 操作
      subscribe(heroes => this.heroes = heroes.slice(1,5))
  }

}
