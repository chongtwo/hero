import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //定义属性
  messages: string[] = [];

  //删除constructor

  //定义add方法
  add(message: string){
    this.messages.push(message);
  }

  //定义clear方法
  clear(){
    this.messages = [];
  }
}
