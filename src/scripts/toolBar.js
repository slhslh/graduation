/**

{
	rotation:{
		name: 'rotation'
		, type: 'div'
		, class: []
		, events: {
			click: fn
			, mousemove: fn
			, focus: fn
			, blur: fn
		}
		childs: {
			x: {
				...
			}
		}

	}
}

*/

class toolBar{
	constructor(op){
		this.op = op || {}
		this.parseData(op);

	}

	parseData(opt){
		let self = this;
		// let opt = self.op
		let wrap = kit.createNode('div');
		Object.keys(opt).forEach((item, index) => {
			let tar = opt[item]
			let node = kit.createNode(tar.type);
			if(tar.class && tar.calss.length > 0){
				kit.addClass(node, tar.class);
			}
			tar.event && Object.keys(tar.event).forEach((item) => {
				if(!tar.event(item)) return;
				kit.addEvent(node, item, tar.event[item]);
			})

			self.parseData(tar.childs);
			kit.addNode(wrap, node);
		});

		return wrap;
	}
}