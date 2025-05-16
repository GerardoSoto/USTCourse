class BaseClass{

}

class Book {

    //Solo puede haber un constructor
    constructor(title,price){
        this.title = title;
        this.cost = price; //PRICE is parameter, COST is a property
    }


    borrow(){
        console.log(`${this.title} is borrow`); //String interpolation crea solo un string en memoria, en lugar de usar concatenaciones con multiples strings.
    }

    static rent(){
        //static method can not call non-static members
        //this.borrow();
        console.log(this.title); //won't work
    }
}

class FictionBook extends Book{

    borrow(){//override method
        console.log('override');
        super.borrow(); //call the base method
    }
}

const b1 = new Book("Forza", 100);
const fictionBook = new FictionBook('GTA', 150);

console.log(b1.cost);

b1.borrow();
Book.rent();

console.log(fictionBook.title);
fictionBook.borrow();