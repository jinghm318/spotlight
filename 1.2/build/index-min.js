/*!build time : 2013-10-30 3:52:16 PM*/
KISSY.add("gallery/spotlight/1.2/index",function(a){function b(b){var c=this.constructor;for(b=b||{};c;)b=a.merge(c.Config,b),c=c.superclass?c.superclass.constructor:null;this.config=b,this.quene=b.quene||[],delete b.quene,this.masks=["top","right","bottom","left"],this.isMasked=!1,this._init()}var c=a.DOM,d=a.Event,e="nextFocus",f="prevFocus",g="hide",h="render",i="focusTo";return b.Config={zIndex:9999,bgColor:"#000",opacity:.5,maskCls:"spotlight-mask",anim:{duration:.2},initIndex:0,lazyInit:!0,clickOnHide:!0,lastOnEnd:!0,resizeBuffer:50,clickOnHideTip:"",toggleOnAnim:!1,focusBorder:null,listeners:null},a.augment(b,a.EventTarget,{_init:function(){this._initEvent()},_initEvent:function(){var b=this.config.listeners;b&&a.each(b,function(c,d){a.isFunction(c)&&this.on(d,c,b.scope||this)},this)},_onRender:function(){var a=this,b=document,e=b.createElement("div"),f=b.createElement("div"),g=b.createElement("div"),i=b.createElement("div"),j=b.createDocumentFragment(),k=a.config,l=k.maskCls;if(j.appendChild(f),j.appendChild(e),j.appendChild(g),j.appendChild(i),e.title=f.title=g.title=i.title=k.clickOnHideTip,e.style.position=f.style.position=g.style.position=i.style.position="absolute",e.style.backgroundColor=f.style.backgroundColor=g.style.backgroundColor=i.style.backgroundColor=k.bgColor,e.style.opacity=f.style.opacity=g.style.opacity=i.style.opacity=k.opacity,e.style.filter=f.style.filter=g.style.filter=i.style.filter="alpha(opacity="+100*parseFloat(k.opacity)+")",e.style.zIndex=f.style.zIndex=g.style.zIndex=i.style.zIndex=k.zIndex,e.className=f.className=g.className=i.className=l,e.className+=" "+l+"-left",f.className+=" "+l+"-top",g.className+=" "+l+"-right",i.className+=" "+l+"-bottom",g.style.top=g.style.right=i.style.right=i.style.bottom=e.style.left=e.style.bottom=f.style.left=f.style.top=0,k.focusBorder){var m=this.border=document.createElement("div");m.className=l+"-border",m.style.border=k.focusBorder.borderStyle,m.style.position="absolute",m.style.zIndex=k.zIndex+1,m.style.top=-9999,j.appendChild(m)}c.append(j,b.body),this.fire(h),a.left=e,a.top=f,a.right=g,a.bottom=i,k.clickOnHide===!0&&d.delegate(b.body,"click","."+k.maskCls,a.hide,a),d.on(window,"resize",this._onResize,this)},_onResize:function(){this.resizeTimer&&this.resizeTimer.cancel(),this.resizeTimer=a.later(function(){if(this.isMasked){var b=this._getMaskBoxSize(this.quene[this.currentIndex].node);a.each(this.masks,function(a){c.css(this[a],b[a])},this)}},this.config.resizeBuffer,!1,this)},_unmask:function(){this._alignToBox({top:{height:0},bottom:{height:0},right:{width:0},left:{width:0}},this.config.anim.duration),this.isMasked=!1,this.border&&(this.border.style.top=-9999)},_getMaskBoxSize:function(a){var b=c.offset(a),d=c.height(a),e=c.width(a),f=b.top,g=b.left,h=c.docWidth(),i=c.docHeight(),j=h-(e+g),k=i-(d+f);return{top:{height:f,width:g+e},left:{height:i-f,width:g,top:f},right:{width:j,height:f+d},bottom:{height:k,width:h-g,top:f+d}}},_alignToBox:function(b,d){if(this.rendered){var e;if(e=0===d||d===!1?function(a){c.css(this[a],b[a])}:function(c){a.Anim(this[c],b[c],d).run()},a.each(this.masks,e,this),this.border){var f=this.quene[this.currentIndex].node,g=c.offset(f),h={height:c.height(f),width:c.width(f)};c.css(this.border,{height:h.height,width:h.width,top:g.top,left:g.left})}this.isMasked=!0,this.border&&this.config.focusBorder.focusOnBlink&&this._applyBlinkBorder()}},_applyBlinkBorder:function(){this._cancelBlinkBorder();var b,c=this,d=c.config,e=this.border.style.top,f="-9999px";this.border.style.display="block",this.borderBlinkTimer=a.later(function(){b=this.border.style.top,this.border.style.top=b==e?f:e},d.focusBorder.interval,!0,this),d.focusBorder.blinkTime&&(this.borderBlinkStopTimer=a.later(function(){this._cancelBlinkBorder()},d.focusBorder.blinkTime,!1,this))},_cancelBlinkBorder:function(){this.borderBlinkTimer&&(this.borderBlinkTimer.cancel(),delete this.borderBlinkTimer),this.borderBlinkStopTimer&&(this.borderBlinkStopTimer.cancel(),delete this.borderBlinkStopTimer),this.border&&(this.border.style.display="none")},canNext:function(){return!!this.quene[this.currentIndex+1]},canPrevious:function(){return!!this.quene[this.currentIndex-1]},hide:function(){this._unmask(),this.fire(g),this._cancelBlinkBorder()},end:function(){this.currentIndex=0,this.hide()},start:function(){var b=a.isNumber(this.config.initIndex)?this.config.initIndex:this.currentIndex;this.quene[b]&&(this.currentIndex=b,this.focusTo(b,!0),delete this.config.initIndex)},nextFocus:function(){var a=this.currentIndex+1;this.quene[a]&&(this.currentIndex=a,this.fire(e,{nodeTarget:this.quene[a]}),this.focusTo(this.currentIndex,this.config.toggleOnAnim))},prevFocus:function(){var a=this.currentIndex-1;this.quene[a]&&(this.currentIndex=a,this.fire(f,{nodeTarget:this.quene[a]}),this.focusTo(this.currentIndex,this.config.toggleOnAnim))},focusTo:function(b,d){if(this.rendered!==!0&&(this._onRender(),this.rendered=!0),this.quene[b]){this.currentIndex=b;var e=this,f=e.quene[b].node,g=c.height(f),h=e._getMaskBoxSize(f),j=c.offset(f),k=j.top,l=c.viewportHeight(),m=c.scrollTop(),n=k>l+m;(n||m>g+k)&&a.one(window).animate({scrollTop:k-g},.2),e._alignToBox(h,d?e.config.anim.duration:!1),this.fire(i,{nodeTarget:f,offset:j,index:b})}},addFocus:function(a){this.quene.push(a)},removeFocus:function(a){this.quene.splice(a,1)},destroy:function(){this.hide(),a.later(function(){c.remove([this.top,this.left,this.right,this.bottom,this.border]),this.top=this.left=this.right=this.bottom=this.border=null},500,!1,this)}}),b});