import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  acerts:number=0;
  tempo:number=3;
  mov:number=0;
  tds:number=0;
  r1:number=0;
  r2:number=0;

  tD1:any;
  tD2:any;

  arrNumeros:number[]= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].sort( ()=> Math.random()-0.5 );
  arrBotones:HTMLElement[]=[];

  timer:boolean=false;
  reset:boolean= false;

  //referencia a los botones
  @ViewChild('b1') t1!:ElementRef;
  @ViewChild('b2') t2!:ElementRef;
  @ViewChild('b3') t3!:ElementRef;
  @ViewChild('b4') t4!:ElementRef;
  @ViewChild('b5') t5!:ElementRef;
  @ViewChild('b6') t6!:ElementRef;
  @ViewChild('b7') t7!:ElementRef;
  @ViewChild('b8') t8!:ElementRef;
  @ViewChild('b9') t9!:ElementRef;
  @ViewChild('b10') t10!:ElementRef;
  @ViewChild('b11') t11!:ElementRef;
  @ViewChild('b12') t12!:ElementRef;
  @ViewChild('b13') t13!:ElementRef;
  @ViewChild('b14') t14!:ElementRef;
  @ViewChild('b15') t15!:ElementRef;
  @ViewChild('b16') t16!:ElementRef;

  tarjeta1!:HTMLElement;
  tarjeta2!:HTMLElement;
  tarjeta3!:HTMLElement;
  tarjeta4!:HTMLElement;
  tarjeta5!:HTMLElement;
  tarjeta6!:HTMLElement;
  tarjeta7!:HTMLElement;
  tarjeta8!:HTMLElement;
  tarjeta9!:HTMLElement;
  tarjeta10!:HTMLElement;
  tarjeta11!:HTMLElement;
  tarjeta12!:HTMLElement;
  tarjeta13!:HTMLElement;
  tarjeta14!:HTMLElement;
  tarjeta15!:HTMLElement;
  tarjeta16!:HTMLElement;

  constructor( private render2:Renderer2) {    
  }

  ngAfterViewInit(): void {    
    this.tarjeta1= this.t1.nativeElement;
    this.tarjeta2= this.t2.nativeElement;
    this.tarjeta3= this.t3.nativeElement;
    this.tarjeta4= this.t4.nativeElement;
    this.tarjeta5= this.t5.nativeElement;
    this.tarjeta6= this.t6.nativeElement;
    this.tarjeta7= this.t7.nativeElement;
    this.tarjeta8= this.t8.nativeElement;
    this.tarjeta9= this.t9.nativeElement;
    this.tarjeta10= this.t10.nativeElement;
    this.tarjeta11= this.t11.nativeElement;
    this.tarjeta12= this.t12.nativeElement;
    this.tarjeta13= this.t13.nativeElement;
    this.tarjeta14= this.t14.nativeElement;
    this.tarjeta15= this.t15.nativeElement;
    this.tarjeta16= this.t16.nativeElement;

    this.arrBotones.push( this.tarjeta1, this.tarjeta2, this.tarjeta3, this.tarjeta4, this.tarjeta5, this.tarjeta6, this.tarjeta7, 
      this.tarjeta8, this.tarjeta9, this.tarjeta10, this.tarjeta11, this.tarjeta12, this.tarjeta13, this.tarjeta14, this.tarjeta15,
      this.tarjeta16 );

      console.log(this.arrNumeros);      
  }

  timerCount(){
    let countTimer = setInterval(()=>{
      this.tempo--;
      if (this.tempo == 0) {
        clearInterval(countTimer);
        this.gameOver();
      }
    },1000)
  }  

  flip(id:number){
    if (this.timer == false) {
      this.timerCount();
      this.timer=true;
    }

    this.tds++;
    console.log(this.tds);    
    const value:string= this.arrNumeros[id].toString();
    
    if (this.tds == 1) {
      this.tD1 = this.arrBotones[id];    
      this.r1= this.arrNumeros[id];
      this.render2.setAttribute( this.tD1, 'value', value);
      this.render2.setAttribute( this.tD1, 'disabled', 'true');  
    }else if( this.tds == 2 ){
      this.tD2 = this.arrBotones[id];    
      this.r2= this.arrNumeros[id];
      this.render2.setAttribute( this.tD2, 'value', value);
      this.render2.setAttribute( this.tD2, 'disabled', 'true');
      this.mov++;
      this.tds=0;
      console.log('ha destapado 2 tarjetas -> ',this.tds);
      
      if (this.r1 == this.r2) {        
        this.acerts++;
        console.log('tarjetas iguales han sido deshabilitadas');
        setTimeout(()=>{
          if (this.acerts == 8 ) {
            alert('win');
          }
        }, 500);
      }else{
          console.log('tarjetas distintas', this.r1, 'y', this.r2);
          
          let distintas=setTimeout( ()=>{
            this.render2.setAttribute( this.tD1, 'value', '');
            this.render2.setAttribute( this.tD2, 'value', '');
            this.tD1.disabled=false;
            this.tD2.disabled=false;
            // this.render2.setAttribute( this.tD1, 'disabled', 'false');
            // this.render2.setAttribute( this.tD2, 'disabled', 'false');
          },800)
      }
    }
  }

  gameOver(){
    let cont = 0;    
    while (cont <= 15) {
      this.tD1 = this.arrBotones[cont];    
      this.r1= this.arrNumeros[cont];
      const value:string= this.arrNumeros[cont].toString();
      this.render2.setAttribute( this.tD1, 'value', value);
      this.render2.setStyle( this.tD1, 'background-color', 'red');
      this.render2.setAttribute( this.tD1, 'disabled', 'true');
      cont++;
    }    
    setTimeout(() => {
      this.reset= confirm('game over');
      if(this.reset){
        console.log('reiniciar');
        this.resetGame();
      }
    }, 300);
  }

  resetGame(){
      let cont = 0;    
      while (cont <= 15) {
        this.tD1 = this.arrBotones[cont];    
        this.r1= this.arrNumeros[cont];
        const value:string= this.arrNumeros[cont].toString();
        this.render2.setAttribute( this.tD1, 'value', '');
        this.render2.setStyle( this.tD1, 'background-color', 'green');
        this.tD1.disabled=false;
        cont++;
      }
      this.acerts=0;
      this.tempo=3;
      this.mov=0;
      this.tds=0;
      this.timer=false;
  }

}
