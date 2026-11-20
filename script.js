
var pages=["home","about","properties","projects","services","process","emi","contact"],nav=document.getElementById("nav"),mb=document.getElementById("mb");

function route(){
 var hash=(location.hash||"#home").slice(1),
 parts=hash.split("?"),
 h=parts[0],
 params=new URLSearchParams(parts[1]||"");

 if(pages.indexOf(h)<0)h="home";

 pages.forEach(function(p){
  var section=document.getElementById(p);
  if(section)section.classList.toggle("on",p===h);
 });

 document.querySelectorAll("#nav a").forEach(function(a){
  a.classList.toggle("on",a.getAttribute("href")==="#"+h&&!a.classList.contains("cl"));
 });

 if(h==="properties")setPropertyFilter(params.get("type")||"all");

 nav.classList.remove("open");
 mb.setAttribute("aria-expanded","false");
 window.scrollTo(0,0);
}

window.addEventListener("hashchange",route);
route();

mb.addEventListener("click",function(){
 var o=nav.classList.toggle("open");
 mb.setAttribute("aria-expanded",o);
});

function wa(m){
 window.open("https://wa.me/919319113716?text="+encodeURIComponent(m),"_blank");
}

function limitPhone(input){
 input.value=input.value.replace(/\D/g,"").slice(0,10);
}

var LOCATIONS=[
 "Greater Noida — 201310",
 "Greater Noida West — 201318",
 "Noida — 201301",
 "Noida — 201310",
 "Noida Expressway — 201303",
 "Indirapuram, Ghaziabad — 201014",
 "Vasundhara, Ghaziabad — 201012",
 "Vaishali, Ghaziabad — 201019",
 "Siddharth Vihar, Ghaziabad — 201009",
 "Aditya World City, NH 24 Ghaziabad — 201002",
 "Wave City, NH 24 Ghaziabad — 201010",
 "Sikandrabad — 203205",
 "Dadri — 203207",
 "Surajpur — 201306"
];

function fillLocations(select){
 select.innerHTML="";
 select.appendChild(new Option("Choose a location",""));

 LOCATIONS.forEach(function(location){
  select.appendChild(new Option(location,location));
 });
}

fillLocations(document.getElementById("hloc"));
fillLocations(document.getElementById("property-enquiry-location"));

/* PROPERTY DATA */

var DATA={
 "Residential Houses / Apartments":{
  "Buy / Sale":{"Renowned Properties":"From ₹35 Lakh onwards"},
  "Renting":{"Renowned Properties":"From ₹15,000 per month onwards"}
 },
 "New Projects":{
  "High Rise Apartments":{
   "Pre-Launch":"From ₹1.25 Cr onwards",
   "Under Construction":"From ₹1.25 Cr onwards",
   "Near Possession":"From ₹1.25 Cr onwards",
   "Ready To Move":"From ₹1.25 Cr onwards"
  },
  "Low Rise Builder Floors":{
   "Pre-Launch":"From ₹2 Cr onwards",
   "Under Construction":"From ₹2 Cr onwards",
   "Near Possession":"From ₹2 Cr onwards",
   "Ready To Move":"From ₹2 Cr onwards"
  },
  "Commercial Complex":{
   "Pre-Launch":"From ₹60 Lakh onwards",
   "Under Construction":"From ₹60 Lakh onwards",
   "Near Possession":"From ₹60 Lakh onwards",
   "Ready To Move":"From ₹60 Lakh onwards"
  }
 },
 "Office Spaces":{
  "Buy / Sale":{"":"From ₹25 Lakh onwards"},
  "Renting":{"":"From ₹20,000 per month onwards"}
 },
 "Commercial / Studio (Pre-Leased) / Lock-in":{
  "Buy / Sale":{
   "New Properties":"From ₹60 Lakh onwards",
   "Renowned Properties":"From ₹60 Lakh onwards"
  },
  "Renting":{
   "New Properties":"From ₹25,000 per month onwards",
   "Renowned Properties":"From ₹25,000 per month onwards"
  }
 },
 "Industrial Building, PEB and Factories":{
  "Buy / Sale":{"":"From ₹25,000 per sq yard"},
  "Renting":{"":"From ₹150 per sq yard onwards"}
 },
 "Raw Land":{
  "Plots (Buy / Sale)":{
   "Authority":"From ₹50,000 per sq yard onwards",
   "6% Under Authority":"From ₹35,000 per sq yard onwards"
  },
  "Industrial Land":{
   "Government Approved":"From ₹1 Lakh per sq yard",
   "Freehold":"From ₹90,000 per sq yard onwards"
  },
  "Farmhouse Land":{
   "Freehold":"From ₹60,000 per sq yard onwards"
  }
 }
};

