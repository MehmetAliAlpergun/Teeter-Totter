webpackJsonp([1],{1:function(e,t,i){i("zLlZ"),e.exports=i("NHnr")},"2Zy4":function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("7+uW"),a=i("NYxO"),s=i("k9Ku");function o(){var e=Math.floor(Math.random()*MaxWeight)+MinWeight;return{id:Math.floor(Math.random()*Date.now()),type:Math.floor(Math.random()*ShapeCount),weight:e,offset:Math.floor(Math.random()*BoardWidth/2)+1,height:15*e}}function r(e){return e.reduce(function(e,t){return e+t.weight*t.offset},0)}n.a.use(a.a);var h=new a.a.Store({state:{IsGameOver:!1,IsPaused:!0,LeftSideShapes:[],RightSideShapes:[],FallingShapes:[],EndGameSound:new s.Howl({loop:!1,src:["static/endgame.mp3"]})},getters:{LeftSum:function(e){return r(e.LeftSideShapes)},RightSum:function(e){return r(e.RightSideShapes)},BoardAngle:function(e,t){if(!t.LeftSum)return MaxBendingAngle;if(t.LeftSum===t.RightSum)return 0;var i=Math.abs(t.LeftSum-t.RightSum)/Math.max(t.LeftSum,t.RightSum)*100;return t.LeftSum>t.RightSum?-i:i},gameOverStatus:function(e,t){var i=Math.abs(t.LeftSum-t.RightSum);return console.log(t.BoardAngle),console.log(i),Math.abs(t.BoardAngle)>MaxBendingAngle||i>MaxSumDifference}},mutations:{TogglePause:function(e){e.IsPaused=!e.IsPaused},StartFall:function(e){e.IsGameOver?this.dispatch("NewGame"):e.IsPaused&&(e.IsPaused=!1)},AddRightShape:function(e){e.RightSideShapes.push(o())},AddLeftShape:function(e){var t=e.FallingShapes.shift();e.LeftSideShapes.push(t)},Initialize:function(e){e.FallingShapes=[];for(var t=0;t<2;t++)e.FallingShapes.push(o())},AddShape:function(e){e.FallingShapes.push(o())},MoveShapeRight:function(e){e.IsPaused||e.FallingShapes[0].offset-1<=0||(e.FallingShapes[0].offset-=1)},MoveShapeLeft:function(e){e.IsPaused||e.FallingShapes[0].offset+1>5||(e.FallingShapes[0].offset+=1)},Reset:function(e){e.IsGameOver=!1,e.IsPaused=!0,e.LeftSideShapes=[],e.RightSideShapes=[],e.FallingShapes=[],e.FallingShape="",e.NextFallingShape=""}},actions:{FallFinished:function(e){var t=e.commit,i=e.state,n=e.getters;e.dispatch;t("AddLeftShape"),t("AddShape"),i.LeftSideShapes.length&&i.LeftSideShapes.length!==i.RightSideShapes.length&&t("AddRightShape"),n.gameOverStatus&&(i.EndGameSound.play(),setTimeout(function(){i.IsGameOver=!0,i.IsPaused=!0},200))},NewGame:function(e){var t=e.commit;t("Reset"),t("AddRightShape"),t("Initialize")}}}),u=i("Dd8w"),d=i.n(u),p={name:"Shape",props:{shape:{type:Object,required:!0},side:{type:Boolean},top:{type:Number}},methods:{roundUp:function(e){return Math.round(100*e)/100},GetBottomCoordinate:function(){return this.$refs.element.getBoundingClientRect().bottom}},computed:{ShapeType:function(){switch(this.shape.type){case 0:return"circle";case 1:return"triangle";case 2:return"rectangle"}},ShapePosition:function(){var e=this.roundUp(this.shape.height);e<40&&(e=40);var t=this.top||0,i=0;return i=this.side?50+10*this.shape.offset:50-10*this.shape.offset,1!==this.shape.type?{top:t+"px",left:i+"%",height:e+"px",width:e+"px",lineHeight:e+"px"}:{top:t+"px",left:i+"%",borderWidth:"0 "+e+"px "+this.roundUp(1.25*e)+"px "+e+"px ",lineHeight:this.roundUp(1.2*e)+"px"}}}},l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"element",class:this.ShapeType,style:this.ShapePosition},[t("span",{staticClass:"inner-text"},[this._v(this._s(this.shape.weight)+"kg")])])},staticRenderFns:[]};var c=i("VU/8")(p,l,!1,function(e){i("cCjh")},"data-v-3adbfad7",null).exports,f={name:"FallingShape",props:{shape:{type:Object,required:!0},index:{type:Number},timeOut:{type:Number}},components:{Shape:c},data:function(){return{ShapeBottom:0,AnimatedTop:this.shape.height,timer:0}},computed:{IsPaused:function(){return this.$store.state.IsPaused},BoardAngle:function(){return this.$store.getters.BoardAngle},FinalShapePosition:function(){var e=this.GetBoardCoordinates(),t=e.top,i=e.bottom;return this.BoardAngle>=0?t+(i-t)/2*(1-this.shape.offset/(BoardWidth/2)):i-(i-t)/2*(1-this.shape.offset/(BoardWidth/2))}},methods:{GetBoardCoordinates:function(){var e=document.querySelector(".board").getBoundingClientRect();return{top:e.top,bottom:e.bottom}},AnimateTop:function(){this.AnimatedTop+=20}},updated:function(){var e=this;if(console.log(this.timeOut),this.IsPaused)return clearTimeout(this.timer);0===this.index&&(this.ShapeBottom=this.$refs.shape.GetBottomCoordinate(),this.timer=setTimeout(function(){if(e.ShapeBottom>=e.FinalShapePosition-20)return clearTimeout(e.timer),e.$store.dispatch("FallFinished"),void e.$emit("finished-falling");e.AnimateTop()},this.timeOut))}},m={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("Shape",{ref:"shape",attrs:{shape:this.shape,top:this.AnimatedTop,index:this.index,isPaused:this.IsPaused}})],1)},staticRenderFns:[]};var g={name:"FallZone",components:{FallingShape:i("VU/8")(f,m,!1,function(e){i("2Zy4")},"data-v-1ea43722",null).exports},data:function(){return{timeOut:Timeout,iterationCounter:0}},computed:{FallingShapes:function(){return this.$store.state.FallingShapes}},methods:d()({},Object(a.b)(["TogglePause","StartFall","Initialize","MoveShapeRight","MoveShapeLeft"]),{onKeyDown:function(e){32===e.keyCode&&this.TogglePause(),40===e.keyCode&&this.StartFall(),39===e.keyCode&&this.MoveShapeRight(),37===e.keyCode&&this.MoveShapeLeft(),82===e.keyCode&&this.$store.dispatch("NewGame")},onFinishFalling:function(){this.iterationCounter++,this.iterationCounter===IterationCountIncreasing&&(this.timeOut-=TimeoutStepDecreasing,this.iterationCounter=0)}}),mounted:function(){},beforeMount:function(){this.Initialize(),window.addEventListener("keydown",this.onKeyDown)},beforeDestroy:function(){window.removeEventListener("keydown",this.onKeyDown)}},S={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"fall-zone"},e._l(e.FallingShapes,function(t,n){return i("FallingShape",{directives:[{name:"show",rawName:"v-show",value:0==n,expression:"index ==0"}],key:t.id,attrs:{shape:t,index:n,timeOut:e.timeOut},on:{"finished-falling":e.onFinishFalling}})}),1)},staticRenderFns:[]};var v=i("VU/8")(g,S,!1,function(e){i("W4rd")},"data-v-648ff67c",null).exports,F={name:"TeeterBoard",components:{Shape:c},computed:d()({},Object(a.c)(["RightSideShapes","LeftSideShapes"]),{BoardAngle:function(){return this.$store.getters.BoardAngle}}),methods:d()({},Object(a.b)(["AddRightShape"])),beforeMount:function(){this.AddRightShape()}},y={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"teeter-board"},[t("div",{staticClass:"board",style:{transform:"rotate("+this.BoardAngle/2+"deg)"}},[this._l(this.LeftSideShapes,function(e){return t("Shape",{key:e.id,attrs:{shape:e}})}),this._v(" "),this._l(this.RightSideShapes,function(e){return t("Shape",{key:e.id,attrs:{shape:e,side:!0}})})],2),this._v(" "),t("div",{staticClass:"pillar"})])},staticRenderFns:[]};var b={name:"app",components:{FallZone:v,TeeterBoard:i("VU/8")(F,y,!1,function(e){i("gFMI")},"data-v-1a4f3bf9",null).exports},computed:{IsGameOver:function(){return this.$store.state.IsGameOver}}},x={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"parent",staticClass:"parent"},[t("div",{staticClass:"play-zone"},[t("FallZone"),this._v(" "),t("TeeterBoard")],1),this._v(" "),this.IsGameOver?t("div",{staticClass:"game-over"},[t("span",[this._v("GAME OVER")])]):this._e(),this._v(" "),this._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info"},[t("img",{attrs:{src:"static/keys.png",width:"250px",height:"250px"}})])}]};var M=i("VU/8")(b,x,!1,function(e){i("XE3b")},"data-v-5199ebae",null).exports;n.a.config.productionTip=!1,new n.a({store:h,render:function(e){return e(M)}}).$mount("#app")},W4rd:function(e,t){},XE3b:function(e,t){},cCjh:function(e,t){},erTq:function(e,t){},gFMI:function(e,t){},zLlZ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("erTq");i.n(n)}},[1]);
//# sourceMappingURL=app.f708d5ce47352c7683fd.js.map