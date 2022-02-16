class Base {
    id;
    name;
}

Base.prototype.attributeType = 'BAS';

class Extend1 extends Base {}

Extend1.prototype.attributeType = 'SAB';

const base = new Base();
console.log(Base.prototype.attributeType);
console.log(base.prototype.attributeType);

const extend1 = new Extend1();
console.log(Extend1.prototype.attributeType);
console.log(extend1.prototype.attributeType);