function fill(sel,arr){
 sel.innerHTML="";
 arr.forEach(function(a){
  sel.appendChild(new Option(a,a));
 });
}

function bindProp(ids){
 var T=document.getElementById(ids.t),
 C=document.getElementById(ids.c),
 SW=document.getElementById(ids.sw),
 S=document.getElementById(ids.s),
 B=document.getElementById(ids.b);

 function onS(){
  var specs=(DATA[T.value]||{})[C.value]||{};
  B.value=specs[S.value]||"";
 }

 function onC(){
  var specs=(DATA[T.value]||{})[C.value]||{},
  keys=Object.keys(specs);

  if(keys.length===1&&keys[0]===""){
   SW.style.display="none";
   S.innerHTML="";
   S.appendChild(new Option("",""));
  }else{
   SW.style.display="";
   fill(S,keys);
  }

  S.required=ids.t==="t"&&SW.style.display!=="none";
  onS();
 }

 function onT(){
  fill(C,Object.keys(DATA[T.value]||{}));
  onC();
 }

 T.addEventListener("change",onT);
 C.addEventListener("change",onC);
 S.addEventListener("change",onS);

 onT();
}

bindProp({t:"ht",c:"hc",sw:"hsw",s:"hs",b:"hbud"});
bindProp({t:"t",c:"c",sw:"sw",s:"sp",b:"bud"});

function propText(ids){
 var t=document.getElementById(ids.t).value,
 c=document.getElementById(ids.c).value,
 sw=document.getElementById(ids.sw),
 s=document.getElementById(ids.s).value,
 b=document.getElementById(ids.b).value;

 return t+" | "+c+(sw.style.display==="none"||!s?"":" | "+s)+" | Budget: "+b;
}

/* PROPERTIES FILTER */

var pfb=document.querySelectorAll(".pf button");

function setPropertyFilter(k){
 var valid=Array.prototype.some.call(pfb,function(b){
  return b.getAttribute("data-k")===k;
 });

 if(!valid)k="all";

 pfb.forEach(function(b){
  b.setAttribute("aria-pressed",b.getAttribute("data-k")===k?"true":"false");
 });

 document.querySelectorAll(".pc").forEach(function(c){
  c.style.display=(k==="all"||c.getAttribute("data-k")===k)?"":"none";
 });
}

pfb.forEach(function(b){
 b.addEventListener("click",function(){
  setPropertyFilter(b.getAttribute("data-k"));
 });
});

/* PROPERTY ENQUIRY */

var propertyEnquiryDialog=document.getElementById("property-enquiry-dialog"),
propertyEnquiryForm=document.getElementById("property-enquiry-form"),
propertyEnquiryName=document.getElementById("property-enquiry-name"),
propertyEnquiryLocation=document.getElementById("property-enquiry-location"),
selectedEnquiryProperty="";

document.querySelectorAll(".pc .enq").forEach(function(button){
 button.addEventListener("click",function(){
  selectedEnquiryProperty=button.getAttribute("data-q");
  propertyEnquiryName.textContent=selectedEnquiryProperty;
  propertyEnquiryForm.reset();
  propertyEnquiryDialog.showModal();
  propertyEnquiryLocation.focus();
 });
});

document.getElementById("property-enquiry-close").addEventListener("click",function(){
 propertyEnquiryDialog.close();
});

propertyEnquiryForm.addEventListener("submit",function(event){
 event.preventDefault();

 if(!propertyEnquiryForm.reportValidity())return;

 wa("Hello Nathel Realtors, I want details about: "+selectedEnquiryProperty+". Preferred location: "+propertyEnquiryLocation.value);

 propertyEnquiryDialog.close();
 propertyEnquiryForm.reset();
});

