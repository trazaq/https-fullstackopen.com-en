(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(13),u=t.n(l),c=t(2),o=function(e){var n=e.person;return r.a.createElement("p",null,n.name," ",n.number)},m=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("tr",null,r.a.createElement("td",null,n.name),r.a.createElement("td",null,n.number),r.a.createElement("td",null,r.a.createElement("button",{type:"button",onClick:function(){return t(n)}},"delete")))},i=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,l=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:l,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"addNotification"},n)},s=t(3),f=t.n(s),b="/api/persons",E=function(){return f.a.get(b)},h=function(e){return f.a.post(b,e)},p=function(e){return f.a.delete("".concat(b,"/").concat(e))},v=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],l=n[1],u=Object(a.useState)(""),s=Object(c.a)(u,2),f=s[0],b=s[1],v=Object(a.useState)(""),g=Object(c.a)(v,2),w=g[0],j=g[1],N=Object(a.useState)(""),O=Object(c.a)(N,2),C=O[0],k=O[1],y=Object(a.useState)(null),S=Object(c.a)(y,2),P=S[0],x=S[1],D=function(e){var n=e.id;!0===window.confirm("Delete ".concat(e.name," ?"))&&p(n).then((function(){l(t.filter((function(e){return e.id!==n})))})).catch((function(e){console.log(e)}))};return Object(a.useEffect)((function(){E().then((function(e){l(e.data)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{message:P}),r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{type:"text",value:C,onChange:function(e){k(e.target.value)}})),r.a.createElement("br",null),r.a.createElement(i,{addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name===f})))alert(f+" is already added to the phonebook");else{var n={name:f,number:w};h(n).then((function(e){l(t.concat(e.data))})),b(""),j(""),k(""),x("Added ".concat(n.name)),setTimeout((function(){x(null)}),4e3)}},newName:f,handleNameChange:function(e){b(e.target.value)},newNumber:w,handleNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("table",null,r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement(m,{key:e.id,person:e,deletePerson:D})})))),r.a.createElement("div",null,r.a.createElement("h2",null,"Search Results"),(""!==C?t.filter((function(e){return e.name.toLowerCase().match(""===C?"^ .*$":"^".concat(C.toLowerCase(),".*$"))})):[]).map((function(e){return r.a.createElement(o,{key:e.name,person:e})}))))};t(36);u.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a417e617.chunk.js.map