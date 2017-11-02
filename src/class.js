{
	/* js生成实例对象的传统方法通过构造函数 */

	function co (){
		this.p='123';
		this.alertp= function(){
			alert(this.p);
		}
	}
	var o2 = new co();

	/* 在new的时候调用了一个构造函数*/
	var obj={};//创建一个空对象
	obj.__proto__=co.prototype;//将这个空对象的__proto__成员指向构造函数对象的prototype成员对象，
	co.call(obj);//将构造函数的作用域赋给新对象，ca函数中this指向obj,
	//return obj; //返回新对象

	/*  class  */


	/*定义类,可以看出里面有一个 constructor方法，
	这就是构造方法，this关键字则代表实例对象。
	也就数说，es5的构造函数point,对应es6的point类的构造方法。
	point类除了构造方法，还定义了一个toString方法。
	注意，定义类的方法的时候，前面不需要加上function关键字，
	直接把函数定义放进去就可以了。另外，方法之间不能加逗号*/
	class Point{
		constructor(x,y){
			this.x=x;
			this.y=y;
		}

		toString(){
			return '('+this.x+','+this.y+')';
		}
	}
	//等同于
	Point.prototype={
		constructor(){},
		toString(){},
	}; //在类的实例上调用方法，其实就是调用原型上的方法。
	/*  es6的类，完全可以看作构造函数的另一种写法。 */

	console.log(typeof Point);
	console.log(Point===Point.prototype.constructor);
	/* 上面的代码表明。类的数据类型就是函数，类的本身就指向构造函数 */

	var b=new Point('1','2');
	console.log(b.toString());
	console.log(b.constructor === Point.prototype.constructor);
	/*上面代码中，b是Point类的实例，它的constructor方法就是Point类原型的constructor方法*/
}
{
	/* class的继承 
		class可以通过extends关键字实现继承，这比es5的通过修改原型链实现继承，要清晰和方便很多*/

		class Point{

		}
		class ColorPoint extends Point{
			constructor(x,y,corlor){
				super(x,y);
				this.color=color;
			}
			toString(){
				return this.color+''+super.toString();//调用父类的toString()
			}
		}
		/* 上面代码定义一个ColorPoint类，该类extends关键字，继承了Point类的
		所有的属性和方法。constructor和toString方法中都出现了super关键字，他在这里表示父类的构造函数
		用来新建父类的this的对象 */
		/* ES5的继承，实质是先创造子类的实例对象this,然后再将父类的方法添加到this上面(Parent.apply(this))
		es6的继承机制完全不同，实质是先创造父类的实例对象this(所以必须先调用super方法)，然后再用子类的
		构造函数修改this*/


		class ColorPoint1 extends Point{

		}
		//等同于
		class ColorPoint1 extends Point{
			constructor(...args){
				super(...args);
			}
		}
		/* 上面代码中，在子类的构造函数中，只有调用super之后，才可以使用
		this关键字，否则会报错，这是因为子类实例的构建，是基于对父类实例加工，只有super方法
		才能返回父类实例*/
}