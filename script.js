// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav ul');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ===== HEADER SCROLL =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== NAVEGAÇÃO ATIVA =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== ANIMAÇÃO DE SCROLL (FADE IN) =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Aplicar fade-in em elementos
document.querySelectorAll('.section-title, .historia-content, .servico-card, .contato-content, .card-visit').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== CONTADOR ANIMADO (STATS) =====
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current).toLocaleString('pt-BR');
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target.toLocaleString('pt-BR');
          }
        };
        updateCount();
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) countObserver.observe(statsSection);

// ===== FORMULÁRIO DE CONTATO =====
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Validação simples
  if (!nome || !email || !telefone || !mensagem) {
    showNotification('Por favor, preencha todos os campos.', 'error');
    return;
  }

  // Simulação de envio
  const btn = contatoForm.querySelector('button');
  const originalText = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    showNotification(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, 'success');
    contatoForm.reset();
    btn.textContent = originalText;
    btn.disabled = false;
  }, 1500);
});

// ===== NOTIFICAÇÃO TOAST =====
function showNotification(message, type) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    padding: '16px 28px',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '0.95rem',
    zIndex: '9999',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transform: 'translateY(100px)',
    opacity: '0',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    background: type === 'success'
      ? 'linear-gradient(135deg, #0A4D8C, #1565C0)'
      : 'linear-gradient(135deg, #c62828, #e53935)'
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===== EFEITO PARALLAX SUAVE NO HERO =====
const hero = document.querySelector('.hero');
const toothIllust
