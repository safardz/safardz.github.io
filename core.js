/* SAFAR DZ shared code: database client, helpers, icons, image upload */
const SB_URL="https://htwjsydexrzityvknyqr.supabase.co",SB_KEY="sb_publishable_wRE6elFYUZvJotuM-a8tTg_PoNbe5Cz";
const sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const SITE=location.origin+location.pathname.replace(/[^/]*$/,"");
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>String(Math.round(Number(n||0))).replace(/\B(?=(\d{3})+(?!\d))/g,".");
const U=(id,w=600)=>!id?"":/^https?:/.test(id)?id:`https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=70`;
const W=["أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت","المغير","المنيعة"];
const TRIPN={IST:"تركيا",CAN:"الصين",PAR:"فرنسا",FRA:"ألمانيا",MAD:"إسبانيا"};
const CATS=["عطور","تجميل","ساعات","أحذية","حقائب","إلكترونيات","المطبخ","ملابس","إكسسوارات","أطفال","رياضة","أخرى"];
const STATUS={pending:"في الانتظار",active:"مفعّل",suspended:"موقوف",rejected:"مرفوض"};
const wilOpts=(sel)=>W.map((w,k)=>`<option value="${k+1}"${k+1===+sel?" selected":""}>${String(k+1).padStart(2,"0")} · ${w}</option>`).join("");
const IC={
plane:'<path d="M17.8 19.2 16 11l3.5-3.5c1.5-1.5 2-3.5 1.5-4.5-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z"/>',
eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
eyeoff:'<path d="M3 3l18 18M10.6 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17.4 17.4 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>',
store:'<path d="M3.5 9 5 4h14l1.5 5"/><path d="M3.5 9a2.8 2.8 0 0 0 5.6 0 2.8 2.8 0 0 0 5.6 0 2.8 2.8 0 0 0 5.6 0"/><path d="M5 11.5V20h14v-8.5"/><path d="M10 20v-5h4v5"/>',
box:'<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
logout:'<path d="M9 20H5.5A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 4H9M15.5 16.5 20 12l-4.5-4.5M20 12H9"/>',
upload:'<path d="M12 16V4M7 9l5-5 5 5M4 16v3a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3"/>',
trash:'<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
cash:'<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/>',
truck:'<path d="M3 6.5h11v9H3z"/><path d="M14 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
chat:'<path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.5Z"/>',
clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h4M14.5 13h3"/>',
left:'<path d="m14.5 6-6 6 6 6"/>',right:'<path d="m9.5 6 6 6-6 6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
zap:'<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.8-3.4 3.2-5 6-5s5.2 1.6 6 5M16 4.6a3.2 3.2 0 0 1 0 6.3M21 20c-.5-2.4-1.8-3.9-3.6-4.6"/>'
};
const ic=(n,s)=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true"${s?` style="${s}"`:""}>${IC[n]||""}</svg>`;
function paintIcons(root=document){root.querySelectorAll("[data-i]").forEach(el=>{if(!el.querySelector(":scope > svg.i"))el.insertAdjacentHTML("afterbegin",ic(el.dataset.i));});}
let _tt;function toast(t){let e=$("toast");if(!e){e=document.createElement("div");e.id="toast";e.className="toast";e.setAttribute("role","status");document.body.appendChild(e);}
  e.innerHTML=ic("check","color:#7fe0b4")+esc(t);e.classList.add("on");clearTimeout(_tt);_tt=setTimeout(()=>e.classList.remove("on"),2200);}
function msg(id,text,kind){const e=$(id);if(!e)return;e.className="msg "+(kind||"err");e.textContent=text||"";}
function busy(btn,on){if(!btn)return;btn.classList.toggle("busy",on);if(on){btn.dataset.t=btn.innerHTML;btn.innerHTML='<span class="spin" style="width:18px;height:18px;border-width:2.5px;border-top-color:currentColor"></span>';}else if(btn.dataset.t){btn.innerHTML=btn.dataset.t;}}
const normPhone=p=>String(p||"").replace(/\D/g,"").replace(/^213/,"0");
const phoneOk=p=>/^0[567]\d{8}$/.test(normPhone(p));
/* Arabic error messages for common auth/database errors */
function ar(e){const m=String(e&&e.message||e||"");
  if(/Invalid login credentials/i.test(m))return"البريد أو كلمة السر غالطين.";
  if(/Email not confirmed/i.test(m))return"لازم تأكد بريدك أولاً. شوف الرسالة اللي بعثناهالك (حتى في Spam).";
  if(/already registered|already been registered/i.test(m))return"هذا البريد عندو حساب. ادخل بيه.";
  if(/Password should be at least|weak/i.test(m))return"كلمة السر ضعيفة. استعمل 8 أحرف على الأقل فيها أرقام وحروف.";
  if(/rate limit|too many/i.test(m))return"محاولات بزاف. استنى شوية وعاود.";
  if(/duplicate key.*slug|importers_slug_key/i.test(m))return"هذا الرابط محجوز. اختار واحد آخر.";
  if(/importers_owner_id_key/i.test(m))return"عندك متجر من قبل في هذا الحساب.";
  if(/check constraint.*phone/i.test(m))return"رقم الهاتف لازم 10 أرقام ويبدا بـ 05 ولا 06 ولا 07.";
  if(/product limit/i.test(m))return"وصلت للحد الأقصى: 500 منتج.";
  if(/row-level security|permission denied|not allowed/i.test(m))return"ما عندكش الصلاحية لهذا.";
  if(/Failed to fetch|NetworkError/i.test(m))return"مشكل في الإنترنت. عاود.";
  return"صار مشكل: "+m;}
/* image compression before upload */
function shrink(file,max=1400,q=.82){return new Promise((res,rej)=>{if(!/^image\//.test(file.type))return rej(new Error("هذا الملف ماشي صورة"));
  const r=new FileReader();r.onerror=()=>rej(new Error("ما قدرناش نقراو الصورة"));r.onload=()=>{const im=new Image();im.onerror=()=>rej(new Error("صيغة الصورة ما تخدمش"));
  im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
    const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);c.toBlob(b=>b?res(b):rej(new Error("ما قدرناش نضغطو الصورة")),"image/jpeg",q);};im.src=r.result;};r.readAsDataURL(file);});}
const rid=()=>Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8);
async function uploadMedia(importerId,file){const blob=await shrink(file);const path=`${importerId}/${rid()}.jpg`;
  const {error}=await sb.storage.from("safar-media").upload(path,blob,{contentType:"image/jpeg",cacheControl:"31536000"});if(error)throw error;
  return sb.storage.from("safar-media").getPublicUrl(path).data.publicUrl;}
