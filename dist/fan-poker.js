var x=`
  :host {
    --fan-card-width: 390px;
    --fan-card-height: 520px;
    --fan-card-bg: #fff;
    --fan-text: #171717;
    --fan-muted: #737373;
    --fan-line: rgba(23, 23, 23, 0.15);
    --fan-accent: #e96d2f;
    --fan-radius: 24px;
    display: block;
    min-width: 0;
    color: var(--fan-text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    outline: none;
  }

  :host(:focus-visible) .stage {
    outline: 2px solid color-mix(in srgb, var(--fan-accent) 65%, transparent);
    outline-offset: 4px;
    border-radius: calc(var(--fan-radius) + 4px);
  }

  *, *::before, *::after { box-sizing: border-box; }

  .stage {
    position: relative;
    margin: 0 auto;
    overflow: visible;
    perspective: 1600px;
    touch-action: pan-y;
    user-select: none;
    contain: layout style;
  }

  .deck {
    position: absolute;
    width: var(--fan-card-width);
    height: var(--fan-card-height);
    transform-origin: 0 0;
    transform-style: preserve-3d;
  }

  .card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--fan-line);
    border-radius: var(--fan-radius);
    background: var(--fan-card-bg);
    box-shadow: none;
    backface-visibility: hidden;
    transform-origin: 50% 112%;
    container-type: size;
    will-change: transform;
    isolation: isolate;
  }

  .card.is-current { cursor: grab; }
  .deck.is-dragging .card.is-current { cursor: grabbing; }

  .card-inner {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    pointer-events: none;
  }

  .card.is-current .card-inner { pointer-events: auto; }

  .card-cover {
    position: relative;
    flex: 0 1 41%;
    min-height: min(156px, 36%);
    padding: clamp(14px, 6cqh, 46px) clamp(14px, 7cqw, 54px);
    overflow: hidden;
    border-bottom: 1px solid var(--fan-line);
    background: var(--card-accent, #f2a65a);
  }

  .card-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    height: 38px;
    padding: 0 10px;
    border: 1px solid rgba(23, 23, 23, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.84);
    color: #171717;
    font-size: 12px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .card-symbol {
    position: absolute;
    right: clamp(20px, 5cqw, 30px);
    bottom: clamp(12px, 3cqh, 20px);
    color: rgba(23, 23, 23, 0.74);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(58px, 28cqh, 126px);
    line-height: 0.88;
  }

  .card-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding: clamp(14px, 6cqh, 46px) clamp(14px, 7cqw, 54px) clamp(20px, 8cqh, 68px);
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }

  .card-tag {
    margin: 0 0 12px;
    color: var(--fan-accent);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-title {
    margin: 0;
    overflow-wrap: anywhere;
    font-size: clamp(18px, 9cqw, 42px);
    line-height: 1.12;
    letter-spacing: -0.04em;
  }

  .card-body {
    margin: 20px 0 0;
    overflow-wrap: anywhere;
    color: var(--fan-muted);
    font-size: clamp(11px, 3.8cqw, 15px);
    line-height: 1.75;
  }

  .card-body > :first-child { margin-top: 0; }
  .card-body > :last-child { margin-bottom: 0; }
  .card-body a { color: var(--fan-accent); }
  .card-body img { max-width: 100%; height: auto; border-radius: 12px; }
  .card-body pre {
    max-width: 100%;
    padding: 14px;
    overflow: auto;
    border: 1px solid var(--fan-line);
    border-radius: 12px;
    background: color-mix(in srgb, var(--fan-text) 6%, transparent);
    color: var(--fan-text);
    font-size: 0.88em;
    line-height: 1.65;
  }
  .card-body code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }

  .card-footer {
    margin-top: auto;
    padding-top: clamp(28px, 7cqh, 44px);
    color: var(--fan-muted);
    font-size: 12px;
  }

  .empty {
    width: min(100%, 460px);
    margin: 30px auto;
    padding: 24px;
    border: 1px dashed var(--fan-line);
    border-radius: var(--fan-radius);
    color: var(--fan-muted);
    text-align: center;
  }

  @media (max-width: 430px) {
    :host { --fan-radius: 20px; }
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --fan-card-bg: #1b1b1b;
      --fan-text: #f3f3f3;
      --fan-muted: #aaa;
      --fan-line: rgba(255, 255, 255, 0.14);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card { will-change: auto; }
  }
`,l=Object.freeze({normal:620,fast:360,turbo:180}),b=new Set(["","true","1","yes","on"]),v=new Set(["false","0","no","off"]);function _(u,e,t=!0){if(!u.hasAttribute(e))return t;let i=u.getAttribute(e)?.trim().toLowerCase()??"";return v.has(i)?!1:b.has(i)?!0:t}function y(u,e){for(let t of u.childNodes)t.nodeType===Node.ELEMENT_NODE&&t.tagName==="SCRIPT"||e.append(t.cloneNode(!0))}var p=class extends HTMLElement{connectedCallback(){this.hidden=!0}},f=class extends HTMLElement{static get observedAttributes(){return["card-width","card-height","start-index","keyboard","wheel","draggable","aria-label"]}constructor(){super(),this.attachShadow({mode:"open"}),this._cards=[],this._nodes=[],this._index=0,this._queue=[],this._active=null,this._drag=null,this._frame=0,this._resizeFrame=0,this._mutationFrame=0,this._lastIntent=0,this._lastWheel=0,this._blockClickUntil=0,this._ready=!1,this._reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches,this._onResize=()=>this._queueMeasure()}connectedCallback(){this.shadowRoot.querySelector(".stage")||this._renderShell(),this.hasAttribute("tabindex")||(this.tabIndex=0),this.setAttribute("role","region"),this._syncLabel(),this._syncConfig(),this._bindEvents(),this._observe(),this._rebuild({preserveIndex:!1})}disconnectedCallback(){cancelAnimationFrame(this._frame),cancelAnimationFrame(this._resizeFrame),cancelAnimationFrame(this._mutationFrame),this._mutationObserver?.disconnect(),this._resizeObserver?.disconnect(),removeEventListener("resize",this._onResize)}attributeChangedCallback(e,t,i){t===i||!this.isConnected||(e==="aria-label"&&this._syncLabel(),e==="start-index"&&this.reset(),this._syncConfig(),this._queueMeasure())}get currentIndex(){return this._index}get cardCount(){return this._cards.length}get cards(){return this._cards.map(({element:e,...t})=>({...t}))}set cards(e){if(!Array.isArray(e))throw new TypeError("fan-poker.cards must be an array");let t=document.createDocumentFragment();for(let i of e){let r=document.createElement("fan-card");for(let s of["tag","title","symbol","accent"])i?.[s]!=null&&r.setAttribute(s,String(i[s]));i?.html!=null?r.innerHTML=String(i.html):i?.content!=null&&(r.textContent=String(i.content)),t.append(r)}this.replaceChildren(t)}next(){return this._requestStep(1,"api")}previous(){return this._requestStep(-1,"api")}goTo(e){if(this._cards.length<2||this._drag)return!1;let t=this._mod(Number(e)||0);this._queue.length=0,this._active?.target===1&&(this._active.ms=l.turbo);let i=this._projectedIndex();if(i===t)return!0;let r=this._mod(t-i),s=this._mod(i-t),a=r<=s?1:-1,n=a>0?r:s;for(let o=0;o<n;o+=1)this._queue.push({direction:a,ms:l.turbo,source:"goto"});return this._active||this._startNext(),!0}reset(){let e=this._normalizeStartIndex();return this._ready?this.goTo(e):(this._index=e,!0)}_renderShell(){this.shadowRoot.innerHTML=`
      <style>${x}</style>
      <section class="stage" part="stage">
        <div class="deck" part="deck"></div>
        <div class="empty" part="empty" hidden>Add one or more &lt;fan-card&gt; elements.</div>
      </section>
    `,this._stage=this.shadowRoot.querySelector(".stage"),this._deck=this.shadowRoot.querySelector(".deck"),this._empty=this.shadowRoot.querySelector(".empty")}_syncLabel(){this.setAttribute("aria-label",this.getAttribute("aria-label")||"Interactive fan poker card deck")}_syncConfig(){let e=this.getAttribute("card-width")||"390px",t=this.getAttribute("card-height")||"520px";this.style.setProperty("--fan-card-width",e),this.style.setProperty("--fan-card-height",t)}_bindEvents(){if(this._eventsBound)return;this._eventsBound=!0,this._stage.addEventListener("click",t=>{this.focus({preventScroll:!0}),!(performance.now()<this._blockClickUntil)&&(t.composedPath().some(i=>i instanceof Element&&i.matches?.("a, button, input, textarea, select"))||this._requestStep(1,"click"))}),this._stage.addEventListener("wheel",t=>{if(!_(this,"wheel",!0))return;t.preventDefault();let i=performance.now();Math.abs(t.deltaY)<8||i-this._lastWheel<58||(this._lastWheel=i,this._requestStep(t.deltaY>0?1:-1,"wheel"))},{passive:!1}),this.addEventListener("keydown",t=>{_(this,"keyboard",!0)&&(["ArrowRight","ArrowDown","PageDown"," "].includes(t.key)?(t.preventDefault(),this._requestStep(1,"keyboard")):["ArrowLeft","ArrowUp","PageUp"].includes(t.key)&&(t.preventDefault(),this._requestStep(-1,"keyboard")))}),this._stage.addEventListener("pointerdown",t=>{if(!_(this,"draggable",!0))return;let i=t.composedPath().find(r=>r instanceof Element&&r.classList?.contains("is-current"));!i||this._active||this._queue.length||this._cards.length<2||(this.focus({preventScroll:!0}),i.setPointerCapture?.(t.pointerId),this._deck.classList.add("is-dragging"),this._drag={pointerId:t.pointerId,startX:t.clientX,lastX:t.clientX,lastTime:performance.now(),velocityX:0,dx:0,moved:!1})}),this._stage.addEventListener("pointermove",t=>{let i=this._drag;if(!i||i.pointerId!==t.pointerId)return;let r=performance.now(),s=Math.max(8,r-i.lastTime);i.velocityX=i.velocityX*.7+(t.clientX-i.lastX)/s*.3,i.lastX=t.clientX,i.lastTime=r,i.dx=t.clientX-i.startX,i.moved||=Math.abs(i.dx)>4;let a=i.dx<=0?1:-1,n=Math.min(1,Math.abs(i.dx)/Math.max(1,this._cardWidth*.72));this._renderTransition(a,n)});let e=t=>{let i=this._drag;if(!i||i.pointerId!==t.pointerId)return;this._drag=null,this._deck.classList.remove("is-dragging");let r=i.dx<=0?1:-1,s=Math.min(1,Math.abs(i.dx)/Math.max(1,this._cardWidth*.72)),a=Math.abs(i.velocityX),n=s>.22||a>.5,o=a>1.15?l.turbo:a>.62?l.fast:n?l.normal:240;this._startFromProgress(r,s,n?1:0,o),i.moved&&(this._blockClickUntil=performance.now()+360)};this._stage.addEventListener("pointerup",e),this._stage.addEventListener("pointercancel",e),addEventListener("resize",this._onResize)}_observe(){this._mutationObserver?.disconnect(),this._mutationObserver=new MutationObserver(()=>{cancelAnimationFrame(this._mutationFrame),this._mutationFrame=requestAnimationFrame(()=>this._rebuild({preserveIndex:!0}))}),this._mutationObserver.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["tag","title","symbol","accent"]}),this._resizeObserver?.disconnect(),"ResizeObserver"in window&&(this._resizeObserver=new ResizeObserver(()=>this._queueMeasure()),this._resizeObserver.observe(this),this._resizeObserver.observe(this._deck))}_collectCards(){return[...this.querySelectorAll(":scope > fan-card")].map((e,t)=>({element:e,tag:e.getAttribute("tag")||"Card",title:e.getAttribute("title")||`Card ${t+1}`,symbol:e.getAttribute("symbol")||String(t+1),accent:e.getAttribute("accent")||"#f2a65a"}))}_rebuild({preserveIndex:e}){cancelAnimationFrame(this._frame),this._queue.length=0,this._active=null,this._drag=null,this._deck.classList.remove("is-dragging");let t=this._index;if(this._cards=this._collectCards(),this._deck.replaceChildren(),this._empty.hidden=this._cards.length>0,!this._cards.length){this._nodes=[],this._stage.style.width="100%",this._stage.style.height="auto";return}this._index=e?Math.min(t,this._cards.length-1):this._normalizeStartIndex(),this._nodes=this._cards.map((i,r)=>this._createCard(i,r)),requestAnimationFrame(()=>{this._measure(),this._renderIdle(),this._ready||(this._ready=!0,this.dispatchEvent(new CustomEvent("ready",{bubbles:!0,composed:!0,detail:{index:this._index,cardCount:this._cards.length}})))})}_createCard(e,t){let i=document.createElement("article");i.className="card",i.part="card",i.dataset.index=String(t),i.setAttribute("role","group"),i.setAttribute("aria-label",`Card ${t+1} of ${this._cards.length}: ${e.title}`);let r=document.createElement("div");r.className="card-inner";let s=document.createElement("div");s.className="card-cover",s.part="cover",s.style.setProperty("--card-accent",e.accent);let a=document.createElement("span");a.className="card-index",a.part="index",a.textContent=String(t+1).padStart(2,"0");let n=document.createElement("span");n.className="card-symbol",n.part="symbol",n.setAttribute("aria-hidden","true"),n.textContent=e.symbol;let o=document.createElement("div");o.className="card-content",o.part="content";let c=document.createElement("p");c.className="card-tag",c.part="tag",c.textContent=e.tag;let d=document.createElement("h2");d.className="card-title",d.part="title",d.textContent=e.title;let h=document.createElement("div");h.className="card-body",h.part="body",y(e.element,h),h.childNodes.length||(h.textContent="Add card content inside this <fan-card>.");let m=document.createElement("div");return m.className="card-footer",m.part="footer",m.textContent="Click, drag, wheel, or use the keyboard",s.append(a,n),o.append(c,d,h,m),r.append(s,o),i.append(r),this._deck.append(i),i}_normalizeStartIndex(){if(!this._cards.length)return 0;let e=Number.parseInt(this.getAttribute("start-index")||"0",10);return this._mod(Number.isFinite(e)?e:0)}_mod(e){let t=this._cards.length;return t?(e%t+t)%t:0}_clamp01(e){return Math.min(1,Math.max(0,e))}_mix(e,t,i){return e+(t-e)*i}_ease(e){let t=this._clamp01(e);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}_pose(e){let t=Math.max(1,this._cards.length-1),i=e/t;return{x:40*i,y:11*i,z:-e*.7,rotate:14*i,scale:1-.016*i}}_mixPose(e,t,i){return{x:this._mix(e.x,t.x,i),y:this._mix(e.y,t.y,i),z:this._mix(e.z,t.z,i),rotate:this._mix(e.rotate,t.rotate,i),scale:this._mix(e.scale,t.scale,i)}}_transform(e){return`translate3d(${e.x}px, ${e.y}px, ${e.z}px) rotate(${e.rotate}deg) scale(${e.scale})`}_layerOf(e,t=this._index){return this._mod(e-t)}_recycledPose(e,t){let i=this._pose(0),r={x:-this._cardWidth*.29,y:-9,z:42,rotate:-5.5,scale:1.006},s=this._clamp01(e);if(s<=.3){let n=1-Math.pow(1-s/.3,3),o=this._mixPose(i,r,n);return o.y-=Math.sin(Math.PI*n)*8,{pose:o,behind:!1}}let a=-(Math.cos(Math.PI*((s-.3)/.7))-1)/2;return{pose:{x:this._mix(r.x,t.x,a),y:this._mix(r.y,t.y,a)+Math.sin(Math.PI*a)*22,z:this._mix(r.z,t.z-8,a),rotate:this._mix(r.rotate,t.rotate,a),scale:this._mix(r.scale,t.scale,a)},behind:a>=.2}}_renderIdle(){cancelAnimationFrame(this._frame),this._active=null,this._deck.classList.remove("is-dragging"),this._nodes.forEach((e,t)=>{let i=this._layerOf(t);e.style.transform=this._transform(this._pose(i)),e.style.zIndex=String(this._cards.length-i),e.style.pointerEvents=i===0?"auto":"none",e.classList.toggle("is-current",i===0),e.setAttribute("aria-hidden",i===0?"false":"true")})}_renderTransition(e,t){let i=this._clamp01(t),r=this._cards.length,s=this._pose(r-1),a=e>0?this._index:this._mod(this._index-1);this._nodes.forEach((n,o)=>{let c=this._layerOf(o);if(e>0&&c===0||e<0&&o===a){let g=this._recycledPose(e>0?i:1-i,s);n.style.transform=this._transform(g.pose),n.style.zIndex=g.behind?"0":String(r+20);return}let d=this._pose(c),h=this._pose(e>0?c-1:c+1),m=this._ease(this._clamp01((i-.07)/.72));n.style.transform=this._transform(this._mixPose(d,h,m)),n.style.zIndex=String(r-c+(e>0?2:0))})}_adaptiveDuration(){let e=performance.now(),t=this._lastIntent?e-this._lastIntent:1/0;return this._lastIntent=e,t<170?l.turbo:t<300?l.fast:l.normal}_requestStep(e,t="manual",i=null){if(this._cards.length<2||this._drag)return!1;let r=e>=0?1:-1,s=i??this._adaptiveDuration();return this._queue.push({direction:r,ms:s,source:t}),this._active?(this._active.ms=Math.min(this._active.ms,s),!0):(this._startNext(),!0)}_startNext(){if(this._active||!this._queue.length)return;let e=this._queue.shift();this._active={direction:e.direction,progress:0,target:1,ms:this._reducedMotion?1:e.ms,source:e.source,lastTime:performance.now()},this.dispatchEvent(new CustomEvent("cardchangestart",{bubbles:!0,composed:!0,detail:{index:this._index,direction:e.direction,source:e.source}})),this._frame=requestAnimationFrame(t=>this._tick(t))}_startFromProgress(e,t,i,r){this._active={direction:e,progress:t,target:i,ms:this._reducedMotion?1:r,source:"drag",lastTime:performance.now()},this._frame=requestAnimationFrame(s=>this._tick(s))}_tick(e){if(!this._active)return;let t=this._active,i=Math.min(34,Math.max(0,e-t.lastTime));t.lastTime=e;let r=t.target>=t.progress?1:-1;t.progress+=i/Math.max(1,t.ms)*r;let s=r>0?t.progress>=t.target:t.progress<=t.target;if(s&&(t.progress=t.target),this._renderTransition(t.direction,t.progress),!s){this._frame=requestAnimationFrame(d=>this._tick(d));return}let a=t.target===1,n=t.direction,o=t.source,c=this._index;this._active=null,a&&(this._index=this._mod(this._index+n)),this._renderIdle(),a&&this.dispatchEvent(new CustomEvent("cardchange",{bubbles:!0,composed:!0,detail:{index:this._index,previousIndex:c,cardCount:this._cards.length,direction:n>0?"next":"previous",source:o}})),this._queue.length&&this._startNext()}_projectedIndex(){let e=this._index;this._active?.target===1&&(e=this._mod(e+this._active.direction));for(let t of this._queue)e=this._mod(e+t.direction);return e}_queueMeasure(){cancelAnimationFrame(this._resizeFrame),this._resizeFrame=requestAnimationFrame(()=>{this._measure(),!this._active&&!this._drag&&this._renderIdle()})}_measure(){if(!this._deck||!this._cards.length)return;this._cardWidth=this._deck.offsetWidth||390,this._cardHeight=this._deck.offsetHeight||520;let e=Math.max(60,this._cardWidth*.33),t=this.parentElement?.clientWidth||document.documentElement.clientWidth,i=Math.max(1,Math.min(document.documentElement.clientWidth-24,t)),r=this._cardWidth+e*2+70,s=this._cardHeight+130,a=Math.min(1,i/r);this._deck.style.left=`${e*a}px`,this._deck.style.top=`${55*a}px`,this._deck.style.transform=`scale(${a})`,this._stage.style.width=`${Math.ceil(r*a)}px`,this._stage.style.height=`${Math.ceil(s*a)}px`}};customElements.get("fan-card")||customElements.define("fan-card",p);customElements.get("fan-poker")||customElements.define("fan-poker",f);export{p as FanCardElement,f as FanPokerElement};
