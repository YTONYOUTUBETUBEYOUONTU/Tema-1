/*function createNewPerson(name){
    let obj = {};
    obj.name = name;
    obj.greeting = function(){
        alert('Hello' + this.name);
        console.log("Hello, my name is " + this.name);
    };
    return obj;
}

let person1 = createNewPerson('blue label');
console.log(person1.name);
person1.greeting();*/
/* AQUI ES LO MISMO PERO COMO CONSTRUCTOR
class Person {
    constructor(name) {
        this.name = name;
        this.greeting = function () {
            alert('Hello' + this.name);
        };
    }
}

let person1 = new Person('blue label');
console.log(person1.name);
person1.greeting();
*/

class Person {
    constructor(firstname, lastname, age, gender, interests) {
        this.name = {
            first: firstname,
            last: lastname
        }
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        this.getName = function () { 
        return this.name.first + " " + this.name.last;
        };
        this.bio = function () {
            return `My name is ${this.getName()}, I'm ${this.age} years old, ${this.gender}, and I enjoy ${this.interests[1]}`;
        }
    }

    greeting() {
        alert('Hello ' + this.name.first);
    }
}

let person1 = new Person('blue', 'label', 12, 'male', ['blue', 'label', 'de', 'Johnnie', 'Walker']);
console.log(person1.bio());
person1.greeting();

let person2 = Object.create(person1);

class Professor extends Person {
    teaches;

    constructor(first, last, teaches){
        super(first, last, 45, 'Male', ['Computer Science', 'Mathematics', 'English']);
        this.teaches = teaches;
    }

    teachingBio() {
        return `I am a Professor of ${this.interests[0]} and I teach ${this.teaches[0]}.`;
    }
};

let person4 = new Professor('Black', 'label', 28, 'male', ['Computer Science', 'Mathematics', 'English']);