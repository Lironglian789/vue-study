var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Foo = /** @class */ (function () {
    function Foo() {
        this.prop = '';
    }
    Foo.prototype.func = function () {
    };
    __decorate([
        freeze
    ], Foo.prototype, "prop");
    __decorate([
        emit
    ], Foo.prototype, "func");
    Foo = __decorate([
        log
    ], Foo);
    return Foo;
}());
function log(target) {
    console.log('class decorator', target);
}
/**
 *
 * @param target 类的实例
 * @param key 要装饰的属性
 * @param desc
 */
function freeze(target, key, desc) {
    console.log('prop decorator', target, key, desc);
}
function emit(target, key, desc) {
    console.log('func decorator', target, key, desc);
}
var foo = new Foo();
console.log(foo);
