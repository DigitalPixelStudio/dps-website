const testimonials = [
  { name: 'Rajesh Kumar', role: 'CEO, TechCorp India', text: 'Digital Pixel Studio transformed our online presence completely. Our website traffic increased by 300% and conversions doubled within the first month. Exceptional work!' },
  { name: 'Priya Sharma', role: 'Founder, FashionHub', text: 'The e-commerce platform they built for us is outstanding. Clean design, smooth checkout, and our sales have never been better. Highly recommended!' },
  { name: 'Amit Patel', role: 'Director, EduLearn', text: 'Professional, responsive, and incredibly talented. They understood our vision perfectly and delivered beyond expectations. A pleasure to work with.' },
  { name: 'Sneha Reddy', role: 'Owner, GreenGrocer', text: 'From concept to launch, Digital Pixel Studio was with us every step. Our online marketplace now serves 10,000+ customers monthly. Game-changing partnership!' },
  { name: 'Vikram Singh', role: 'CTO, FinTech Solutions', text: 'The web application they developed for us is robust, scalable, and beautifully designed. Their technical expertise and project management are world-class.' },
  { name: 'Ananya Gupta', role: 'Marketing Head, LuxeBrand', text: 'Our brand identity redesign by Digital Pixel Studio was nothing short of transformational. They captured our essence perfectly and elevated our market presence.' },
  { name: 'Suresh Iyer', role: 'Managing Director, BuildRight Constructions', text: 'They built a stunning portfolio website for our real estate projects. The virtual tours and project galleries are incredible. Best investment we made!' },
  { name: 'Deepa Nair', role: 'Founder, FitTrack Wellness', text: 'The mobile app they developed changed our business. User engagement is through the roof, and the app store ratings are consistently above 4.8 stars.' },
  { name: 'Karthik Menon', role: 'CEO, TravelEase', text: 'Our travel booking platform handles 50,000+ daily visitors seamlessly. Digital Pixel Studio delivered a robust, scalable solution that exceeded all our requirements.' },
  { name: 'Neha Joshi', role: 'Owner, StyleStudio Salon', text: 'My salon\'s booking website is gorgeous and functional. Online appointments increased by 200%. The team understood exactly what I needed.' },
  { name: 'Ravi Deshmukh', role: 'Founder, FoodieExpress', text: 'The food delivery platform they built is incredibly efficient. Real-time tracking, easy ordering, and a beautiful interface. Our customers love it!' },
  { name: 'Meera Krishnan', role: 'Director, GreenEarth NGO', text: 'Digital Pixel Studio built our donation platform pro-bono. The transparency features and seamless payment integration helped us raise funds more effectively.' },
  { name: 'Arjun Mehta', role: 'CEO, HealthFirst Diagnostics', text: 'Our patient portal and booking system transformed healthcare delivery. 99.9% uptime, HIPAA compliant, and incredibly user-friendly. Outstanding technical work.' },
  { name: 'Pooja Verma', role: 'Brand Manager, UrbanLiving', text: 'The interior design showcase website they created is visually stunning. Each project gallery tells a story. Our client inquiries tripled within weeks.' },
  { name: 'Sanjay Bhat', role: 'VP Technology, CloudSync Solutions', text: 'Digital Pixel Studio handled our SaaS dashboard development. The attention to detail, code quality, and performance optimization is genuinely impressive.' }
];

function loadTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  testimonials.forEach((t, i) => {
    const imgId = (i % 70) + 1;
    const card = document.createElement('div');
    card.className = 'testimonial-card reveal';
    card.innerHTML = `
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <img src="https://i.pravatar.cc/100?img=${imgId}" alt="${t.name}" loading="lazy">
        <div>
          <h4>${t.name}</h4>
          <span>${t.role}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initPortfolioFilter() {
  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filters.length || !items.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.6s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const phone = document.getElementById('formPhone').value;
    const type = document.getElementById('formWebsiteType').value;
    const message = document.getElementById('formMessage').value;

    if (!name || !email || !phone || !type) {
      alert('Please fill in all required fields.');
      return;
    }

    const whatsappMsg = encodeURIComponent(
      `Hi Digital Pixel Studio! 👋\n\nI'm interested in your services.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nWebsite Type: ${type}\nMessage: ${message}`
    );

    const emailBody = encodeURIComponent(
      `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AWebsite Type: ${type}%0AMessage: ${message}`
    );

    const sendVia = confirm(
      'How would you like to send this inquiry?\n\nOK = WhatsApp\nCancel = Email'
    );

    if (sendVia) {
      window.open(`https://wa.me/919620024812?text=${whatsappMsg}`, '_blank');
    } else {
      window.location.href = `mailto:www.digitalpixelstudio@gmail.com?subject=New Project Inquiry - ${type}&body=${emailBody}`;
    }

    form.reset();
    alert('Thank you! We will get back to you within 24 hours.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTestimonials();
  initPortfolioFilter();
  initFAQ();
  initContactForm();
});
