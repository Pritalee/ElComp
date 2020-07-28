export class Data{
    public name:string;
    public price:number;
    public rating:string;
    public company:string;
    public color:string;
    public space:string

    constructor(name:string,color:string,space:string,price:number,rating:string,company:string){
        
        this.name=name;
        this.color=color;
        this.space=space;
        this.price=price;
        this.rating=rating;
        this.company=company
    
    }
}