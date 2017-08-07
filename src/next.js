{
	// Proxy：在对象之前加一层‘拦截’，外界对该对象的访问都必须通过这层拦截
	//因此提供了一种机制，可以对外界的访问进行过滤和改写
	//let proxy = new Proxy(target,handler);
	//target表示要拦截的对象，handler参数也是一个对象，用来制定拦截行为
	let proxy1 = new Proxy({},{
		//get方法的两个参数分别是目标对象和所要访问的属性
		get(target,property){
			return 35;
		}
	})
	console.log(proxy1.time);

	var target ={};
	//如果handler没有设置任何拦截，那就等同于直接通向原对象
	var hanler ={};
	var proxy2 = new Proxy(target, hanler);
	proxy2.a ='b';
	console.log(target.a);

  	//proxy对象是obj对象原型，obj对象本身没有time属性
  	//所以根据原型链，会在对象上读取该属性，导致被拦截
	let obj =Object.create(proxy1);
	console.log(obj.time);

	var hanler1 = {
		get(target,name){
			if(name === 'prototype') {
				return Object.prototype;
			}
			return 'Hello,'+ name;
		},
		apply(target,thisBinding, args) {
			return args[0];
		},
		construct(target, args) {
			return {value:args[1]};
		}
	};
	var fproxy = new Proxy((x,y)=>{
		return x+y;
	},hanler1);
	console.log(fproxy(1,2),new fproxy(1,2),fproxy.prototype === Object.prototype,fproxy.foo); 

}
{
	//Proxy实例的方法
	var person = {
		name: '张三'
	};
	var proxy = new Proxy(person,{
		get(target,property){
			if(property in target) {
				return target[property];
			} else {
				throw new ReferenceError("Property \"" + property + "\" does not exist.");
			}
		}
	});
	console.log(proxy.name);
	//console.log(proxy.age);//抛出错误

	//实现数组读取负数的索引
	function createArray(...elements) {
		let hanler = {
			get(target,propKey,receiver) {
				let index = Number(propKey);
				if(index < 0) {
					propKey = String(target.length + index);
				}
				return Reflect.get(target, propKey ,receiver);
			}
		};
		let target = [];
		target.push(...elements);
		return new Proxy(target, hanler);
	}
	let arr = createArray('a','b','c');
	console.log(arr[-2]);

	//实现一个生产DOM节点的通用函数dom
	const dom = new Proxy({},{
		get(target,property) {
			return function(attrs = {}, ...children){
				const el =document.createElement(property);
				for(let prop of Object.keys(attrs)) {
					el.setAttribute(prop,attrs[prop]);
				}
				for(let child of children) {
					if(typeof child === 'string') {
						child = document.createTextNode(child);
					}
					el.appendChild(child);
				}
				return el;
			}
		}
	});
	const el = dom.div({class:'123'},
		'Hello, my name is ',
		dom.a({href: '//example.com'}, 'Mark'),
		dom.span({},'. I like:'),
		dom.ul({},
			dom.li({}, 'The web'),
			dom.li({}, 'Food'),
			dom.li({}, '…actually that\'s it')
			)
		);
	document.body.appendChild(el);
}
