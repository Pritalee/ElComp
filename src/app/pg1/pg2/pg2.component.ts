import { Component, OnInit, Input, OnChanges, SimpleChanges, Output ,EventEmitter} from '@angular/core';
import {Data} from "../data.model";
//import{NgbdModalBasic} from '../modal-basic';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PgService } from '../../pg.service';
import { Observable } from '../../../../node_modules/rxjs';
import {str} from "../../str.model"

@Component({
  selector: 'app-pg2',
  templateUrl: './pg2.component.html',
  styleUrls: ['./pg2.component.css']
})
export class Pg2Component implements OnChanges{

  str:any;
  cars: any;
 
  

  constructor(private modalService: NgbModal,
              private pg:PgService) { }

  @Input() val:string;
  //@Output() iValid=new EventEmitter<boolean>();
  valid=false;
  vi=false;
   /*
  key:any;
  p3=false;
  h1:any;
   */ 
  ngOnInit() {
  
    
  }

  ngOnChanges(changes:SimpleChanges){
    for(let property in changes){
      if(property==='val'){
        this.val=changes[property].currentValue;
        console.log("transfer",this.val);
      }
    }
  } 

  /*sear(vall:string){
    this.str=vall;

    }
*/
  getCars(): void {
   this.pg.getAll().subscribe(
      (res: any) => {
        this.cars=Object.keys(res).map(key=>res[key]);
        //this.key=this.pg.keys;
        //console.log(this.key);

        console.log(this.cars);
        
        
        //var i=0
        //for (var obj in res){
          //  console.log(obj)
            //console.log(res[obj][0]['name'])
        //}
        //console.log(this.cars)
        //console.log(res);
       
      }
    );
    
      
    //console.log(str);
  }

  back(){
    this.valid=true;
  }

  view(){
    this.vi=true;
  }
/*  open(h){
    //this.pg.getmodal(h);
    console.log(h);
    this.pa=true;
   
  } */

  /*HEROES = [
    {id: 1, name:'Samsung j7',price:20000,rating:'3.5*',image:'https://images.samsung.com/is/image/samsung/in-galaxy-j7-2016-j710fn-sm-j710fzduins-000000001-front-gold?$PD_GALLERY_JPG$'},
    {id: 2, name:'Iphone X',price:80000,rating:'5*',image:'https://www.91-img.com/pictures/121008-v1-apple-iphone-x-mobile-phone-large-1.jpg'},
    {id: 3, name:'One Plus 6',price:40000,rating:'4.5*',image:'https://img.staticbg.com/thumb/large/oaupload/banggood/images/33/72/eef5b9de-49e5-4981-b8e2-293108980727.jpg'},
    {id: 4, name:'Redmi',price:10000,rating:'3*',image:'https://st1.bgr.in/wp-content/uploads/2015/11/244f2657af1485f87a059801ed105c1b_375x500_1.jpg'},
    {id: 5, name:'Nexus',price:50000,rating:'4*',image:'https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nexus-6p/img/nexus-intro-phone-1.png'}
];*/

closeResult: string;


open(content) {
  //console.log("h is-",content);
  this.vi=true;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
 


}
