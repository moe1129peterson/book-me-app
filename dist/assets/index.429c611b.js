import{c as $,a as b,r as d,o as c,b as f,d as u,e as a,f as B,t as m,p as x,g as S,h,w,F as v,i as y,j as R,k as N,l as V,m as I,n as U}from"./vendor.57c46d22.js";const A=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}};A();const H=()=>({searchResults:[],booksWantToRead:[],booksHaveRead:[]}),L={getUrl:()=>location.hostname.includes("localhost")?"http://localhost:3000/api":""},C={async searchBooks(r,t){try{let e=await b({method:"GET",url:`https://openlibrary.org/search.json?q=${t.query}`});e.status===200?r.commit("updateResults",e.data.docs):console.error(e)}catch(e){throw e}}},P={updateResults(r,t){r.searchResults=[];for(let e of t)e.isbn&&e.title&&e.author_name&&r.searchResults.push({coverUrl:e.isbn[0],title:e.title,author:e.author_name[0]})}};var Q=$({state:H,getters:L,actions:C,mutations:P});var _=(r,t)=>{for(const[e,l]of t)r[e]=l;return r};const j={};function q(r,t){const e=d("router-view");return c(),f(e)}var O=_(j,[["render",q]]);const E={name:"Search",props:{modelValue:{type:String}},methods:{updateValue(r){this.$emit("update:modelValue",r.target.value)}}},F=["value"];function K(r,t,e,l,o,s){return c(),u("input",{type:"text",value:e.modelValue,onInput:t[0]||(t[0]=(...n)=>s.updateValue&&s.updateValue(...n))},null,40,F)}var T=_(E,[["render",K]]);const M={name:"Book Preview",props:{coverUrl:{type:String},title:{type:String},author:{type:String}},methods:{toggleReadLater(r){console.log(this.$store.getters.getUrl)},toggleHaveRead(r){}}},g=r=>(x("data-v-3d835eb0"),r=r(),S(),r),W={id:"previewCard"},D={class:"coverImg"},G=["src"],z={class:"bookInfo"},J={class:"action-btns"},X=g(()=>a("i",{class:"far fa-bookmark"},null,-1)),Y=[X],Z=g(()=>a("i",{class:"fas fa-book-open"},null,-1)),ee=[Z];function te(r,t,e,l,o,s){return c(),u("div",W,[a("div",D,[e.coverUrl?(c(),u("img",{key:0,class:"book-cover",src:`https://covers.openlibrary.org/b/isbn/${e.coverUrl}-M.jpg`},null,8,G)):B("",!0)]),a("div",z,[a("h2",null,m(e.title),1),a("h4",null,m(e.author),1)]),a("div",J,[a("button",{onClick:t[0]||(t[0]=n=>s.toggleReadLater(e.title))},Y),a("button",{onClick:t[1]||(t[1]=n=>s.toggleHaveRead(e.title))},ee)])])}var oe=_(M,[["render",te],["__scopeId","data-v-3d835eb0"]]);const re={data(){return{searchQuery:""}},components:{SearchInput:T,BookPreview:oe},methods:{searchBooks(r){this.$store.dispatch("searchBooks",{query:r})}},computed:{searchResults(){return this.$store.state.searchResults}}},se={class:"centered-div"},ne={id:"search-list"};function ae(r,t,e,l,o,s){const n=d("SearchInput"),p=d("BookPreview");return c(),u("div",se,[a("div",null,[h(n,{class:"search-input",modelValue:o.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=i=>o.searchQuery=i),onKeyup:t[1]||(t[1]=w(i=>s.searchBooks(o.searchQuery),["enter"]))},null,8,["modelValue"]),a("button",{id:"search-btn",onClick:t[2]||(t[2]=i=>s.searchBooks(o.searchQuery))},"Search")]),a("ul",ne,[(c(!0),u(v,null,y(s.searchResults,(i,k)=>(c(),u("li",{key:k},[h(p,{coverUrl:i.coverUrl,title:i.title,author:i.author},null,8,["coverUrl","title","author"])]))),128))])])}var ce=_(re,[["render",ae],["__scopeId","data-v-63773cf8"]]);const le={name:"Home",components:{BookSearch:ce}};function ue(r,t,e,l,o,s){const n=d("NavBar"),p=d("BookSearch");return c(),u(v,null,[h(n),h(p)],64)}var ie=_(le,[["render",ue]]);const de={name:"Nav Bar",data(){return{links:[{name:"Home",text:"Home",path:"/"},{name:"About",text:"About",path:"/about"}]}}},_e={class:"nav"};function pe(r,t,e,l,o,s){const n=d("router-link");return c(),u("div",_e,[a("ul",null,[(c(!0),u(v,null,y(o.links,(p,i)=>(c(),u("li",{key:i},[h(n,{to:p.path},{default:R(()=>[N(m(p.text),1)]),_:2},1032,["to"])]))),128))])])}var he=_(de,[["render",pe]]);const me={name:"About",components:{NavBar:he}};function ve(r,t,e,l,o,s){const n=d("NavBar");return c(),f(n)}var fe=_(me,[["render",ve]]);const ye=V({history:I(),routes:[{path:"/",name:"Home",component:ie},{path:"/about",name:"About",component:fe}]});U(O).use(Q).use(ye).mount("#app");
