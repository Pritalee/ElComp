import { BehaviorSubject,Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Data} from "../app/pg1/data.model"
import{map, catchError} from 'rxjs/operators'
import { Injectable } from "../../node_modules/@angular/core";
import { str } from "./str.model";


@Injectable()
export class PgService{
    ha:any;
    //baseUrl='http://localhost/api';
     mobiles:any;
    //keys:any; 
    /*new Data(1,'Samsung j7',20000,'3.5*','https://images.samsung.com/is/image/samsung/in-galaxy-j7-2016-j710fn-sm-j710fzduins-000000001-front-gold?$PD_GALLERY_JPG$'),
    new Data(2,'Iphone X',80000,'5*','https://www.91-img.com/pictures/121008-v1-apple-iphone-x-mobile-phone-large-1.jpg'),
    new Data(3,'One Plus 6',40000,'4.5*','https://img.staticbg.com/thumb/large/oaupload/banggood/images/33/72/eef5b9de-49e5-4981-b8e2-293108980727.jpg'),
    new Data(4,'Redmi',10000,'3*','https://st1.bgr.in/wp-content/uploads/2015/11/244f2657af1485f87a059801ed105c1b_375x500_1.jpg')
    */
    constructor(private http:HttpClient){}
  
    getAll():Observable<any>{
        /*this.http.get('http://localhost/docs/trial.php').pipe(
            map((res)=>{
                var a=res['status'];
                console.log(a);
            })
        );*/
        return this.http.get('http://localhost/api/list.php').pipe(
            map((res)=>{
                this.mobiles=res['data']
                //this.keys=res['keys']
                

                //console.log(this.mobiles)   
                //console.log(this.keys)
                 return this.mobiles
            })
        )
      }
/**private handleError(error:HttpErrorResponse){
    console.log(error);
    return throwError('Error!something went wrong');
}


 private val = new BehaviorSubject<string>;
 value=this.val.asObservable();
 
    
 getid(id: string){
    this.val.next(id);
 }
 private val:string='foo';
 public val1 = new BehaviorSubject<string>(this.val);
 getval(): string{
     return this.val;
}
setval(value:string):void{
    this.val=value;
    this.val1.next(this.val);
    console.log(this.val);
    this.getval();
}
**/

getmodal(h){
    this.ha=h;
    console.log("gettting",this.ha);
}

sendmodal(){
    console.log("sending",this.ha);
    return this.ha;
}




getsearch(a){
    
    switch(a){
        case "IPHONE":{
            console.log('hiiii');
            return this.http.get('http://localhost/docs/trialiphone.php')
             
           
            //this.getAll();
            //break;
        }
        case "SAMSUNG":{
            console.log(a);
            return this.http.get('http://localhost/docs/trialsamsung.php')
            //this.getAll();
            //break;
        }
        case "REDMI":{
            console.log(a);
            return this.http.get('http://localhost/docs/trialredmi.php')
          
        }
        case "VIVO":{
            console.log(a);
            return this.http.get('http://localhost/docs/trialvivo.php')
         
        }
        case "OPPO":{
            console.log(a);
            return this.http.get('http://localhost/docs/trialoppo.php')
            
        }
        case "MOTO":{
            console.log(a);
            return this.http.get('http://localhost/docs/trialmoto.php')
          
        }
        case "ASUS":{
            console.log(a);
            return this.http.get('http://localhost/docs/trialasus.php')
          
        }
        case "LENOVO":{
            console.log(a);
            return this.http.get('http://localhost/docs/triallenovo.php')
          
        }
        case "LG":{
            console.log(a);
            return this.http.get('http://localhost/docs/triallg.php')
          
        }
       
    }
       
}

}
