'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
	/* js生成实例对象的传统方法通过构造函数 */

	var co = function co() {
		this.p = '123';
		this.alertp = function () {
			alert(this.p);
		};
	};

	var o2 = new co();

	/* 在new的时候调用了一个构造函数*/
	var obj = {}; //创建一个空对象
	obj.__proto__ = co.prototype; //将这个空对象的__proto__成员指向构造函数对象的prototype成员对象，
	co.call(obj); //将构造函数的作用域赋给新对象，ca函数中this指向obj,
	//return obj; //返回新对象

	/*  class  */

	/*定义类,可以看出里面有一个 constructor方法，
 这就是构造方法，this关键字则代表实例对象。
 也就数说，es5的构造函数point,对应es6的point类的构造方法。
 point类除了构造方法，还定义了一个toString方法。
 注意，定义类的方法的时候，前面不需要加上function关键字，
 直接把函数定义放进去就可以了。另外，方法之间不能加逗号*/

	var Point = function () {
		function Point(x, y) {
			_classCallCheck(this, Point);

			this.x = x;
			this.y = y;
		}

		_createClass(Point, [{
			key: 'toString',
			value: function toString() {
				return '(' + this.x + ',' + this.y + ')';
			}
		}]);

		return Point;
	}();
	//等同于


	Point.prototype = {
		constructor: function constructor() {},
		toString: function toString() {}
	}; //在类的实例上调用方法，其实就是调用原型上的方法。
	/*  es6的类，完全可以看作构造函数的另一种写法。 */

	console.log(typeof Point === 'undefined' ? 'undefined' : _typeof(Point));
	console.log(Point === Point.prototype.constructor);
	/* 上面的代码表明。类的数据类型就是函数，类的本身就指向构造函数 */

	var b = new Point('1', '2');
	console.log(b.toString());
	console.log(b.constructor === Point.prototype.constructor);
	/*上面代码中，b是Point类的实例，它的constructor方法就是Point类原型的constructor方法*/
}