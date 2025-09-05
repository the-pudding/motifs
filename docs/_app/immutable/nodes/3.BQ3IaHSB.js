import"../chunks/CWj6FrbW.js";import{Z as x,_ as w,ar as b,a0 as g,a1 as v,as as Z,aq as z,au as at,t as j,D as u,at as W,Y as B,u as H,$ as F,R as G,F as D,ap as S,av as ot,aH as rt,E as st}from"../chunks/ChYiNHKx.js";import{a as M,e as it}from"../chunks/C2OJOEYP.js";import{e as N,i as $,s as lt}from"../chunks/CDRYEvfY.js";import{e as ct,c as ht}from"../chunks/BK8OCJNN.js";import{c as dt,b as ut,i as Q}from"../chunks/cV2nkrgx.js";import{s as mt,p as O}from"../chunks/D_ST55Rz.js";import{s as tt}from"../chunks/DdPm80gA.js";import{b as pt}from"../chunks/DP0srUyw.js";var K={},q={},J=34,U=10,P=13;function et(e){return new Function("d","return {"+e.map(function(t,a){return JSON.stringify(t)+": d["+a+'] || ""'}).join(",")+"}")}function ft(e,t){var a=et(e);return function(n,s){return t(a(n),s,e)}}function X(e){var t=Object.create(null),a=[];return e.forEach(function(n){for(var s in n)s in t||a.push(t[s]=s)}),a}function A(e,t){var a=e+"",n=a.length;return n<t?new Array(t-n+1).join(0)+a:a}function vt(e){return e<0?"-"+A(-e,6):e>9999?"+"+A(e,6):A(e,4)}function gt(e){var t=e.getUTCHours(),a=e.getUTCMinutes(),n=e.getUTCSeconds(),s=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":vt(e.getUTCFullYear())+"-"+A(e.getUTCMonth()+1,2)+"-"+A(e.getUTCDate(),2)+(s?"T"+A(t,2)+":"+A(a,2)+":"+A(n,2)+"."+A(s,3)+"Z":n?"T"+A(t,2)+":"+A(a,2)+":"+A(n,2)+"Z":a||t?"T"+A(t,2)+":"+A(a,2)+"Z":"")}function yt(e){var t=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function n(o,l){var y,c,h=s(o,function(C,f){if(y)return y(C,f-1);c=C,y=l?ft(C,l):et(C)});return h.columns=c||[],h}function s(o,l){var y=[],c=o.length,h=0,C=0,f,T=c<=0,k=!1;o.charCodeAt(c-1)===U&&--c,o.charCodeAt(c-1)===P&&--c;function E(){if(T)return q;if(k)return k=!1,K;var L,V=h,I;if(o.charCodeAt(V)===J){for(;h++<c&&o.charCodeAt(h)!==J||o.charCodeAt(++h)===J;);return(L=h)>=c?T=!0:(I=o.charCodeAt(h++))===U?k=!0:I===P&&(k=!0,o.charCodeAt(h)===U&&++h),o.slice(V+1,L-1).replace(/""/g,'"')}for(;h<c;){if((I=o.charCodeAt(L=h++))===U)k=!0;else if(I===P)k=!0,o.charCodeAt(h)===U&&++h;else if(I!==a)continue;return o.slice(V,L)}return T=!0,o.slice(V,c)}for(;(f=E())!==q;){for(var R=[];f!==K&&f!==q;)R.push(f),f=E();l&&(R=l(R,C++))==null||y.push(R)}return y}function d(o,l){return o.map(function(y){return l.map(function(c){return i(y[c])}).join(e)})}function m(o,l){return l==null&&(l=X(o)),[l.map(i).join(e)].concat(d(o,l)).join(`
`)}function p(o,l){return l==null&&(l=X(o)),d(o,l).join(`
`)}function _(o){return o.map(r).join(`
`)}function r(o){return o.map(i).join(e)}function i(o){return o==null?"":o instanceof Date?gt(o):t.test(o+="")?'"'+o.replace(/"/g,'""')+'"':o}return{parse:n,parseRows:s,format:m,formatBody:p,formatRows:_,formatRow:r,formatValue:i}}var bt=yt(","),wt=bt.parse,_t=x('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function kt(e){var t=_t();w(e,t)}var xt=x('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function Tt(e){var t=xt();w(e,t)}var Ct=x('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function At(e){const t=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=Ct(),n=b(g(a),2);N(n,17,()=>t,$,(s,d)=>{let m=()=>u(d).tag,p=()=>u(d).text;var _=Z(),r=z(_);ct(r,m,!1,(i,o)=>{var l=at();j(()=>M(l,p())),w(o,l)}),w(s,_)}),v(a),w(e,a)}var Mt=x("<p> </p>");function jt(e,t){var a=Mt(),n=g(a);v(a),j(()=>M(n,`I am component A and my favorite number is ${t.number??""}.`)),w(e,a)}var Dt=x("<p> </p>");function It(e,t){var a=Dt(),n=g(a);v(a),j(()=>M(n,`I am component B and my name is ${t.name??""}.`)),w(e,a)}var St=x('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Et(e){const t={A:jt,B:It},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var n=St(),s=b(g(n),2);N(s,17,()=>a,$,(d,m)=>{var p=Z();const _=W(()=>t[u(m).component]);var r=z(p);dt(r,()=>u(_),(i,o)=>{o(i,mt(()=>u(m)))}),w(d,p)}),v(n),w(e,n)}var Rt=x("<div><!></div>");function Lt(e,t){B(t,!0);let a=O(t,"root",3,null),n=O(t,"top",3,0),s=O(t,"bottom",3,0),d=O(t,"increments",3,100),m=O(t,"value",15,void 0),p=[],_=[],r=[],i=[],o;function l(){let f=0,T=0;for(let k=0;k<p.length;k++)p[k]>f&&(f=p[k],T=k);f>0?m(T):m(void 0)}function y(f,T){const k=Y=>{Y[0].isIntersecting;const nt=Y[0].intersectionRatio;p[T]=nt,l()},E=n()?n()*-1:0,R=s()?s()*-1:0,L=`${E}px 0px ${R}px 0px`,V={root:a(),rootMargin:L,threshold:_};i[T]&&i[T].disconnect();const I=new IntersectionObserver(k,V);I.observe(f),i[T]=I}function c(){r.length&&r.forEach(y)}H(()=>{for(let f=0;f<d()+1;f++)_.push(f/d());r=o.querySelectorAll(":scope > *:not(iframe)"),c()}),H(()=>{n(),s(),c()});var h=Rt(),C=g(h);tt(C,()=>t.children??G),v(h),ut(h,f=>o=f,()=>o),w(e,h),F()}var Vt=x('<div><p class="svelte-12sq0x6"> </p></div>'),Ot=x('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function Ut(e){let t=S(void 0);var a=Ot(),n=g(a),s=b(g(n)),d=g(s,!0);v(s),v(n);var m=b(n,4);Lt(m,{get value(){return u(t)},set value(p){D(t,p,!0)},children:(p,_)=>{var r=Z(),i=z(r);N(i,16,()=>[0,1,2,3,4],$,(o,l,y)=>{var c=Vt();const h=W(()=>u(t)===y);let C;var f=g(c),T=g(f,!0);v(f),v(c),j(k=>{C=lt(c,1,"step svelte-12sq0x6",null,C,k),M(T,l)},[()=>({active:u(h)})]),w(o,c)}),w(p,r)},$$slots:{default:!0}}),ot(2),v(a),j(()=>M(d,u(t)||"-")),w(e,a)}const Ht=`{
	"body": [
		{
			"section": "intro",
			"content": [
				{
					"type": "text",
					"value": "<span class=playable data-src=intro/unlimited.mp3>Listen</span> to this line from the musical Wicked."
				},
				{
					"type": "text",
					"value": "This same melody repeats 3 times during the show (fun fact: the notes are <a href=https://musicalschwartz.com/wicked-musical-themes.htm target=_blank>borrowed</a> from “Somewhere Over The Rainbow” as a nod to the musical’s original source material). They all happen at pivotal moments for the main character, Elphaba."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "unlimited",
						"musical": "wicked",
						"title": "Wicked: “Unlimited” motif",
						"notes": {
							"unlimited": "<strong>Listen for:</strong> The final time, the lyrics change from “unlimited” to “I’m limited.”"
						}
					}
				},
				{
					"type": "text",
					"value": "This kind of thing happens in lots of art forms, from <a href=# target=_blank>film scores</a> to <a href=https://pudding.cool/2018/02/stand-up/ target=_blank>standup sets</a>. Depending on the medium, you might call it a theme, a callback, reincorporation. Repetition that creates structure and meaning."
				},
				{
					"type": "text",
					"value": "Musically, the word <strong>motif</strong> describes a short, recurring musical idea, which could be melodic, rhythmic, or harmonic. Composers have been using this for forever. Think Beethoven’s 5th, where <span class=playable>da-da-da-DUM</span> repeats and reappears throughout the piece."
				},
				{
					"type": "text",
					"value": "In the 19th century, German composers started formalizing the idea of attaching a motif to a person, place, or idea within a story (these specific kinds of motifs are referred to as leitmotifs). This technique has been embraced in many mediums from film scores to opera to modern musical theater. Think <span class=playable>Peter and the Wolf</span>, where different instruments and melodies represent different animals in the woods. Or the theme in <span class=playable>“Up”</span>, which captures the idea of Carl and Ellie’s shared life together."
				},
				{
					"type": "text",
					"value": "This creates a musical storytelling shortcut – you can convey story and emotional information without words, just music. The audience can feel this information even if they can’t consciously perceive how it’s being delivered."
				},
				{
					"type": "Image",
					"value": {
						"src": "married-life.gif",
						"caption": "In the <a href=https://www.youtube.com/watch?v=O297xF_tsds&ab_channel=HarshMakwana target=_blank>first four minutes</a> of Pixar’s <i>Up</i>, a melodic motif carries the emotional weight of the story, all without any dialogue."
					}
				},
				{
					"type": "text",
					"value": "Let’s look at all of the motifs in Wicked. Here, I’m just looking at recurring <strong>melodic</strong> ideas that are <strong>sung</strong> (excluding things happening in the orchestra), because those are the most obvious to perceive. There are 6 total, including “unlimited.”"
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "wicked",
						"musical": "wicked",
						"title": "Wicked: All motifs"
					}
				},
				{
					"type": "text",
					"value": "Sung, melodic motifs are even more common in sung-through musicals like <strong>Les Misérables</strong> or <strong>Hamilton</strong>. Wicked is just 19 songs separated by lots of spoken dialogue, while these shows, that more resemble operas, have twice as many songs and almost no spoken dialogue at all. There’s more need and opportunity to rely on musical structure to convey story and emotion."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "lesmis",
						"musical": "lesmis",
						"title": "Les Misérables: All motifs",
						"interactive": "false"
					}
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "hamilton",
						"musical": "hamilton",
						"title": "Hamilton: All motifs",
						"interactive": "false"
					}
				},
				{
					"type": "text",
					"value": "So what exactly are these motifs doing for a story? They’re not just repeating for the sake of it – they’re doing storytelling and emotional heavy lifting.  Let’s look at four specific narrative purposes, using examples from these sung-through musicals, but with patterns you’ll also spot across film, TV, and beyond."
				}
			]
		},
		{
			"section": "character",
			"content": [
				{ "type": "h2", "value": "Representing a character" },
				{
					"type": "text",
					"value": "One of the most straightforward uses of a motif is to represent a character in the story. These motifs can help cue the audience that a character is present, like <span class=playable>Darth Vader</span> or someone from the <span class=playable>Fire Nation</span> in Avatar the Last Airbender. A change in the motif’s instrumentation or tone can signal a change in that character."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "character-motif",
						"musical": "lesmis",
						"title": "Les Misérables: Character motifs",
						"notes": {
							"jvj-1": "This motif is associated with Jean Valjean, the main character. It appears when he’s faced with a difficult decision, figuring out what to do.",
							"jvj-2": "Jean Valjean gets an updated character motif right before the end of the first act, when the story fast forwards several years.",
							"cosette": "This cute little melody is mostly associated with Cosette as a child, but we hear it again near the end of Act 1 when she’s all grown up.",
							"master-of-the-house": "This represents The Thénardiers, the comic relief of the show who are always up to no good."
						}
					}
				},
				{
					"type": "text",
					"value": "In Hamilton, there are often literal introductions of characters to a consistent melody or rhythm."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "character-motif-hamilton",
						"musical": "hamilton",
						"title": "Hamilton: Character motifs"
					}
				}
			]
		},
		{
			"section": "idea",
			"content": [
				{ "type": "h2", "value": "Representing an idea" },
				{
					"type": "text",
					"value": "More often, motifs are a marker for something more abstract – love, heartbreak, adventure – and not always owned by a specific character. Like this Star Wars theme that embodies the concept of <span class=playable>The Force</span>, calling in ideas around destiny, hope, the struggle between good and evil."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "idea",
						"musical": "lesmis",
						"title": "Les Misérables: Idea motifs",
						"notes": {
							"look-down": "One of the most important, enduring motifs of the show. Sung originally by a chain gang of prisoners, represents struggle and hard times.",
							"anguish": "Sung in the darkest times of the battle, after someone important has died.",
							"god-on-high": "Sounds like a hymn, Valjean praying / appealing to God. Represents mercy, divine protection, vulnerability of asking for help.",
							"drink-with-me": "Sung by the students at the barricade, represents friendship and camaraderie in dark times."
						}
					}
				}
			]
		},
		{
			"section": "layers",
			"content": [
				{ "type": "h2", "value": "Creating emotional layers" },
				{
					"type": "text",
					"value": "Why does that <a href=https://www.youtube.com/watch?v=O297xF_tsds&ab_channel=HarshMakwana target=_blank>scene</a> from “Up” make everyone cry? It establishes a simple melodic <span class=playable>motif</span> that comes to represent Carl & Ellie’s adventure together. But the real emotional weight comes from the fact that we hear it both in moments of joy and in moments of loss and heartbreak, each appearance carrying the previous memories with it. We feel the weight of the past layered onto the present moment, which makes it hit even harder."
				},
				{
					"type": "text",
					"value": "The following motifs repeat, but with drastically different emotions across the show."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "new-emotion",
						"musical": "lesmis",
						"title": "Les Misérables: Motifs with emotional changes",
						"notes": {
							"friendship": "Introduced at the very start when a bishop helps out Jean Valjean in a time of need, and brought back at the very end when Marius is grieving the loss of all his friends.",
							"lovely-ladies": "Introduced early on when we meet the prostitutes, pimps, and sailors that surround Fantine. Comes back at the end when the women are reflecting on the battle and loss.",
							"rain": "Sung first by Marius asking Eponine to do him a favor, in a moment where they connect. Comes back when Marius is holding Eponine as she is dying.",
							"little-people": "This motif represents Gavroche, a courageous young kid who joins the rebellion. Introduced with a brave, joyful energy, and comes back when he is killed :("
						}
					}
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "new-emotion-hamilton",
						"musical": "hamilton",
						"title": "Hamilton: Motifs with emotional changes",
						"notes": {
							"counting": "This counting melody is both an introduction to the violent duel and a tune little Phillip sings and plays on the piano.",
							"i-imagine-death": "Hamilton says “I imagine death so much it feels more like a memory” 3 times – going from contemplative to fearless to literally facing death."
						}
					}
				}
			]
		},
		{
			"section": "together",
			"content": [
				{ "type": "h2", "value": "Weaving everything together" },
				{
					"type": "text",
					"value": "Both Les Miserables and Hamilton have a song at the end of the first act where many of the motifs introduced so far all come together. The audience is reminded of everything we’ve learned and seen so far, and the most important threads of the story collide and are woven together."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "one-day-more",
						"musical": "lesmis",
						"title": "Les Miserables: One Day More"
					}
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "nonstop",
						"musical": "hamilton",
						"title": "Hamilton: Non-Stop"
					}
				}
			]
		},
		{
			"section": "explore",
			"content": [
				{ "type": "h2", "value": "Explore" },
				{
					"type": "text",
					"value": "Explore all the motifs we found in Hamilton, Les Miserables, and Wicked."
				},
				{ "type": "Explore", "value": {} },
				{
					"type": "text",
					"value": "Hear a motif that we missed? Reach out at michelle@pudding.cool."
				}
			]
		}
	]
}
`;var zt=x('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code></section>');function Wt(e,t){B(t,!0);const{body:a}=ht;var n=zt(),s=b(g(n),2),d=g(s),m=g(d,!0);v(d),v(s),v(n),j(p=>M(m,p),[()=>Ht.replace(/\t/g," ")]),w(e,n),F()}const Bt=(e,t=G)=>{var a=Ft(),n=g(a),s=g(n,!0);v(n);var d=b(n,2),m=g(d,!0);v(d),v(a),j(()=>{M(s,t().name),M(m,t().age)}),w(e,a)};var Ft=x('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Nt=(e,t)=>rt(t),$t=(e,t)=>t.random(Math.floor(Math.random()*10)),qt=x('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Jt(e,t){B(t,!0),O(t,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let n=S(0),s=W(()=>u(n)*2),d=W(()=>u(n)*2),m=S(0);H(()=>{D(m,u(n)*2)});var p=qt(),_=b(z(p),4);_.__click=[Nt,n];var r=b(_,2),i=g(r);v(r);var o=b(r,2),l=g(o);v(o);var y=b(o,2),c=g(y);v(y);var h=b(y,4),C=g(h);tt(C,()=>t.children??G),v(h);var f=b(h,4);f.__click=[$t,t];var T=b(f,4);N(T,21,()=>a,$,(k,E)=>{Bt(k,()=>u(E))}),v(T),j(()=>{M(i,`${u(n)??""} doubled is ${u(s)??""} (derived)`),M(l,`${u(n)??""} doubled is ${u(d)??""} (derived by)`),M(c,`${u(n)??""} doubled is ${u(m)??""} ($effect)`)}),w(e,p),F()}it(["click"]);const Pt=(e,t)=>{let a=S(st(e)),n=S(null),s=S(!0),d=S(void 0);const m=(r=!0)=>{D(s,r,!0),r===!0&&(D(d,null),D(n,null))},p=async()=>{try{const r=await fetch(u(a),t);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let i;if(u(a).includes(".csv")){const o=await r.text();i=wt(o)}else i=await r.json();return[null,i]}catch(r){const{errorMessage:i="Unexpected error eccurred"}=r;return[i,null]}},_=async r=>{m(!0);const[i,o]=await p();if(r===u(a)){if(i){m(!1),D(d,i,!0);return}m(!1),D(n,o,!0)}};return H(()=>{_(u(a))}),{get data(){return u(n)},get loading(){return u(s)},get error(){return u(d)},get url(){return u(a)},set url(r){u(a)!==r&&D(a,r,!0)}}};var Zt=x("<p>loading data...</p>"),Gt=x("<p> </p>"),Yt=x("<p>data loaded</p> <pre> </pre>",1),Qt=x('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Kt(e,t){B(t,!0);const a=`${pt}/assets/demo/test.csv`,n=Pt(a);H(()=>{});var s=Qt(),d=b(g(s),2),m=g(d);{var p=r=>{var i=Zt();w(r,i)},_=(r,i)=>{{var o=y=>{var c=Gt(),h=g(c);v(c),j(()=>M(h,`error: ${n.error??""}`)),w(y,c)},l=y=>{var c=Yt(),h=b(z(c),2),C=g(h,!0);v(h),j(f=>M(C,f),[()=>JSON.stringify(n.data,null,2)]),w(y,c)};Q(r,y=>{n.error?y(o):y(l,!1)},i)}};Q(m,r=>{n.loading?r(p):r(_,!1)})}v(d),v(s),w(e,s),F()}var Xt=x('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function te(e){let t=S(0);function a(l){console.log(l)}var n=Xt(),s=b(g(n),2);Jt(s,{random:a,get value(){return u(t)},set value(l){D(t,l,!0)}});var d=b(s,2);kt(d);var m=b(d,2);Tt(m);var p=b(m,2);At(p);var _=b(p,2);Et(_);var r=b(_,2);Wt(r,{});var i=b(r,2);Kt(i,{});var o=b(i,2);Ut(o),v(n),w(e,n)}function he(e){te(e)}export{he as component};
