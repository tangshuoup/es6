'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//let 声明的变量只块级作用域内生效，
var a = [];

var _loop = function _loop(i) {
	a[i] = function () {
		console.log(i);
	};
};

for (var i = 0; i < 10; i++) {
	_loop(i);
}
a[6](); // 输出6


// let 不存在变量提升
//console.log(bar) //报错
var bar = 2;

// 如果区块中存在let 和 const，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
//凡是在声明之前使用这些变量，就会报错。称为‘暂时性死区’
var tmp = 123;
if (true) {
	//tmp = 'adc'; //报错
	var _tmp = void 0;
}
// let 不允许在相同作用域内，重复声明同一个变量。
//报错
// function () {
// 	let a=10;
// 	let a=1;
// }

// let实际上为js新增了块级作用域。可以防止var的内层变量覆盖外层变量以及
//循环变量泄露为全局变量

function f1() {
	var n = 5;
	if (true) {
		var _n = 10;
	}
	console.log(n); //5
}
f1();

/* const 命令 */

// const 声明一个只读的常量。一旦声明，常量的值不能改变，同样存在常量不提升
//以及暂时性死区

var PI = 3.1415;
//PI //3.1415
//PI =3 // 报错


// const 实际保证的，并不是变量的值不得改变，而是变量指向的那个内存地址不得改动。

var foo = {};

foo.prop = 123;
console.log(foo.prop);

//foo= {} //报错


/* 变量的解构赋值 */

/* 数组的解构赋值 */
{
	var _a = 1,
	    _b = 2,
	    _c = 3;

	console.log(_a, _b, _c); //123

	var _foo = 1,
	    _bar = 2,
	    baz = 3;

	console.log(_foo, _bar, baz);

	var _ref = [1, 2, 3],
	    x = _ref[0],
	    y = _ref[2];

	console.log(x, y); //1,3

	var head = 1,
	    tail = [2, 3, 4];

	console.log(head, tail); //1,[2,3,4]

	var _ref2 = ['a'],
	    g = _ref2[0],
	    h = _ref2[1],
	    j = _ref2.slice(2);

	console.log(g, h, j); //'a',undefined,[]
	//如果结构不成功，变量就是undefined.不完全解构一样可以成功

	var _undefined = undefined,
	    t = _undefined === undefined ? 1 : _undefined;

	console.log(t); //1

	var _ref3 = null,
	    r = _ref3 === undefined ? 1 : _ref3;

	console.log(r); //null
	//如果一个数组成员不严格等于undefined，默认值不会生效
}
/* 对象的解构赋值*/
{
	var _foo$bar = { foo: 'aaa', bar: 'bbb' },
	    _foo2 = _foo$bar.foo,
	    _bar2 = _foo$bar.bar;

	console.log(_foo2, _bar2); //'aaa','bbb'

	var obj = {
		p: ['Hello', { y: 'World' }]
	};

	var _obj$p = _slicedToArray(obj.p, 2),
	    _x = _obj$p[0],
	    _y = _obj$p[1].y;

	console.log(_x, _y); //'Hello ,World'

	var node = {
		loc: {
			start: {
				line: 1,
				column: 5
			}
		}
	};

	var loc = node.loc,
	    start = node.loc.start,
	    line = node.loc.start.line;

	console.log(loc, start, line);

	//遍历Map结构

	var map = new Map();
	map.set('first', 'hello');
	map.set('second', 'world');

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _step$value = _slicedToArray(_step.value, 2),
			    key = _step$value[0],
			    value = _step$value[1];

			console.log(key + 'is' + value);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _step2$value = _slicedToArray(_step2.value, 1),
			    key = _step2$value[0];

			console.log(key);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _step3$value = _slicedToArray(_step3.value, 2),
			    value = _step3$value[1];

			console.log(value);
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}
}

/*函数的扩展*/

{
	//1.函数参数的默认值

	var log = function log(x) {
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'World';

		console.log(x, y);
	};

	//Hello

	// 扩展运算符...
	var add = function add(x, y) {
		return x + y;
	};

	//对象的扩展

	var f = function f(x, y) {
		return { x: x, y: y };
	};

	log('Hello'); //Hello Word
	log('Hello', 'china'); //Hellp China
	log('Hello', '');
	var numbers = [4, 38];
	console.log(add.apply(undefined, numbers)); //42

	console.log(Math.max.apply(Math, [14, 3, 77]));
	console.log(f(1, 2));

	var birth = '1995/01/18';
	var Person = {
		name: '张三',
		birth: birth,
		hello: function hello() {
			console.log('我的生日是', this.birth);
		}
	};
	Person.hello();
}
/*  symbol javascript的第七种数据类型表示独一无二的值*/
{
	var s = Symbol();
	console.log(typeof s === 'undefined' ? 'undefined' : _typeof(s));

	var s1 = Symbol('foo');
	var s2 = Symbol('bar');
	console.log(s1.toString(), s2.toString());

	var _obj = {
		toString: function toString() {
			return 'abc';
		}
	};
	var sym = Symbol(_obj);
	console.log(sym);

	//Symbol 值不能与其他类型的值进行运算，会报错
	//var sym =Symbol('My symbol');
	//console.log(`your symbol is ${sym}`);

	/* 作为属性名的Symbol 可以保证不会出现同名的属性*/

	var mySymbol = Symbol();

	var a = {},
	    b = {},
	    c = {};
	a[mySymbol] = 'Hello!';

	var b = _defineProperty({}, mySymbol, 'Hello!');

	Object.defineProperty(c, mySymbol, { value: 'Hello!' });
	console.log(a[mySymbol], b[mySymbol], c[mySymbol]);
}

{
	/* Set */
	// set 本身是一个构造函数，用来生成数据结构，set结构不会添加重复的值

	var _s = new Set();
	[2, 3, 4, 5, 2, 2].forEach(function (x) {
		return _s.add(x);
	});

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = _s[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var i = _step4.value;

			console.log(i);
		}
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

	var set = new Set([1, 2, 3, 4, 4]);
	console.log([].concat(_toConsumableArray(set)));

	var array = [1, 2, 3, 3, 4, 4, 5, 5];
	console.log([].concat(_toConsumableArray(new Set(array)))); //可以去除数组中的重复成员

	var items = new Set([1, 2, 3, 4, 5, 5, 5]);
	console.log(items.size);

	var _a2 = new Set();
	_a2.add(1).add(2).add(2);
	console.log(_a2);
	console.log(_a2.has(1), _a2.has(2));
	_s.delete(2);
	console.log(_s.has(2));

	var set1 = new Set(['red', 'green', 'blue']);
	//entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，
	//它的两个成员完全相等
	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = set1.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var item = _step5.value;

			console.log(item);
		}
		//set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}

	set.forEach(function (value, key) {
		console.log(value * 2);
	});
}
