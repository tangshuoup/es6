//let 声明的变量只块级作用域内生效，
var a=[];
for (let i =0; i<10; i++) {
	a[i] =function () {
		console.log(i);
	}
}
a[6]();// 输出6


// let 不存在变量提升
//console.log(bar) //报错
let bar =2;

// 如果区块中存在let 和 const，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
//凡是在声明之前使用这些变量，就会报错。称为‘暂时性死区’
var tmp =123;
if(true) {
	//tmp = 'adc'; //报错
	let tmp;
}
// let 不允许在相同作用域内，重复声明同一个变量。
//报错
	// function () {
	// 	let a=10;
	// 	let a=1;
	// }

// let实际上为js新增了块级作用域。可以防止var的内层变量覆盖外层变量以及
//循环变量泄露为全局变量

function f1(){
	let n=5;
	if(true) {
		let n=10
	}
	console.log(n); //5
}
f1();


/* const 命令 */

// const 声明一个只读的常量。一旦声明，常量的值不能改变，同样存在常量不提升
//以及暂时性死区

const PI =3.1415;
//PI //3.1415
//PI =3 // 报错


// const 实际保证的，并不是变量的值不得改变，而是变量指向的那个内存地址不得改动。

const  foo= {};

foo.prop = 123;
console.log(foo.prop);

//foo= {} //报错


/* 变量的解构赋值 */

/* 数组的解构赋值 */
{
	let [a,b,c] = [1,2,3];
	console.log(a,b,c)//123

	let[foo,[[bar],baz]] = [1,[[2],3]];
	console.log(foo,bar,baz);

	let [x, ,y] =[1,2,3];
	console.log(x,y)//1,3

	let[head,...tail] = [1,2,3,4];
	console.log(head,tail);//1,[2,3,4]

	let [g,h,...j] =['a'];
	console.log(g,h,j);//'a',undefined,[]
	//如果结构不成功，变量就是undefined.不完全解构一样可以成功

	let [t=1] =[undefined]
	console.log(t);//1

	let [r=1] =[null];
	console.log(r);//null
	//如果一个数组成员不严格等于undefined，默认值不会生效
}
/* 对象的解构赋值*/
{
	let {foo ,bar} ={foo:'aaa',bar:'bbb'};
	console.log(foo,bar)//'aaa','bbb'

	let obj= {
		p: [
			'Hello',
			{y:'World'}
		]
	};

	let {p:[x,{y}]} =obj;
	console.log(x,y)//'Hello ,World'

	let node = {
		loc: {
			start: {
				line:1,
				column:5
			}
		}
	};

	let {loc, loc: {start}, loc:{start:{line}}} =node;
	console.log(loc,start,line)

	//遍历Map结构

	var map =new Map();
	map.set('first','hello');
	map.set('second', 'world');

	for(let [key,value] of map) {
		console.log(key + 'is' +value);
	}
	for( let[key] of map) {
		console.log(key);
	}
	for(let[,value] of map){
		console.log(value);
	}
}

/*函数的扩展*/

{
	//1.函数参数的默认值

	function log(x, y='World') {
		console.log(x,y)
	}
	log('Hello')//Hello Word
	log('Hello','china')//Hellp China
	log('Hello', '')//Hello

	// 扩展运算符...
	function add(x,y){
		return x+y;
	}
	var numbers = [4,38];
	console.log(add(...numbers))//42

	console.log(Math.max(...[14,3,77]));

	//对象的扩展

	function f(x,y) {
		return {x,y}
	}
	console.log(f(1,2));

	const birth ='1995/01/18';
	const Person = {
		name:'张三',
		birth,
		hello() {
			console.log('我的生日是', this.birth)
		}
	}
	Person.hello();
}
/*  symbol javascript的第七种数据类型表示独一无二的值*/
{
	let s =Symbol();
	console.log(typeof s);

	var s1 =Symbol('foo');
	var s2 =Symbol('bar');
	console.log(s1.toString(),s2.toString());

	const obj={
		toString() {
			return 'abc';
		}
	};
	const sym =Symbol(obj);
	console.log(sym);

	//Symbol 值不能与其他类型的值进行运算，会报错
	//var sym =Symbol('My symbol');
	//console.log(`your symbol is ${sym}`);

	/* 作为属性名的Symbol 可以保证不会出现同名的属性*/

	var mySymbol =Symbol();

	var a = {},
		b = {},
		c = {}
	;
	a[mySymbol] = 'Hello!';

	var b = {
		[mySymbol]: 'Hello!'
	}

	Object.defineProperty(c, mySymbol, {value:'Hello!'});
	console.log(a[mySymbol],b[mySymbol],c[mySymbol]);
}

{
	/* Set */
	// set 本身是一个构造函数，用来生成数据结构，set结构不会添加重复的值

	const s =new Set();
	[2,3,4,5,2,2].forEach(x => s.add(x));

	for(let i of s) {
		console.log(i);
	}
	const set =new Set([1,2,3,4,4]);
	console.log([...set]);

	const array = [1,2,3,3,4,4,5,5,];
	console.log([...new Set(array)]);//可以去除数组中的重复成员

	const items = new Set([1,2,3,4,5,5,5,]);
	console.log(items.size);

	const a =new Set();
	a.add(1).add(2).add(2);
	console.log(a);
	console.log(a.has(1),a.has(2));
	s.delete(2);
	console.log(s.has(2));

	let set1 =new Set(['red','green','blue']);
	//entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，
	//它的两个成员完全相等
	for(let item of set1.entries()){
		console.log(item)
	}
	//set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值

	set.forEach((value,key)=>{
		console.log(value*2);
	})
	// 数组的map 和 filter
	let set2 =new Set([1,2,3]);
	set2 = new Set([...set2].map(x=>x*2));
	console.log(set2);
	let set3 =new Set([1,2,4,6,8])
	set3 = new Set([...set3].filter(x=>(x%2)==0));
	console.log(set3)

	let x = new Set([1,2,3]);
	let y = new Set([4,3,2]);
	//并集
	let union = new Set([...x, ...y]);
	console.log(union);//set{1,2,3,4}
	//交集
	let intersect = new Set([...x].filter(c => y.has(c)));
	console.log(intersect);//set{2,3}
	//差集
	let difference = new Set([...x].filter(x => !y.has(x)));
	console.log(difference);//set{1}
}