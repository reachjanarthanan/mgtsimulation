// site.js — interactions for the landing site (Option C theme)

// Smooth scroll nav links
document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    const el = document.querySelector(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Contact form behavior
const CF = {
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',     // Optional: replace with EmailJS service id
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',   // Optional: replace with EmailJS template id
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'      // Optional: replace with EmailJS public key
};

const statusEl = document.getElementById('cf_status');
document.getElementById('cf_send').addEventListener('click', async () => {
  const name = document.getElementById('cf_name').value.trim();
  const email = document.getElementById('cf_email').value.trim();
  const mobile = document.getElementById('cf_mobile').value.trim();
  const message = document.getElementById('cf_message').value.trim();

  if(!name || !email || !mobile || !message){
    statusEl.textContent = 'Please fill all fields (mobile is required).';
    return;
  }

  statusEl.textContent = 'Sending...';

  // If EmailJS not configured, fallback to mailto
  if(!CF.serviceId || CF.serviceId === 'YOUR_EMAILJS_SERVICE_ID'){
    const mailto = `mailto:reachjanarthanan@gmail.com?subject=Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: "+name+"\nEmail: "+email+"\nMobile: "+mobile+"\n\nMessage:\n"+message)}`;
    window.location.href = mailto;
    statusEl.textContent = 'Opening email client...';
    return;
  }

  // load EmailJS library if needed
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

    const templateParams = {
      from_name: name,
      from_email: email,
      from_mobile: mobile,
      message
    };

    await emailjs.send(CF.serviceId, CF.templateId, templateParams);
    statusEl.textContent = 'Message sent — we will reply soon!';
    // clear form
    document.getElementById('cf_name').value='';
    document.getElementById('cf_email').value='';
    document.getElementById('cf_mobile').value='';
    document.getElementById('cf_message').value='';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Send failed — opening email client as fallback.';
    const mailto = `mailto:reachjanarthanan@gmail.com?subject=Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: "+name+"\nEmail: "+email+"\nMobile: "+mobile+"\n\nMessage:\n"+message)}`;
    window.location.href = mailto;
  }
});
