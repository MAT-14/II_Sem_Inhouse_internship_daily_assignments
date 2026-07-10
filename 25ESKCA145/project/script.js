
const EVENTS = [
  {id:'code-currents', tag:'Technical', name:'Code Currents', desc:'24-hour hackathon solving real campus & industry problem statements.', time:'10:00 AM – Next day 10:00 AM', venue:'CS Block, Lab 3', fee:600, team:'Team of 2–4'},
  {id:'roborace', tag:'Technical', name:'RoboRace', desc:'Build and race a line-following bot through an obstacle-laden track.', time:'10:00 AM – 01:00 PM', venue:'Mechanical Workshop', fee:400, team:'Team of 2–3'},
  {id:'quiz-vortex', tag:'Technical', name:'Quiz Vortex', desc:'Rapid-fire technical & general awareness quiz across three rounds.', time:'11:00 AM – 01:00 PM', venue:'Seminar Hall A', fee:150, team:'Team of 2'},
  {id:'battle-bands', tag:'Cultural', name:'Battle of Bands', desc:'Live band performances competing for the Pravah main-stage trophy.', time:'06:00 PM – 08:00 PM', venue:'Main Stage, Lawn', fee:500, team:'Band (up to 6)'},
  {id:'nrityanjali', tag:'Cultural', name:'Nrityanjali', desc:'Solo & group dance competition — any style, any story.', time:'02:00 PM – 04:00 PM', venue:'Main Stage, Lawn', fee:250, team:'Solo or group'},
  {id:'lens-light', tag:'Cultural', name:'Lens & Light', desc:'On-the-spot photography challenge judged on theme and composition.', time:'10:00 AM – 04:00 PM', venue:'Campus-wide', fee:150, team:'Individual'},
  {id:'gaming-arena', tag:'Gaming', name:'Gaming Arena', desc:'BGMI & Valorant squad showdown with a live-streamed grand final.', time:'10:00 AM – 05:00 PM', venue:'IT Block, Gaming Lab', fee:300, team:'Squad of 4'},
  {id:'street-play', tag:'Cultural', name:'Street Play', desc:'Nukkad natak on socially relevant themes, performed campus-wide.', time:'01:00 PM – 02:00 PM', venue:'Amphitheatre', fee:200, team:'Team of 6–10'},
  {id:'treasure-hunt', tag:'Fun', name:'Treasure Hunt', desc:'Clue-based hunt across the entire SKIT campus against the clock.', time:'11:00 AM – 01:00 PM', venue:'Campus-wide', fee:200, team:'Team of 3–4'},
  {id:'pravah-talks', tag:'Talk', name:'Pravah Talks', desc:'Keynote and open Q&A with an industry speaker on emerging tech.', time:'04:30 PM – 05:30 PM', venue:'Auditorium', fee:0, team:'Open to all'},
];

const grid = document.getElementById('eventGrid');
EVENTS.forEach(ev=>{
  const card = document.createElement('div');
  card.className='event-card';
  card.innerHTML = `
    <div class="event-top">
      <span class="event-tag">${ev.tag}</span>
      <span class="event-fee">${ev.fee===0?'Free':'₹'+ev.fee}</span>
    </div>
    <h3>${ev.name}</h3>
    <p class="desc">${ev.desc}</p>
    <div class="event-meta"><span>${ev.time.split('–')[0].trim()}</span><span>${ev.venue}</span></div>
    <div class="event-details">
      <ul>
        <li>Timing: ${ev.time}</li>
        <li>Venue: ${ev.venue}</li>
        <li>Team size: ${ev.team}</li>
        <li>Entry fee: ${ev.fee===0?'Free':'₹'+ev.fee+' per team'}</li>
      </ul>
    </div>`;
  card.addEventListener('click', ()=> card.classList.toggle('open'));
  grid.appendChild(card);
});

/* ---------------- MOBILE MENU ---------------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));

/* ---------------- REGISTRATION EVENT PICKER ---------------- */
const pickList = document.getElementById('eventPickList');
let selectedEvents = new Set();

