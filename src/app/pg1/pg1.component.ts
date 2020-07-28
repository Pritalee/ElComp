import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PgService } from '../pg.service';

@Component({
  selector: 'app-pg1',
  templateUrl: './pg1.component.html',
  styleUrls: ['./pg1.component.css'],
  providers: [PgService]
})
export class Pg1Component implements OnInit {
  cars: any;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private page:PgService) { }
  
  id:string;
  isValid:boolean=false;
  vali:boolean=false;
  ngOnInit() {
  }
 next(event){
   this.isValid=true;
    var target=event.target;
    this.id=target.attributes.id.nodeValue;
    console.log(this.id);
    this.page.getsearch(this.id).subscribe(
      (res)=>{
        console.log(res);
      }
    );
    /*this.page.getAll().subscribe(
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
    
    //this.router.navigate(['page2']);
    //this.page.val1.subscribe(id=>this.id=id);
    //this.page.setval(id);
  */
  }
  bk(event){
    this.vali=event;
    console.log(event);
  } 
}
