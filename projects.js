/* Nathel Realtors - Projects page (filters + listing). Load AFTER script.js */
(function(){
/* ====== EDIT YOUR PROJECTS HERE ======
   type    -> must match a property type in the site (Residential Houses / Apartments, New Projects, Office Spaces,
              Commercial / Studio (Pre-Leased) / Lock-in, Industrial Building, PEB and Factories, Raw Land)
   status  -> Ready To Move | Under Construction | New Launch | Completed | Upcoming
   location-> must match an item of LOCATIONS in script.js
   lakh    -> starting price in Lakh (used for min/max budget filter). 1 Cr = 100
   price   -> text shown on the card
   NOTE: these are SAMPLE entries. Replace with your real projects and photos. */
var PROJECTS=[
{name:"Sample Project 1",type:"New Projects",status:"Under Construction",location:"Greater Noida West — 201318",lakh:125,price:"₹1.25 Cr onwards",desc:"High rise apartments in a gated society with park, clubhouse and covered parking.",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 2",type:"New Projects",status:"New Launch",location:"Noida Expressway — 201303",lakh:200,price:"₹2 Cr onwards",desc:"Low rise builder floors with modern design, Vastu planning and wide roads.",img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 3",type:"Residential Houses / Apartments",status:"Ready To Move",location:"Indirapuram, Ghaziabad — 201014",lakh:35,price:"₹35 Lakh onwards",desc:"Ready to move 2 BHK flats in a renowned society. Registry and loan support available.",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 4",type:"Commercial / Studio (Pre-Leased) / Lock-in",status:"Completed",location:"Greater Noida West — 201318",lakh:60,price:"₹60 Lakh onwards",desc:"Pre-leased commercial space with assured rental income and lock-in period.",img:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 5",type:"Office Spaces",status:"Upcoming",location:"Noida — 201301",lakh:25,price:"₹25 Lakh onwards",desc:"Office spaces for start-ups and growing teams in a prime business location.",img:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 6",type:"Raw Land",status:"Ready To Move",location:"Surajpur — 201306",lakh:50,price:"₹35,000 per sq yard onwards",desc:"Authority approved plots with clear papers. Sizes available on request.",img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 7",type:"Industrial Building, PEB and Factories",status:"Ready To Move",location:"Dadri — 203207",lakh:100,price:"₹25,000 per sq yard",desc:"PEB building and factory space with good road access and power connection.",img:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80"},
{name:"Sample Project 8",type:"New Projects",status:"Upcoming",location:"Wave City, NH 24 Ghaziabad — 201010",lakh:60,price:"₹60 Lakh onwards",desc:"Commercial complex with shops and offices, pre-launch offers available.",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"}
];
var STATUSES=["Ready To Move","Under Construction","New Launch","Completed","Upcoming"];
var BUDGETS=[10,25,50,75,100,150,200,300,500,1000];
function fmt(l){return l>=100?(l/100)+" Cr":l+" Lakh"}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* page + nav link */
var main=document.querySelector("main"),sec=document.createElement("section");
sec.className="page";sec.id="projects";
var typeOpts='<option value="">All property types</option>'+Object.keys(DATA).map(function(t){return'<option>'+esc(t)+'</option>'}).join("");
var locOpts='<option value="">All locations</option>'+LOCATIONS.map(function(l){return'<option>'+esc(l)+'</option>'}).join("");
var minOpts='<option value="0">No min</option>'+BUDGETS.map(function(b){return'<option value="'+b+'">'+fmt(b)+'</option>'}).join("");
var maxOpts='<option value="0">No max</option>'+BUDGETS.map(function(b){return'<option value="'+b+'">'+fmt(b)+'</option>'}).join("")+'<option value="100000">Above 10 Cr</option>';
var stHtml=STATUSES.map(function(s){return'<label class="pj-ck"><input type="checkbox" value="'+s+'"><span>'+s+'</span></label>'}).join("");
sec.innerHTML='<div class="pgh"><div class="wrap"><h1>Projects</h1><p>Filter by budget, location, property type and possession status. Tap Contact to get details on WhatsApp.</p></div></div>'+
'<div class="wrap"><button type="button" class="btn pj-toggle" id="pj-toggle" aria-expanded="false">Show filters</button>'+
'<div class="pj-layout"><aside class="pj-filters" id="pj-filters" aria-label="Project filters"><div class="pj-fh"><h3>Filters</h3><button type="button" class="pj-reset" id="pj-reset">Reset</button></div>'+
'<label>Property type<select id="pj-type">'+typeOpts+'</select></label>'+
'<label>Location<select id="pj-loc">'+locOpts+'</select></label>'+
'<div class="pj-grp"><span class="pj-t">Budget</span><div class="pj-two"><label>Min<select id="pj-min">'+minOpts+'</select></label><label>Max<select id="pj-max">'+maxOpts+'</select></label></div></div>'+
'<div class="pj-grp"><span class="pj-t">Possession</span>'+stHtml+'</div></aside>'+
'<div class="pj-res"><p class="pj-count" id="pj-count" aria-live="polite"></p><div class="pj-list" id="pj-list"></div></div></div></div>';
main.appendChild(sec);
var nav=document.getElementById("nav"),a=document.createElement("a");
a.href="#projects";a.textContent="Projects";
nav.insertBefore(a,nav.querySelector("a[href='#services']"));
pages.push("projects");

var $=function(id){return document.getElementById(id)};
function render(){
 var t=$("pj-type").value,l=$("pj-loc").value,mn=+$("pj-min").value,mx=+$("pj-max").value;
 var sts=[].map.call(document.querySelectorAll(".pj-ck input:checked"),function(i){return i.value});
 var out=PROJECTS.filter(function(p){
  return(!t||p.type===t)&&(!l||p.location===l)&&(!mn||p.lakh>=mn)&&(!mx||p.lakh<=mx)&&(!sts.length||sts.indexOf(p.status)>-1)});
 $("pj-count").textContent=out.length+(out.length===1?" project found":" projects found");
 $("pj-list").innerHTML=out.length?out.map(function(p){var i=PROJECTS.indexOf(p);
  return'<article class="pj-card"><img src="'+p.img+'" alt="'+esc(p.name)+'" loading="lazy"><div class="pj-body"><div class="pj-top"><span class="pj-st">'+esc(p.status)+'</span><span class="pj-ty">'+esc(p.type)+'</span></div><h3>'+esc(p.name)+'</h3><p class="pj-loc"><svg class="i"><use href="#pin"/></svg>'+esc(p.location)+'</p><p class="pj-d">'+esc(p.desc)+'</p><div class="pj-bot"><div class="pj-pr"><small>Starting from</small><b>'+esc(p.price)+'</b></div><button type="button" class="btn pj-c" data-i="'+i+'"><svg class="i"><use href="#phone"/></svg>Contact</button></div></div></article>'}).join(""):
  '<div class="pj-empty"><h3>No project matches these filters</h3><p>Try changing the budget or location, or tell us what you need.</p><button type="button" class="btn" id="pj-req">Share your requirement</button></div>';
}
sec.addEventListener("change",function(e){if(e.target.closest("#pj-filters"))render()});
$("pj-reset").addEventListener("click",function(){["pj-type","pj-loc","pj-min","pj-max"].forEach(function(id){$(id).value=id==="pj-min"||id==="pj-max"?"0":""});
 document.querySelectorAll(".pj-ck input").forEach(function(c){c.checked=false});render()});
$("pj-list").addEventListener("click",function(e){
 var b=e.target.closest(".pj-c");
 if(b){var p=PROJECTS[+b.getAttribute("data-i")];
  wa("Hello Nathel Realtors, I want details about this project:\nProject: "+p.name+"\nType: "+p.type+"\nStatus: "+p.status+"\nLocation: "+p.location+"\nPrice: "+p.price);return}
 if(e.target.closest("#pj-req"))location.hash="#contact"});
$("pj-toggle").addEventListener("click",function(){var o=$("pj-filters").classList.toggle("open");this.setAttribute("aria-expanded",o);this.textContent=o?"Hide filters":"Show filters"});
render();route();
})();