(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(50)},22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(15),r=n.n(c),o=(n(22),n(1)),s=n(2),l=n(4),u=n(3),d=n(5),p=(n(23),n(24),n(25),n(26),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"parseSelectedColor",value:function(e){return e.replace("-"," ")}},{key:"renderColorOption",value:function(e,t){var n=this.props,a=n.selectedColor,c=n.onSelection,r="uc-cp-options__item ".concat(e);return e===a&&(r="".concat(r," selected")),i.a.createElement("div",{key:t,className:r,onClick:function(){return c(e)}})}},{key:"render",value:function(){var e=this,t=this.props,n=t.selectedColor,a=t.colors;return i.a.createElement("div",{className:"uc-color-picker"},i.a.createElement("span",{className:"uc-cp__title"}," COLOR: "),i.a.createElement("span",{className:"uc-cp__selection"},this.parseSelectedColor(n)),i.a.createElement("div",{className:"uc-cp-options"},a.map(function(t,n){return e.renderColorOption(t,n)})))}}]),t}(i.a.Component)),m=(n(27),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"renderOption",value:function(e,t){return i.a.createElement("option",{key:t,className:"uc-dd-list__item"},e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.items,a=t.onChange,c=t.title;return i.a.createElement("div",{className:"uc-dropdown"},i.a.createElement("div",{className:"uc-dd__title"},c),i.a.createElement("div",{className:"uc-dd__select"},i.a.createElement("select",{className:"uc-dd-list",onChange:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return a(e.target.value)})},n.map(function(t,n){return e.renderOption(t,n)}))))}}]),t}(i.a.Component)),h=(n(28),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("button",{className:"uc-button",onClick:this.props.onClick},this.props.text)}}]),t}(i.a.Component)),v=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.colors,n=e.selectedColor,a=e.bandSizes,c=e.cupSizes,r=e.stock,o=e.handleColorChange,s=e.handleBandSizeChange,l=e.handleCupSizeChange,u=e.handleAddToBugClick;return i.a.createElement("div",{className:"product-variants"},i.a.createElement("div",{className:"pv__color"},i.a.createElement(p,{colors:t,selectedColor:n,onSelection:o})),i.a.createElement("div",{className:"pv__stock"},i.a.createElement("span",{className:"pv__stock__title"}," STOCK: "),i.a.createElement("span",{className:"pv__stock__value"},r)),i.a.createElement("div",{className:"pv-size"},i.a.createElement("div",{className:"pv__band-size"},i.a.createElement(m,{title:"BAND SIZE",items:a,onChange:s})),i.a.createElement("div",{className:"pv__cup-size"},i.a.createElement(m,{title:"CUP SIZE",items:c,onChange:l}))),i.a.createElement("div",{className:"pv__add"},i.a.createElement(h,{text:"Add to Bag",onClick:u})))}}]),t}(i.a.Component),f=(n(29),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"createDetails",value:function(){return{__html:this.props.details}}},{key:"render",value:function(){return i.a.createElement("section",{className:"product-details"},i.a.createElement("h2",{className:"pd__title"},"DETAILS"),i.a.createElement("div",{dangerouslySetInnerHTML:this.createDetails()}))}}]),t}(i.a.Component)),g=(n(30),n(16)),b=n.n(g),C=(n(48),n(6)),S=["naked-1","naked-2","naked-3","naked-4","naked-5"],k=1024,_=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).slideTo=function(e){return n.setState({currentIndex:e})},n.onSlideChanged=function(e){return n.setState({currentIndex:e.item})},n.isSwipeEnabled=function(){return window.innerWidth>=k},n.renderThumb=function(e,t){var a=0;C.get(n.state,"currentIndex")&&(a=n.state.currentIndex);var c=a===t?"pi-image-list__thumbnail selected":"pi-image-list__thumbnail";return i.a.createElement("img",{src:e.thumbnail,className:c,onClick:function(){return n.slideTo(t)},key:t,alt:"Bra"})},n.renderDot=function(e,t){var a=n.state.currentIndex===t?"pi-image-dots__dot selected":"pi-image-dots__dot";return i.a.createElement("div",{key:t,className:a,onClick:function(){return n.slideTo(t)}})},n.renderMainImage=function(e){return i.a.createElement("img",{className:"pi__wrapper__image",src:e.main,alt:"Bra"})},n.state={main:n.props.images.map(n.renderMainImage),thumbnails:n.props.images.map(n.renderThumb),currentIndex:0,swipeDisabled:n.isSwipeEnabled()},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({main:e.images.map(this.renderMainImage),thumbnails:e.images.map(this.renderThumb)})}},{key:"render",value:function(){var e=this,t=this.state,n=t.main,a=t.thumbnails,c=t.currentIndex,r=t.swipeDisabled;return i.a.createElement("div",{className:"product-images"},i.a.createElement("ul",{className:"pi-image-list"},a),i.a.createElement("div",{className:"pi__wrapper"},i.a.createElement(b.a,{mouseDragEnabled:!0,items:n,buttonsDisabled:!0,slideToIndex:c,onSlideChanged:this.onSlideChanged,dotsDisabled:!0,onResized:function(){return e.setState({swipeDisabled:e.isSwipeEnabled()})},swipeDisabled:r})),i.a.createElement("ul",{className:"pi-image-dots"},n.map(this.renderDot)))}}]),t}(i.a.Component),E=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={colors:S,stock:12,selectedColor:S[0],bandSizes:[],selectedBandSize:"",cupSizes:[],selectedCupSize:"",productMap:{},title:"",productDetails:"",images:[],price:""},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=this;fetch("http://www.mocky.io/v2/5c6c3a92320000e83bbef971").then(function(e){return e.json()}).then(function(t){return e.processData(t.product)}).catch(function(e){return console.log("Error while fetching data",e)})}},{key:"handleColorChange",value:function(e){var t=this.state.productMap;this.updateProductSelection(t,e),this.setState({selectedColor:e})}},{key:"handleBandSizeChange",value:function(e){var t=this.state,n=t.productMap,a=t.selectedColor,i=this.getCupSizesByBandSize(n,this.state.selectedColor,e),c=C.head(i);this.setState({selectedBandSize:e,cupSizes:i,selectedCupSize:c,stock:n[a][e][c].stock})}},{key:"handleCupSizeChange",value:function(e){var t=this.state,n=t.productMap,a=t.selectedColor,i=t.selectedBandSize;this.setState({selectedCupSize:e,stock:n[a][i][e].stock})}},{key:"handleAddToBugClick",value:function(){var e=this.state,t=e.title,n=e.selectedBandSize,a=e.selectedCupSize,i="Added a ".concat(t," - ").concat(n).concat(a," to the cart");alert(i)}},{key:"processData",value:function(e){var t=this.createProductMap(e.variants);this.updateProductSelection(t,this.state.selectedColor),this.setState({title:e.title,productDetails:e.body_html,images:this.getImages(e.images),productMap:t,price:this.getPrice(e.variants)})}},{key:"createProductMap",value:function(e){var t=this,n={};return C.each(e,function(e){if(e.inventory_quantity>=10){n[e.option1]=n[e.option1]?n[e.option1]:{};var a=t.getBandSize(e.option2),i=t.getCupSize(e.option2);n[e.option1][a]||(n[e.option1][a]={name:a}),n[e.option1][a][i]||(n[e.option1][a][i]={name:i,stock:e.inventory_quantity})}}),n}},{key:"updateProductSelection",value:function(e,t){var n=this.getBandSizesByColor(e,t),a=C.head(n),i=this.getCupSizesByBandSize(e,t,a),c=C.head(i);this.setState({bandSizes:n,selectedBandSize:a,cupSizes:i,selectedCupSize:c,stock:e[t][a][c].stock})}},{key:"getBandSizesByColor",value:function(e,t){return C.map(e[t],function(e){return e.name})}},{key:"getCupSizesByBandSize",value:function(e,t,n){var a=C.omit(e[t][n],"name");return C.map(a,function(e){return e.name})}},{key:"getImages",value:function(e){return C.map(e,function(e){return{main:"".concat("https://").concat(e.src1000),thumbnail:"".concat("https://").concat(e.src100)}})}},{key:"getBandSize",value:function(e){return e.substring(0,2)}},{key:"getCupSize",value:function(e){return e.substring(2,3)}},{key:"getPrice",value:function(e){var t=C.get(C.head(e),"price")||"";return t.slice(0,t.indexOf("."))}},{key:"render",value:function(){var e=this,t=this.state,n=t.colors,a=t.selectedColor,c=t.bandSizes,r=t.cupSizes,o=t.stock,s=t.title,l=t.price,u=t.images,d=t.productDetails;return i.a.createElement("section",{className:"product-page"},i.a.createElement("div",{className:"pp-product"},i.a.createElement("header",{className:"pp__header"},i.a.createElement("h1",{className:"pp__header__title"},s),i.a.createElement("div",{className:"pp__header__price"},i.a.createElement("div",null,"$",l))),i.a.createElement("div",{className:"pp__images"},i.a.createElement(_,{images:u})),i.a.createElement(v,{colors:n,selectedColor:a,bandSizes:c,cupSizes:r,stock:o,handleColorChange:function(t){return e.handleColorChange(t)},handleBandSizeChange:function(t){return e.handleBandSizeChange(t)},handleCupSizeChange:function(t){return e.handleCupSizeChange(t)},handleAddToBugClick:function(){return e.handleAddToBugClick()}})),i.a.createElement(f,{details:d}))}}]),t}(i.a.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(E,null)}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.12e4afe1.chunk.js.map