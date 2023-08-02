interface Human {
    HName: string;
    display(): void;
}

interface Person {
    PMob: number;
    setGrade(): string;
}

class Student implements Human, Person {
    HName: string;
    PMob: number;
    SCode: number;

    constructor(name: string, mob: number, code: number) {
        this.HName = name;
        this.PMob = mob;
        this.SCode = code;
    }

    setGrade(): string {
        return 'A+';
    }

    display(): void {
        console.log(this.HName, this.PMob, this.SCode);
    }
}

const s1: Student = new Student('Ria', 7823759274, 10);
s1.display();
console.log(s1.setGrade());

// const s2: Student = s1;
// s2.SName = 'Anu';
// s2.display()
