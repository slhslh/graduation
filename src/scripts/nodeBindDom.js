define('scripts/Node2Dom', ['kit', 'scripts/config'], function(kit, config){

	class Node2Dom{
		// 输入的只是单个图形节点或者组节点（暂不实现）
		constructor(op){
			this.wrap = [];
			this._init(op);
		}

		_init(op){
			let self = this;
			self.wrap = self.formateAttr(op, op);
		}

		formateAttr(op, root){
			let self = this;
			let wrap = [];
			kit.each(op, (item, i)=>{
				if(!self.isInAttr(config.styleConfig, i) ){
					return;
				}
				// if(kit.typeOf(op[i]) === 'object'){
					let dWrap = [];
					wrap.push(dWrap);
					if(kit.typeOf(item) !== 'object' && kit.typeOf(item) !== 'array'){
						let ID = kit.getRandomStr(24);

						// 此处用于生成输入框相关节点的属性，由于输入框需要有label等标签的配合，因此
						dWrap.type = 'div';
						dWrap.class = [];
						dWrap.name = 'inpContainer';

						let lWrap = {};
						lWrap.type = 'label';
						lWrap.class = [];
						lWrap.for = ID;
						lWrap.value = i;


						let tWrap = {};
						tWrap.type = 'input';
						tWrap.class = [];
						tWrap.id = ID;
						tWrap.name = op.name;
						tWrap.parentRef = op;
						tWrap.value = item
						tWrap.event = {
							focus: ((op,i, wrap, root) => {
								return (e) => {
									// let value = wrap.value;
									window.timer = setInterval(() => {
										let tar = e.target
										if((wrap.value != tar.value )&& tar.value!== undefined){
											op[i] = kit.parseData(tar.value);
											wrap.value = kit.parseData(tar.value);
											root.updateStyle();
										} else {
											return;
										}
									}, 0)
								}
							})(op,i, tWrap, root)
							, blur: () => {
								clearInterval(window.timer);
								window.timer = null;
							}
						}

						dWrap.childs = [lWrap, tWrap];

					} else {
						dWrap.type = 'div';
						dWrap.name = 'outerContainer';
						dWrap.class = [];

						let lWrap = {};
						lWrap.type = 'label';
						lWrap.name = 'name';
						lWrap.value = i;
						lWrap.class = [];

						let tWrap = {};
						tWrap.type = 'div';
						tWrap.class = [];
						tWrap.name = 'innerContainer';
						tWrap.childs = [];

						tWrap.childs = self.formateAttr(item, root);

						dWrap.childs = [lWrap, tWrap];

					}
				// }
			})

			return wrap;
		}

		isInAttr(origin, target){
			return origin[target] ? true : false ;
		}

	}

	return Node2Dom;
});