// ── Navbar scroll ─────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mlink').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
}));

// ── Scroll reveal ─────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
        io.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => io.observe(el));

// ── Pricing toggle ────────────────────────────────
const toggle = document.getElementById('pricingToggle');
const lblMo = document.getElementById('lbl-mo');
const lblYr = document.getElementById('lbl-yr');
let yearly = false;

function updatePricing() {
    document.querySelectorAll('.price-num').forEach(el => {
        el.textContent = yearly ? el.dataset.yr : el.dataset.mo;
    });
    document.querySelectorAll('.orig-price').forEach(el => {
        el.style.display = yearly ? 'block' : 'none';
        el.textContent = el.dataset.mo + '/mo';
    });
    lblMo.classList.toggle('active', !yearly);
    lblYr.classList.toggle('active', yearly);
    toggle.classList.toggle('on', yearly);
    toggle.setAttribute('aria-checked', yearly);
}

toggle.addEventListener('click', () => { yearly = !yearly; updatePricing(); });
toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); yearly = !yearly; updatePricing(); }
});

// ── Contact form ──────────────────────────────────
document.getElementById('contactBtn').addEventListener('click', () => {
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const goal = document.getElementById('c-goal').value;
    if (!name || !email || !goal) {
        alert('Please fill in your name, email, and goal to continue.');
        return;
    }
    const btn = document.getElementById('contactBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    setTimeout(() => {
        btn.style.display = 'none';
        document.getElementById('contactOk').classList.add('show');
    }, 1400);
});

// ── Active nav link ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--red)' : ''; });
}, { passive: true });