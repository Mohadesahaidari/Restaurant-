const R={name:'Arghawan',tag:'Afghan Kitchen',addr:'Street 15, Shahr-e-Naw, Kabul, Afghanistan',tel:'+93 700 123 456',mail:'hello@arghawan-sample.com',hrs:'Every day · 10:00 am – 11:00 pm'};
const M={
afghan:{t:'Afghan Specialties',i:[
['a1','Kabuli Palaw','Fragrant rice with tender lamb, caramelized carrots, raisins and pistachios.',12.5,'🍛','kabuli-palaw.jpg'],
['a2','Mantu','Steamed dumplings with spiced beef, topped with yogurt, tomato sauce and mint.',10.5,'🥟','mantu.jpg'],
['a3','Ashak','Leek-filled dumplings with garlic yogurt and meat sauce.',10,'🥟','ashak.jpg'],
['a4','Chopan Kebab','Lamb chops marinated simply and grilled over charcoal, served with naan.',14,'🍢','chopan-kebab.jpg'],
['a5','Qorma-e-Sabzi','Slow-cooked spinach and herbs with lamb, served with white rice.',11.5,'🥘','qorma-sabzi.jpg'],
['a6','Bolani','Thin crispy flatbread stuffed with potato, leek or pumpkin.',6,'🫓','bolani.jpg'],
['a7','Aush Soup','Hearty noodle soup with beans, herbs, yogurt and mint.',7,'🍲','aush.jpg'],
['a8','Firni','Cardamom milk pudding with pistachios and rose water.',4.5,'🍮','firni.jpg']]},
pak:{t:'Pakistani Favourites',i:[
['p1','Chicken Biryani','Aromatic basmati layered with spiced chicken, served with raita.',9.5,'🍚','chicken-biryani.jpg'],
['p2','Mutton Biryani','Slow-cooked mutton, saffron rice and fried onions.',12,'🍚','mutton-biryani.jpg'],
['p3','Chicken Karahi','Wok-cooked chicken with tomato, ginger and green chilli.',11,'🍗','karahi.jpg'],
['p4','Nihari','Rich slow-braised beef stew, best with fresh naan.',12,'🍖','nihari.jpg']]},
fast:{t:'Fast Food',i:[
['f1','Classic Burger','Beef patty, cheese, lettuce, house sauce.',6.5,'🍔','burger.jpg'],
['f2','Zinger Burger','Crispy spicy chicken fillet with mayo.',7,'🍔','zinger.jpg'],
['f3','Chicken Shawarma','Grilled chicken wrap with garlic sauce and pickles.',5.5,'🌯','shawarma.jpg'],
['f4','Pepperoni Pizza','Hand-stretched 10" pizza, mozzarella and pepperoni.',9,'🍕','pizza.jpg'],
['f5','Loaded Fries','Crispy fries with cheese sauce and chicken bites.',5,'🍟','fries.jpg']]},
soft:{t:'Soft Drinks & Traditional',i:[
['s1','Cola / Orange / Lemon-Lime','330 ml can, served cold.',1.5,'🥤','soda.jpg'],
['s2','Doogh','Chilled salted yogurt drink with mint.',2.5,'🥛','doogh.jpg'],
['s3','Sharbat','Fresh rose and cardamom sherbet.',2.5,'🌹','sharbat.jpg'],
['s4','Afghan Green Tea','Cardamom green tea, pot for two.',3,'🍵','tea.jpg']]},
energy:{t:'Afghan Energy Drinks',i:[
['e1','Energy Drink – Classic','Popular Afghan-market energy drink, 250 ml. (Replace with real brand)',2,'⚡','energy1.jpg'],
['e2','Energy Drink – Mango','Fruity energy drink, 250 ml. (Replace with real brand)',2,'⚡','energy2.jpg'],
['e3','Energy Drink – Lemon','Citrus energy drink, 250 ml. (Replace with real brand)',2,'⚡','energy3.jpg']]}};
const ALL=Object.values(M).flatMap(c=>c.i),$=s=>document.querySelector(s);
let cart=JSON.parse(localStorage.getItem('cart')||'{}');
const save=()=>{localStorage.setItem('cart',JSON.stringify(cart));cb()};
const cnt=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const sub=()=>Object.entries(cart).reduce((s,[k,q])=>s+ALL.find(i=>i[0]==k)[3]*q,0);
function card(i){return `<div class=c><div class=ph><span>${i[4]}</span><img src="${i[5]}" alt="${i[1]}" loading=lazy onerror="this.remove()"></div><div class=cb><h3>${i[1]}</h3><p>${i[2]}</p><div class=pr><span>$${i[3].toFixed(2)}</span><button class="btn sm" onclick="add('${i[0]}')">Add</button></div></div></div>`}
function add(id){cart[id]=(cart[id]||0)+1;save()}
function cb(){const b=$('#cartb');if(b)b.innerHTML=`🛒 Order (${cnt()}) · $${sub().toFixed(2)}`}
const pg=location.pathname.split('/').pop()||'index.html';
const L=[['index.html','Home'],['menu.html','Menu'],['order.html','Order Online'],['about.html','About'],['contact.html','Contact']];
$('#hdr').outerHTML=`<header><div class="w nav"><a class=logo href=index.html>${R.name}<small>${R.tag}</small></a><button id=bt onclick="$('nav').classList.toggle('open')">☰</button><nav>${L.map(l=>`<a href=${l[0]} class="${pg==l[0]?'on':''}">${l[1]}</a>`).join('')}</nav></div></header>`;
$('#ftr').outerHTML=`<footer><div class=w><div class="g g3"><div><h4>${R.name} ${R.tag}</h4><p>Authentic Afghan food, Pakistani classics and fast favourites, cooked fresh and delivered hot.</p></div><div><h4>Visit</h4><p>${R.addr}</p><p>${R.hrs}</p></div><div><h4>Contact</h4><p>${R.tel}</p><p>${R.mail}</p></div><div><h4>Explore</h4>${L.map(l=>`<a href=${l[0]}>${l[1]}</a>`).join('')}</div></div><div class=cp>© 2026 ${R.name} ${R.tag} · Designed by Mohad Haidari</div></div></footer>`;
if(pg!='order.html')document.body.insertAdjacentHTML('beforeend','<a id=cartb href=order.html></a>');cb();
if($('#feat'))$('#feat').innerHTML=M.afghan.i.slice(0,4).concat([M.pak.i[0]],[M.fast.i[2]]).map(card).join('');
if($('#menu')){const k=Object.keys(M);$('#tabs').innerHTML=k.map(x=>`<button data-k=${x}>${M[x].t}</button>`).join('');
const show=x=>{$('#menu').innerHTML=`<div class=t><h2>${M[x].t}</h2></div><div class=g>${M[x].i.map(card).join('')}</div>`;document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.k==x))};
$('#tabs').onclick=e=>e.target.dataset.k&&show(e.target.dataset.k);show(location.hash.slice(1)in M?location.hash.slice(1):'afghan')}
if($('#cart')){const fee=()=>$('#mode').value=='delivery'?2.5:0;
function draw(){const e=Object.entries(cart);$('#lines').innerHTML=e.length?e.map(([k,q])=>{const i=ALL.find(x=>x[0]==k);return `<div class="row q"><span>${i[4]} ${i[1]}</span><span><button onclick="ch('${k}',-1)">−</button> ${q} <button onclick="ch('${k}',1)">+</button> $${(i[3]*q).toFixed(2)}</span></div>`}).join(''):'<p>Your cart is empty. <a href=menu.html style="color:var(--wine)"><b>Browse the menu</b></a></p>';
const s=sub(),f=e.length?fee():0,prep=Math.min(10+cnt()*2,25),trv=f?20:0;
$('#sum').innerHTML=`<div class=row><span>Subtotal</span><span>$${s.toFixed(2)}</span></div><div class=row><span>Courier fee</span><span>$${f.toFixed(2)}</span></div><div class="row tot"><span>Total</span><span>$${(s+f).toFixed(2)}</span></div><div class=eta>⏱ Estimated ${f?'delivery':'pickup'}: <b>${prep+trv}–${prep+trv+5} min</b>. We time it so your food comes out of the kitchen just as the courier arrives — hot, never waiting.</div>`;$('#go').disabled=!e.length}
window.ch=(k,d)=>{cart[k]=(cart[k]||0)+d;if(cart[k]<=0)delete cart[k];save();draw()};
$('#mode').onchange=draw;draw();
$('#form').onsubmit=e=>{e.preventDefault();const f=fee(),prep=Math.min(10+cnt()*2,25),t=prep+(f?20:0);
$('#cart').innerHTML=`<div class="box ok"><div class=big>✅</div><h2>Thank you, ${$('#nm').value}!</h2><p>Order #${Math.floor(1000+Math.random()*9000)} received. Estimated ${f?'delivery':'pickup'} in <b>${t}–${t+5} minutes</b>.</p><div class=steps><span>1 · Order confirmed</span><span>2 · Cooking now</span><span>3 · ${f?'Courier on the way':'Ready for pickup'}</span></div><p style="margin-top:18px;color:#7a6a5c">(Sample website — no real order is placed.)</p></div>`;cart={};save()}}
