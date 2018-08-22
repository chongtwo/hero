import { Component, OnInit, Input } from '@angular/core';
//支持路由所需的包
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//其他需要用到的自定义包
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //如果有其他组件绑定该属性，则
  // @Input() hero: Hero;
  //没有其他组件绑定，则
  hero: Hero;


  //注入构造函数，保存为私有变量
  constructor(
    //保存路由信息，获取其中的变量如id
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    this.heroService.updateHero(this.hero)
      .subscribe(()=>this.goBack())
  }

}
