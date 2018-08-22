import { NgModule } from '@angular/core';
//导入路由模块
import { RouterModule, Routes} from '@angular/router' 
//导入路由用到的模块
import { HeroesComponent } from './heroes/heroes.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

//定义路由
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent},
  //冒号（：）代表一个占位符
  { path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  //导入
  imports: [ RouterModule.forRoot(routes) ],
  //导出
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
