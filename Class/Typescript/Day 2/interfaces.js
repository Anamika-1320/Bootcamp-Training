var Student = /** @class */ (function () {
    function Student(name, mob, code) {
        this.HName = name;
        this.PMob = mob;
        this.SCode = code;
    }
    Student.prototype.setGrade = function () {
        return 'A+';
    };
    Student.prototype.display = function () {
        console.log(this.HName, this.PMob, this.SCode);
    };
    return Student;
}());
var s1 = new Student('Ria', 7823759274, 10);
s1.display();
console.log(s1.setGrade());
// const s2: Student = s1;
// s2.SName = 'Anu';
// s2.display()
