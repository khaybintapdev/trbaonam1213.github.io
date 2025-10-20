// Simple behaviors: theme toggle, contact form handling, dynamic year
(function(){
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';

  function applyTheme(t){
    if(t === 'light'){ html.classList.add('light'); themeToggle.textContent = '🌞' }
    else { html.classList.remove('light'); themeToggle.textContent = '🌙' }
  }
  applyTheme(saved);

  themeToggle.addEventListener('click', () => {
    const next = html.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // simple contact form - opens mail client (fallback)
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');
      const subject = encodeURIComponent(`Liên hệ từ ${name}`);
      const body = encodeURIComponent(`Tên: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:you@example.com?subject=${subject}&body=${body}`;
      // try to open mail client
      window.location.href = mailto;
      note.textContent = 'Mở ứng dụng mail mặc định để gửi tin nhắn. Hoặc sao chép nội dung và gửi thủ công.';
      setTimeout(()=> note.textContent = '', 6000);
      form.reset();
    });
  }

  // download CV example (replace href with actual file)
  const dl = document.getElementById('downloadCv');
  if(dl){
    dl.addEventListener('click', (e) => {
      // if you have a PDF, set href to pdf path; here we just prevent broken link
      if(dl.getAttribute('href') === '#'){ e.preventDefault(); alert('Thêm đường dẫn tới file CV PDF trong thuộc tính href của nút này.'); }
    });
  }
})();