/* PHONE VALIDATION */

document.querySelectorAll('#hp,#p').forEach(function(input){
 input.addEventListener("input",function(){
  limitPhone(input);
  var error=document.getElementById(input.id+"-error");
  error.textContent="";
  input.setCustomValidity("");
 });
});

document.getElementById("hb").addEventListener("click",function(){
 var phone=document.getElementById("hp"),
 error=document.getElementById("hp-error"),
 location=document.getElementById("hloc");

 if(!location.reportValidity())return;

 limitPhone(phone);

 if(!/^\d{10}$/.test(phone.value)){
  error.textContent="Please enter exactly 10 digits.";
  phone.setCustomValidity("Please enter exactly 10 digits.");
  phone.reportValidity();
  return;
 }

 error.textContent="";
 phone.setCustomValidity("");

 wa("Hello Nathel Realtors, I am looking for: "+propText({t:"ht",c:"hc",sw:"hsw",s:"hs",b:"hbud"})+". Preferred location: "+location.value+". My number: "+phone.value);
});

/* CONSULTATION FORM */

var consultationForm=document.getElementById("consultation-form");

consultationForm.addEventListener("submit",function(event){
 event.preventDefault();

 var phone=document.getElementById("p"),
 phoneError=document.getElementById("p-error"),
 status=document.getElementById("e"),
 submitButton=document.getElementById("s");

 limitPhone(phone);

 if(!/^\d{10}$/.test(phone.value)){
  phone.setCustomValidity("Please enter exactly 10 digits.");
  phoneError.textContent="Please enter exactly 10 digits.";
  phone.reportValidity();
  return;
 }

 phone.setCustomValidity("");
 phoneError.textContent="";

 var payload={
  _subject:"Free consultation request - Nathel Realtors",
  _template:"table",
  name:document.getElementById("n").value.trim(),
  phone:phone.value,
  property_type:document.getElementById("t").value,
  category:document.getElementById("c").value,
  specification:document.getElementById("sw").style.display==="none"?"Not applicable":document.getElementById("sp").value,
  starting_budget:document.getElementById("bud").value,
  budget_and_location:document.getElementById("m").value.trim()
 };

 wa("Hello Nathel Realtors, I would like to book a free consultation.\n\nName: "+payload.name+"\nPhone: "+payload.phone+"\nLooking for: "+payload.property_type+"\nCategory: "+payload.category+"\nSpecification: "+payload.specification+"\nStarting budget: "+payload.starting_budget+"\nBudget and location: "+payload.budget_and_location);

 submitButton.disabled=true;
 submitButton.textContent="Sending...";
 status.textContent="Sending your consultation request...";

 fetch("https://formsubmit.co/ajax/info@nathelrealtors.com",{
  method:"POST",
  headers:{"Accept":"application/json"},
  body:new URLSearchParams(payload)
 })
 .then(function(response){
  return response.json().then(function(data){
   if(!response.ok||data.success!=="true"&&data.success!==true)
    throw new Error(data.message||"Email provider rejected the request.");
   return data;
  });
 })
 .then(function(){
  status.textContent="Your request has been received.";

  window.alert("Thank you! Your consultation request has been received. Our team will contact you shortly to schedule your free consultation.");

  consultationForm.reset();
  document.getElementById("t").dispatchEvent(new Event("change"));
 })
 .catch(function(error){
  console.error("Consultation email could not be sent:",error);
  status.textContent="We couldn't send your request right now. Please try again or call 9319113716.";
 })
 .then(function(){
  submitButton.disabled=false;
  submitButton.textContent="Book consultation";
 });
});


/* ==========================================
   NATHEL REALTORS — EMI CALCULATOR
========================================== */

