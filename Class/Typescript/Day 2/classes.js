var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Human = /** @class */ (function () {
    function Human(name) {
        this.HName = name;
    }
    Human.prototype.display = function () {
        console.log(this.HName);
    };
    return Human;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name, mob) {
        var _this = _super.call(this, name) || this;
        _this.PMob = mob;
        return _this;
    }
    Person.prototype.display = function () {
        _super.prototype.display.call(this);
        console.log(this.PMob);
    };
    return Person;
}(Human));
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, mob, code) {
        var _this = _super.call(this, name, mob) || this;
        _this.SCode = code;
        return _this;
    }
    Student.prototype.setGrade = function () {
        return 'A+';
    };
    Student.prototype.display = function () {
        _super.prototype.display.call(this);
        console.log(this.SCode);
    };
    return Student;
}(Person));
var s1 = new Student('Ria', 7823759274, 10);
s1.display();
console.log(s1.setGrade());
var p1 = new Student('Ria', 7823759274, 10);
p1.display();
var h1 = p1;
h1.display();
// const s2: Student = s1;
// s2.SName = 'Anu';
// s2.display()