EVENTS.forEach(ev=>{
  const row = document.createElement('div');
  row.className='event-pick';
  row.dataset.id = ev.id;
  row.innerHTML = `
    <div class="ep-left">
      <div class="checkbox"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#062521" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div><div class="ep-name">${ev.name}</div><div class="ep-tag">${ev.tag} · ${ev.team}</div></div>
    </div>
    <div class="ep-fee">${ev.fee===0?'Free':'₹'+ev.fee}</div>`;
  row.addEventListener('click', ()=>{
    row.classList.toggle('checked');
    if(row.classList.contains('checked')) selectedEvents.add(ev.id);
    else selectedEvents.delete(ev.id);
    updateTotal();
  });
  pickList.appendChild(row);
});

function updateTotal(){
  let total = 0;
  selectedEvents.forEach(id=>{
    const ev = EVENTS.find(e=>e.id===id);
    total += ev.fee;
  });
  document.getElementById('totalFee').textContent = '₹'+total;
  document.getElementById('totalFee2').textContent = '₹'+total;
}

/* ---------------- MULTI-STEP FORM ---------------- */
function goStep(n){
  if(n===2){
    const name=document.getElementById('fName').value.trim();
    const phone=document.getElementById('fPhone').value.trim();
    const email=document.getElementById('fEmail').value.trim();
    const college=document.getElementById('fCollege').value.trim();
    const year=document.getElementById('fYear').value;
    const valid = name && /^[0-9]{10}$/.test(phone) && /\S+@\S+\.\S+/.test(email) && college && year;
    document.getElementById('step1Error').style.display = valid ? 'none':'block';
    if(!valid) return;
  }
  if(n===3){
    document.getElementById('step2Error').style.display = selectedEvents.size===0 ? 'block':'none';
    if(selectedEvents.size===0) return;
  }
  document.querySelectorAll('.form-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
  ['bar1','bar2','bar3'].forEach((id,i)=>{
    const el = document.getElementById(id);
    el.classList.remove('active','done');
    if(i+1 < n) el.classList.add('done');
    else if(i+1 === n) el.classList.add('active');
  });
}

function switchPay(tab){
  document.querySelectorAll('.pay-tab').forEach(t=>t.classList.remove('active'));
  document.querySelector(`.pay-tab[data-tab="${tab}"]`).classList.add('active');
  document.getElementById('payCard').classList.toggle('active', tab==='card');
  document.getElementById('payUpi').classList.toggle('active', tab==='upi');
}

function processPayment(){
  const btn = document.getElementById('payBtn');
  btn.textContent = 'Processing…';
  btn.disabled = true;
  setTimeout(()=>{
    document.querySelectorAll('.form-step').forEach(s=>s.classList.remove('active'));
    document.getElementById('confirmStep').classList.add('active');
    ['bar1','bar2','bar3'].forEach(id=> document.getElementById(id).classList.add('done'));

    const regId = 'PRV26-' + Math.random().toString(36).substring(2,7).toUpperCase();
    const name = document.getElementById('fName').value.trim();
    const names = Array.from(selectedEvents).map(id=> EVENTS.find(e=>e.id===id).name).join(', ');
    const total = document.getElementById('totalFee').textContent;

    document.getElementById('ticketBox').innerHTML = `
      <div class="row"><span>Registration ID</span><span>${regId}</span></div>
      <div class="row"><span>Name</span><span>${name}</span></div>
      <div class="row"><span>Events</span><span>${names}</span></div>
      <div class="row"><span>Amount paid</span><span>${total}</span></div>
      <div class="row"><span>Fest date</span><span>10 July 2026</span></div>`;

    btn.textContent = 'Pay & Register →';
    btn.disabled = false;
  }, 1400);
}

function resetForm(){
  document.getElementById('regForm').reset();
  selectedEvents.clear();
  document.querySelectorAll('.event-pick.checked').forEach(el=>el.classList.remove('checked'));
  updateTotal();
  document.getElementById('confirmStep').classList.remove('active');
  goStep(1);
  document.getElementById('fCollege').value = 'SKIT Jaipur';
}