(function(){

 "use strict";

 var $=function(id){
  return document.getElementById(id);
 };

 var ids=[
  "emi-property","emi-property-number",
  "emi-down","emi-down-number",
  "emi-rate","emi-rate-number",
  "emi-tenure","emi-tenure-number",
  "emi-loan-number",
  "emi-cost-toggle","emi-stamp","emi-extra"
 ];

 if(!ids.every(function(id){return $(id)}))return;

 var fmt=new Intl.NumberFormat("en-IN",{
  maximumFractionDigits:0
 });

 var money=function(n){
  return "₹"+fmt.format(Math.round(Number(n)||0));
 };

 var compact=function(n){
  n=Number(n)||0;

  if(n>=10000000)
   return "₹"+(n/10000000).toFixed(2)+" Cr";

  if(n>=100000)
   return "₹"+(n/100000).toFixed(2)+" Lakh";

  return money(n);
 };

 var clamp=function(v,min,max){
  return Math.min(max,Math.max(min,Number(v)||0));
 };

 var setText=function(id,value){
  $(id).textContent=value;
 };

 var property=$("emi-property");
 var propertyNum=$("emi-property-number");

 var down=$("emi-down");
 var downNum=$("emi-down-number");

 var rate=$("emi-rate");
 var rateNum=$("emi-rate-number");

 var tenure=$("emi-tenure");
 var tenureNum=$("emi-tenure-number");

 var loanInput=$("emi-loan-number");
 var loanOverride=null;

 var costToggle=$("emi-cost-toggle");
 var costFields=$("emi-cost-fields");

 function paintRange(el){
  var min=Number(el.min);
  var max=Number(el.max);
  var val=Number(el.value);

  el.style.setProperty(
   "--progress",
   ((val-min)/(max-min)*100)+"%"
  );
 }

 function calculate(){

  var home=clamp(property.value,500000,200000000);

  var downPct=clamp(down.value,0,90);

  var downAmount=home*downPct/100;

  var principal=Math.max(0,home-downAmount);

  /* MANUALLY EDITED LOAN AMOUNT */

  if(loanOverride!==null){

   principal=clamp(loanOverride,0,home);

   downAmount=home-principal;

   downPct=home>0
    ?downAmount/home*100
    :0;

   down.value=downPct;

   downNum.value=Math.round(downAmount);
  }

  var annual=clamp(rate.value,2,18);

  var years=clamp(tenure.value,1,30);

  var months=years*12;

  var monthlyRate=annual/1200;

  var emi=monthlyRate===0
   ?principal/months
   :principal*monthlyRate*
    Math.pow(1+monthlyRate,months)/
    (Math.pow(1+monthlyRate,months)-1);

  var total=emi*months;

  var interest=Math.max(0,total-principal);

  var principalShare=total>0
   ?principal/total*100:0;

  var interestShare=total>0
   ?interest/total*100:0;

  var stamp=costToggle.checked
   ?home*clamp($("emi-stamp").value,0,20)/100
   :0;

  var extra=costToggle.checked
   ?clamp($("emi-extra").value,0,100000000)
   :0;

  var upfront=downAmount+stamp+extra;

  var ltv=home>0
   ?principal/home*100:0;


  /* PROPERTY DETAILS */

  setText("emi-property-label",compact(home));

  setText(
   "emi-down-label",
   compact(downAmount)+" ("+downPct.toFixed(1)+"%)"
  );

  setText("emi-loan-label",compact(principal));

  if(document.activeElement!==loanInput){
   loanInput.value=Math.round(principal);
  }

  setText("emi-rate-label",annual.toFixed(2)+"%");

  setText(
   "emi-tenure-label",
   years+" "+(years===1?"Year":"Years")
  );


  /* EMI RESULTS */

  setText("emi-monthly",money(emi));

  setText(
   "emi-hero-value",
   fmt.format(Math.round(emi))
  );

  setText("emi-principal",money(principal));

  setText("emi-interest",money(interest));

  setText("emi-total",money(total));

  setText(
   "emi-principal-percent",
   Math.round(principalShare)+"%"
  );

  setText(
   "emi-interest-share",
   Math.round(interestShare)+"%"
  );

  setText("emi-ltv",Math.round(ltv)+"%");

  setText("emi-payments",fmt.format(months));


  /* UPFRONT COSTS */

  setText("emi-upfront-down",money(downAmount));

  setText("emi-stamp-value",money(stamp));

  setText("emi-extra-value",money(extra));

  setText("emi-upfront-total",money(upfront));


  /* VISUALS */

  $("emi-donut").style.background=
   "conic-gradient(#17b982 0 "+
   principalShare+"%,#93a8b4 "+
   principalShare+"% 100%)";

  $("emi-loan-track-fill").style.width=
   ltv+"%";

  setText(
   "emi-insight",
   "Over "+years+" years, your estimated interest is "+
   money(interest)+" — "+
   Math.round(interestShare)+
   "% of your total loan repayment."
  );

  [property,down,rate,tenure].forEach(paintRange);


  /* WHATSAPP ENQUIRY */

  var msg=
   "Hello Nathel Realtors, I used your EMI calculator and would like help exploring a property. "+
   "Property value: "+money(home)+
   ". Down payment: "+money(downAmount)+
   ". Estimated loan: "+money(principal)+
   ". Interest rate assumed: "+annual.toFixed(2)+
   "%. Tenure: "+years+
   " years. Estimated monthly EMI: "+money(emi)+
   ". Please help me find suitable options.";

  $("emi-enquire").href=
   "https://wa.me/919319113716?text="+
   encodeURIComponent(msg);

 }


 /* RANGE AND NUMBER INPUT SYNC */

 function syncRange(range,input,min,max,fromRange){

  if(fromRange){

   input.value=range.value;

  }else{

   var v=clamp(input.value,min,max);

   input.value=v;
   range.value=v;

  }

  calculate();
 }


 /* PROPERTY VALUE */

 property.addEventListener("input",function(){

  loanOverride=null;

  syncRange(
   property,
   propertyNum,
   500000,
   200000000,
   true
  );

  downNum.value=Math.round(
   Number(property.value)*
   Number(down.value)/100
  );

  calculate();

 });

 propertyNum.addEventListener("change",function(){

  loanOverride=null;

  syncRange(
   property,
   propertyNum,
   500000,
   200000000,
   false
  );

  downNum.value=Math.round(
   Number(property.value)*
   Number(down.value)/100
  );

  calculate();

 });


 /* DOWN PAYMENT */

 down.addEventListener("input",function(){

  loanOverride=null;

  var amount=
   Number(property.value)*
   Number(down.value)/100;

  downNum.value=Math.round(amount);

  calculate();

 });

 downNum.addEventListener("change",function(){

  loanOverride=null;

  var home=Number(property.value);

  var amount=clamp(
   downNum.value,
   0,
   home*.9
  );

  downNum.value=Math.round(amount);

  down.value=home
   ?amount/home*100
   :0;

  calculate();

 });


 /* MANUAL LOAN AMOUNT EDITING */

 loanInput.addEventListener("input",function(){

  if(loanInput.value==="")return;

  loanOverride=clamp(
   loanInput.value,
   0,
   Number(property.value)
  );

  calculate();

 });

 loanInput.addEventListener("change",function(){

  var home=Number(property.value);

  loanOverride=clamp(
   loanInput.value,
   0,
   home
  );

  loanInput.value=Math.round(loanOverride);

  calculate();

 });


 /* INTEREST RATE */

 rate.addEventListener("input",function(){

  syncRange(
   rate,
   rateNum,
   2,
   18,
   true
  );

 });

 rateNum.addEventListener("change",function(){

  syncRange(
   rate,
   rateNum,
   2,
   18,
   false
  );

 });


 /* LOAN TENURE */

 tenure.addEventListener("input",function(){

  syncRange(
   tenure,
   tenureNum,
   1,
   30,
   true
  );

 });

 tenureNum.addEventListener("change",function(){

  syncRange(
   tenure,
   tenureNum,
   1,
   30,
   false
  );

 });


 /* ADDITIONAL COSTS */

 ["emi-stamp","emi-extra"].forEach(function(id){

  $(id).addEventListener("input",calculate);

 });


 /* ONE TIME COST TOGGLE */

 costToggle.addEventListener("change",function(){

  costFields.style.opacity=
   costToggle.checked?"1":".45";

  costFields.style.pointerEvents=
   costToggle.checked?"auto":"none";

  calculate();

 });


 /* INITIAL CALCULATION */

 calculate();

})();
