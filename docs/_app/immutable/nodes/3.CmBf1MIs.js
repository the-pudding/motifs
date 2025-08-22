import"../chunks/CWj6FrbW.js";import{Z as k,_ as w,ar as b,a0 as g,a1 as f,as as P,aq as U,au as at,t as M,D as d,at as B,Y as q,u as O,$ as H,R as Z,F as I,ap as j,aG as ot,aH as rt,E as it}from"../chunks/fBKsZc_b.js";import{a as T,e as st}from"../chunks/CriGG3rq.js";import{e as N,i as $,s as lt}from"../chunks/BMJXDOGm.js";import{e as ct,c as ht}from"../chunks/1yhq42if.js";import{c as ut,b as dt,i as Q}from"../chunks/DDt6elup.js";import{s as mt,p as z}from"../chunks/BMWhG1yo.js";import{s as tt}from"../chunks/BRN3BfzH.js";import{b as pt}from"../chunks/Cafl7pnO.js";var K={},F={},J=34,W=10,G=13;function et(e){return new Function("d","return {"+e.map(function(t,a){return JSON.stringify(t)+": d["+a+'] || ""'}).join(",")+"}")}function vt(e,t){var a=et(e);return function(n,i){return t(a(n),i,e)}}function X(e){var t=Object.create(null),a=[];return e.forEach(function(n){for(var i in n)i in t||a.push(t[i]=i)}),a}function A(e,t){var a=e+"",n=a.length;return n<t?new Array(t-n+1).join(0)+a:a}function ft(e){return e<0?"-"+A(-e,6):e>9999?"+"+A(e,6):A(e,4)}function gt(e){var t=e.getUTCHours(),a=e.getUTCMinutes(),n=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":ft(e.getUTCFullYear())+"-"+A(e.getUTCMonth()+1,2)+"-"+A(e.getUTCDate(),2)+(i?"T"+A(t,2)+":"+A(a,2)+":"+A(n,2)+"."+A(i,3)+"Z":n?"T"+A(t,2)+":"+A(a,2)+":"+A(n,2)+"Z":a||t?"T"+A(t,2)+":"+A(a,2)+"Z":"")}function yt(e){var t=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function n(o,l){var y,c,h=i(o,function(C,v){if(y)return y(C,v-1);c=C,y=l?vt(C,l):et(C)});return h.columns=c||[],h}function i(o,l){var y=[],c=o.length,h=0,C=0,v,S=c<=0,_=!1;o.charCodeAt(c-1)===W&&--c,o.charCodeAt(c-1)===G&&--c;function R(){if(S)return F;if(_)return _=!1,K;var L,V=h,D;if(o.charCodeAt(V)===J){for(;h++<c&&o.charCodeAt(h)!==J||o.charCodeAt(++h)===J;);return(L=h)>=c?S=!0:(D=o.charCodeAt(h++))===W?_=!0:D===G&&(_=!0,o.charCodeAt(h)===W&&++h),o.slice(V+1,L-1).replace(/""/g,'"')}for(;h<c;){if((D=o.charCodeAt(L=h++))===W)_=!0;else if(D===G)_=!0,o.charCodeAt(h)===W&&++h;else if(D!==a)continue;return o.slice(V,L)}return S=!0,o.slice(V,c)}for(;(v=R())!==F;){for(var E=[];v!==K&&v!==F;)E.push(v),v=R();l&&(E=l(E,C++))==null||y.push(E)}return y}function u(o,l){return o.map(function(y){return l.map(function(c){return s(y[c])}).join(e)})}function m(o,l){return l==null&&(l=X(o)),[l.map(s).join(e)].concat(u(o,l)).join(`
`)}function p(o,l){return l==null&&(l=X(o)),u(o,l).join(`
`)}function x(o){return o.map(r).join(`
`)}function r(o){return o.map(s).join(e)}function s(o){return o==null?"":o instanceof Date?gt(o):t.test(o+="")?'"'+o.replace(/"/g,'""')+'"':o}return{parse:n,parseRows:i,format:m,formatBody:p,formatRows:x,formatRow:r,formatValue:s}}var bt=yt(","),wt=bt.parse,xt=k('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function _t(e){var t=xt();w(e,t)}var kt=k('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function St(e){var t=kt();w(e,t)}var Ct=k('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function At(e){const t=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=Ct(),n=b(g(a),2);N(n,17,()=>t,$,(i,u)=>{let m=()=>d(u).tag,p=()=>d(u).text;var x=P(),r=U(x);ct(r,m,!1,(s,o)=>{var l=at();M(()=>T(l,p())),w(o,l)}),w(i,x)}),f(a),w(e,a)}var Tt=k("<p> </p>");function Mt(e,t){var a=Tt(),n=g(a);f(a),M(()=>T(n,`I am component A and my favorite number is ${t.number??""}.`)),w(e,a)}var It=k("<p> </p>");function Dt(e,t){var a=It(),n=g(a);f(a),M(()=>T(n,`I am component B and my name is ${t.name??""}.`)),w(e,a)}var jt=k('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Rt(e){const t={A:Mt,B:Dt},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var n=jt(),i=b(g(n),2);N(i,17,()=>a,$,(u,m)=>{var p=P();const x=B(()=>t[d(m).component]);var r=U(p);ut(r,()=>d(x),(s,o)=>{o(s,mt(()=>d(m)))}),w(u,p)}),f(n),w(e,n)}var Et=k("<div><!></div>");function Lt(e,t){q(t,!0);let a=z(t,"root",3,null),n=z(t,"top",3,0),i=z(t,"bottom",3,0),u=z(t,"increments",3,100),m=z(t,"value",15,void 0),p=[],x=[],r=[],s=[],o;function l(){let v=0,S=0;for(let _=0;_<p.length;_++)p[_]>v&&(v=p[_],S=_);v>0?m(S):m(void 0)}function y(v,S){const _=Y=>{Y[0].isIntersecting;const nt=Y[0].intersectionRatio;p[S]=nt,l()},R=n()?n()*-1:0,E=i()?i()*-1:0,L=`${R}px 0px ${E}px 0px`,V={root:a(),rootMargin:L,threshold:x};s[S]&&s[S].disconnect();const D=new IntersectionObserver(_,V);D.observe(v),s[S]=D}function c(){r.length&&r.forEach(y)}O(()=>{for(let v=0;v<u()+1;v++)x.push(v/u());r=o.querySelectorAll(":scope > *:not(iframe)"),c()}),O(()=>{n(),i(),c()});var h=Et(),C=g(h);tt(C,()=>t.children??Z),f(h),dt(h,v=>o=v,()=>o),w(e,h),H()}var Vt=k('<div><p class="svelte-12sq0x6"> </p></div>'),zt=k('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function Wt(e){let t=j(void 0);var a=zt(),n=g(a),i=b(g(n)),u=g(i,!0);f(i),f(n);var m=b(n,4);Lt(m,{get value(){return d(t)},set value(p){I(t,p,!0)},children:(p,x)=>{var r=P(),s=U(r);N(s,16,()=>[0,1,2,3,4],$,(o,l,y)=>{var c=Vt();const h=B(()=>d(t)===y);let C;var v=g(c),S=g(v,!0);f(v),f(c),M(_=>{C=lt(c,1,"step svelte-12sq0x6",null,C,_),T(S,l)},[()=>({active:d(h)})]),w(o,c)}),w(p,r)},$$slots:{default:!0}}),ot(2),f(a),M(()=>T(u,d(t)||"-")),w(e,a)}const Ot=`{
	"body": [
		{
			"section": "intro",
			"content": [
				{
					"type": "text",
					"value": "<span class=playable data-id=unlimited>Listen to this line</span> from the musical Wicked."
				},
				{
					"type": "text",
					"value": "As a nod to The Wizard of Oz, Wicked composer Stephen Schwartz <a href=https://musicalschwartz.com/wicked-musical-themes.htm target=_blank>borrowed</a> the notes from “Somewhere Over The Rainbow”, put a different chord underneath, and slightly changed the rhythm. It’s pretty subtle and probably not something a listener would discern, but a nice callback to the musical’s original source material."
				},
				{
					"type": "text",
					"value": "<span class=playable>Unlimited</span> vs. <span class=playable>Somewhere Over The Rainbow</span>"
				},
				{
					"type": "text",
					"value": "What really makes this “unlimited” line iconic though, is that it repeats 3 times throughout the show, all at pivotal moments for the main character, Elphaba. Each time it’s repeated, it builds in emotional depth, subconsciously transporting you back to the earlier occurrences and prompting the audience to reflect on the change we’ve seen."
				},
				{
					"type": "ArcViz",
					"value": {
						"id": "unlimited",
						"musical": "wicked",
						"title": "Wicked: “Unlimited” motif"
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
					"value": "In the 19th century, German composers started formalizing the idea of attaching a motif to a person, place, or idea within a story (these specific kinds of motifs are referred to as leitmotifs). Think <span class=playable>Peter and the Wolf</span>, where different instruments and melodies represent different animals in the woods. Or the theme from Star Wars where you can tell that <span class=playable>Darth Vader is coming</span> by hearing that signature melody."
				},
				{
					"type": "text",
					"value": "This creates a musical storytelling shortcut - you can convey story and emotional information without words, just music. The audience can feel this information even if they can’t consciously perceive how it’s being delivered."
				},
				{ "type": "text", "value": "[“Up” example?]" },
				{
					"type": "text",
					"value": "This technique has been embraced in many mediums from film scores to opera to modern musical theater."
				}
			]
		},
		{
			"section": "level-up",
			"content": [
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
					"value": "Now, I love Wicked, but it is not my favorite musical. That’s because I’m a music / story nerd, and I know that if I really want to see this technique of conveying story and emotion through melody, I should look elsewhere:"
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
					"type": "text",
					"value": "Les Miserables is a musical that’s known for its heavy use of motifs. The musical is sung-through (like an opera), there is almost no spoken dialogue at all, different from Wicked, which has less than half as many songs separated by lots of spoken dialogue. So in Les Miserables, this musical structure does a lot to help the audience both understand and feel the emotional impact of the story."
				}
			]
		},
		{
			"section": "techniques",
			"content": [
				{
					"type": "text",
					"value": "Let’s look at some of the ways that Les Miserables uses motifs to convey information."
				},
				{
					"type": "CollapsibleSection",
					"value": {
						"title": "When a motif represents a character",
						"content": [
							{
								"type": "text",
								"value": "Here are some motifs that are strongly associated with specific characters in the show."
							},
							{
								"type": "text",
								"value": "These motifs can help cue the audience that a certain character is present. And as they recur, they gain that emotional weight over time as we see these characters growing and changing."
							},
							{
								"type": "ArcViz",
								"value": {
									"id": "character-motif",
									"musical": "lesmis",
									"title": "Les Misérables: Character motifs"
								}
							},
							{
								"type": "text",
								"value": "Some annotations to attach to the chart when each motif is playing:"
							},
							{
								"type": "text",
								"value": "* jvj 1 / jvj 2: Jean Valjean, the main character. This motif often appears when he’s faced with a difficult decision, figuring out what to do. Interestingly, he gets a new character motif right before the end of the first act, when we fast forward several years (his older, more mature version)."
							},
							{
								"type": "text",
								"value": "* cosette: A cute little melody mostly associated with Cosette as a child, but we hear it again near the end of Act 1 when she’s grown up."
							},
							{
								"type": "text",
								"value": "* thenardier waltz: Represents The Thenardiers, the comic relief of the show who are always up to no good, trying to trick people."
							},
							{
								"type": "text",
								"value": "* little people: Represents Gavroche, a courageous young kid who joins the rebellion. Introduced in a fun, light song, and recurs when he’s killed :("
							},
							{
								"type": "text",
								"value": "In Hamilton, there are often literal introductions of characters whose tunes / rhythms carry through the show."
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
					}
				},
				{
					"type": "CollapsibleSection",
					"value": {
						"title": "When a motif represents an idea",
						"content": [
							{
								"type": "text",
								"value": "More often, motifs are a marker for something more abstract – love, heartbreak, tension – and not always owned by a specific character."
							},
							{
								"type": "ArcViz",
								"value": {
									"id": "idea",
									"musical": "lesmis",
									"title": "Les Misérables: Idea motifs"
								}
							},
							{
								"type": "text",
								"value": "Some annotations to attach to the chart when each motif is playing:"
							},
							{
								"type": "text",
								"value": "* look down: One of the most important, enduring motifs of the show. Sung originally by a chain gang of prisoners, represents struggle and hard times."
							},
							{
								"type": "text",
								"value": "* anguish: Sung in the darkest times of the battle, after someone important has died."
							},
							{
								"type": "text",
								"value": "* god on high: Sounds like a hymn, Valjean praying / appealing to God. Represents mercy, divine protection, vulnerability of asking for help."
							},
							{
								"type": "text",
								"value": "* drink with me: Sung by the students at the barricade, represents friendship and camaraderie in dark times."
							},
							{
								"type": "text",
								"value": "These two motifs often come in a pair, and signal a situation where an authority figure has arrived and wants answers. The response has sort of a de-escalatory tone."
							},
							{
								"type": "ArcViz",
								"value": {
									"id": "idea-ab",
									"musical": "lesmis",
									"title": "Les Misérables: A/B structure"
								}
							}
						]
					}
				},
				{
					"type": "CollapsibleSection",
					"value": {
						"title": "Same motif, new emotion",
						"content": [
							{
								"type": "text",
								"value": "This is one of the most powerful things a motif can do. When we hear a sad melody repurposed in a happy moment or vice versa, it brings in an emotional complexity – we feel both together, makes a richer, more layered emotion."
							},
							{
								"type": "ArcViz",
								"value": {
									"id": "new-emotion",
									"musical": "lesmis",
									"title": "Les Misérables: Motifs with emotional changes"
								}
							},
							{
								"type": "text",
								"value": "Some annotations to attach to the chart when each motif is playing:"
							},
							{
								"type": "text",
								"value": "* friendship: Introduced at the very start when a bishop helps out Jean Valjean in a time of need, and brought back at the very end when Marius is grieving the loss of all his friends."
							},
							{
								"type": "text",
								"value": "* lovely ladies: Introduced early on when we meet the prostitutes, pimps, and sailors that surround Fantine. Comes back at the end when the women are reflecting on the battle and loss."
							},
							{
								"type": "text",
								"value": "* rain: Sung first by Marius asking Eponine to do him a favor, in a moment where they connect. Comes back when Marius is holding Eponine as she is dying."
							},
							{ "type": "text", "value": "* little people: :(" },
							{ "type": "text", "value": "Same thing in Hamilton." },
							{
								"type": "ArcViz",
								"value": {
									"id": "new-emotion-hamilton",
									"musical": "hamilton",
									"title": "Hamilton: Motifs with emotional changes"
								}
							},
							{
								"type": "text",
								"value": "Some annotations to attach to the chart when each motif is playing:"
							},
							{
								"type": "text",
								"value": "* counting: Goes from confrontational to fun/child-like to tragic"
							},
							{
								"type": "text",
								"value": "* i imagine death: contemplative -> invincible -> actually facing death"
							}
						]
					}
				},
				{
					"type": "CollapsibleSection",
					"value": {
						"title": "When all of them come together",
						"content": [
							{
								"type": "text",
								"value": "Both Les Miserables and Hamilton have a song at the end of the first act where many of the motifs introduced so far all come together."
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
							},
							{ "type": "text", "value": "Annotations for each of these Tk" }
						]
					}
				}
			]
		},
		{
			"section": "explore",
			"content": [
				{
					"type": "text",
					"value": "Conclusion Tk something about how this is such a strong force but one that we don’t consciously perceive most of the time, which is cool!"
				},
				{ "type": "text", "value": "Explore all the motifs!" },
				{ "type": "Explore", "value": {} }
			]
		}
	]
}
`;var Ut=k('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code></section>');function Bt(e,t){q(t,!0);const{body:a}=ht;var n=Ut(),i=b(g(n),2),u=g(i),m=g(u,!0);f(u),f(i),f(n),M(p=>T(m,p),[()=>Ot.replace(/\t/g," ")]),w(e,n),H()}const qt=(e,t=Z)=>{var a=Ht(),n=g(a),i=g(n,!0);f(n);var u=b(n,2),m=g(u,!0);f(u),f(a),M(()=>{T(i,t().name),T(m,t().age)}),w(e,a)};var Ht=k('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Nt=(e,t)=>rt(t),$t=(e,t)=>t.random(Math.floor(Math.random()*10)),Ft=k('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Jt(e,t){q(t,!0),z(t,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let n=j(0),i=B(()=>d(n)*2),u=B(()=>d(n)*2),m=j(0);O(()=>{I(m,d(n)*2)});var p=Ft(),x=b(U(p),4);x.__click=[Nt,n];var r=b(x,2),s=g(r);f(r);var o=b(r,2),l=g(o);f(o);var y=b(o,2),c=g(y);f(y);var h=b(y,4),C=g(h);tt(C,()=>t.children??Z),f(h);var v=b(h,4);v.__click=[$t,t];var S=b(v,4);N(S,21,()=>a,$,(_,R)=>{qt(_,()=>d(R))}),f(S),M(()=>{T(s,`${d(n)??""} doubled is ${d(i)??""} (derived)`),T(l,`${d(n)??""} doubled is ${d(u)??""} (derived by)`),T(c,`${d(n)??""} doubled is ${d(m)??""} ($effect)`)}),w(e,p),H()}st(["click"]);const Gt=(e,t)=>{let a=j(it(e)),n=j(null),i=j(!0),u=j(void 0);const m=(r=!0)=>{I(i,r,!0),r===!0&&(I(u,null),I(n,null))},p=async()=>{try{const r=await fetch(d(a),t);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let s;if(d(a).includes(".csv")){const o=await r.text();s=wt(o)}else s=await r.json();return[null,s]}catch(r){const{errorMessage:s="Unexpected error eccurred"}=r;return[s,null]}},x=async r=>{m(!0);const[s,o]=await p();if(r===d(a)){if(s){m(!1),I(u,s,!0);return}m(!1),I(n,o,!0)}};return O(()=>{x(d(a))}),{get data(){return d(n)},get loading(){return d(i)},get error(){return d(u)},get url(){return d(a)},set url(r){d(a)!==r&&I(a,r,!0)}}};var Pt=k("<p>loading data...</p>"),Zt=k("<p> </p>"),Yt=k("<p>data loaded</p> <pre> </pre>",1),Qt=k('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Kt(e,t){q(t,!0);const a=`${pt}/assets/demo/test.csv`,n=Gt(a);O(()=>{});var i=Qt(),u=b(g(i),2),m=g(u);{var p=r=>{var s=Pt();w(r,s)},x=(r,s)=>{{var o=y=>{var c=Zt(),h=g(c);f(c),M(()=>T(h,`error: ${n.error??""}`)),w(y,c)},l=y=>{var c=Yt(),h=b(U(c),2),C=g(h,!0);f(h),M(v=>T(C,v),[()=>JSON.stringify(n.data,null,2)]),w(y,c)};Q(r,y=>{n.error?y(o):y(l,!1)},s)}};Q(m,r=>{n.loading?r(p):r(x,!1)})}f(u),f(i),w(e,i),H()}var Xt=k('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function te(e){let t=j(0);function a(l){console.log(l)}var n=Xt(),i=b(g(n),2);Jt(i,{random:a,get value(){return d(t)},set value(l){I(t,l,!0)}});var u=b(i,2);_t(u);var m=b(u,2);St(m);var p=b(m,2);At(p);var x=b(p,2);Rt(x);var r=b(x,2);Bt(r,{});var s=b(r,2);Kt(s,{});var o=b(s,2);Wt(o),f(n),w(e,n)}function he(e){te(e)}export{he as component};
