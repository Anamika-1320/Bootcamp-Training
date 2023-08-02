class Human {
    HName: string;
    constructor(name: string) {
        this.HName = name;
    }
    display(): void {
        console.log(this.HName);
    }
}

class Person extends Human {
    PMob: number
    constructor(name: string, mob: number) {
        super(name);
        this.PMob = mob;
    }

    display(): void {
        super.display()
        console.log(this.PMob);
    }
}

class Student extends Person {
    SCode: number;
    constructor(name: string, mob: number, code: number) {
        super(name, mob)
        this.SCode = code;
    }

    setGrade(): string {
        return 'A+';
    }

    display(): void {
        super.display();
        console.log(this.SCode);
    }
}

const s1: Student = new Student('Ria', 7823759274, 10);
s1.display();
console.log(s1.setGrade());

const p1: Person = new Student('Ria', 7823759274, 10);
p1.display();

// const s2: Student = s1;
// s2.SName = 'Anu';
// s2.display()
