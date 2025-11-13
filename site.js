// site.js — interactions for the homepage inspired design

// Smooth scroll
document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    const el = document.querySelector(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Contact form (EmailJS optional)
const CF = {
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',     // optional
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',   // optional
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'      // optional
};

const statusEl = document.getElementById('cf_status');
document.getElementById('cf_send').addEventListener('click', async () => {
  const name = document.getElementById('cf_name').value.trim();
  const email = document.getElementById('cf_email').value.trim();
  const mobile = document.getElementById('cf_mobile').value.trim();
  const message = document.getElementById('cf_message').value.trim();

  if(!name || !email || !mobile || !message){
    statusEl.textContent = 'Please fill all fields.';
    return;
  }
  statusEl.textContent = 'Sending...';

  if(!CF.serviceId || CF.serviceId === 'YOUR_EMAILJS_SERVICE_ID'){
    const mailto = `mailto:reachjanarthanan@gmail.com?subject=Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent("Name:"+name+"\nEmail:"+email+"\nMobile:"+mobile+"\n\n"+message)}`;
    window.location.href = mailto;
    return;
  }

  try {
    if(!window.emailjs){
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
      window.emailjs.init(CF.publicKey);
    }
    const tpl = { from_name: name, from_email: email, from_mobile: mobile, message };
    await emailjs.send(CF.serviceId, CF.templateId, tpl);
    statusEl.textContent = 'Message sent — we will reply soon!';
    document.getElementById('cf_name').value=''; document.getElementById('cf_email').value=''; document.getElementById('cf_mobile').value=''; document.getElementById('cf_message').value='';
  } catch(err){
    console.error(err);
    statusEl.textContent = 'Send failed — fallback to email client.';
    const mailto = `mailto:reachjanarthanan@gmail.com?subject=Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent("Name:"+name+"\nEmail:"+email+"\nMobile:"+mobile+"\n\n"+message)}`;
    window.location.href = mailto;
  }
});
