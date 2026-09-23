/**
 * SOLID GOLD FUND - MASTER APP CONTROLLER & INTERACTIVITY
 */

(function () {
  // 1. Toast Notification System
  window.showToast = function (message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileDrawerClose = document.querySelector('.drawer-close-btn');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    }

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 4. Floating Noticeboard Drawer
  const noticeBtn = document.querySelector('.floating-notice-btn');
  const noticeOverlay = document.querySelector('.notice-drawer-overlay');
  const noticeCloseBtn = document.querySelector('.notice-close-btn');

  if (noticeBtn && noticeOverlay) {
    noticeBtn.addEventListener('click', () => {
      noticeOverlay.classList.add('active');
    });

    if (noticeCloseBtn) {
      noticeCloseBtn.addEventListener('click', () => {
        noticeOverlay.classList.remove('active');
      });
    }

    noticeOverlay.addEventListener('click', (e) => {
      if (e.target === noticeOverlay) {
        noticeOverlay.classList.remove('active');
      }
    });
  }

  // 5. FAQ Accordions & Category Switching
  const faqCatBtns = document.querySelectorAll('.faq-cat-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  faqCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');

      faqItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 6. Modal Workflows (Checkout & Masterclass)
  const checkoutModal = document.getElementById('checkout-modal');
  const masterclassModal = document.getElementById('masterclass-modal');
  const checkoutTriggers = document.querySelectorAll('.trigger-checkout');
  const masterclassTriggers = document.querySelectorAll('.trigger-masterclass');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  checkoutTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'Forex X-1 Step Evaluation';
      const size = btn.getAttribute('data-size') || '$100,000';
      const fee = btn.getAttribute('data-fee') || '$795';

      document.getElementById('modal-summary-plan').textContent = plan;
      document.getElementById('modal-summary-size').textContent = size;
      document.getElementById('modal-summary-fee').textContent = fee;

      openModal(checkoutModal);
    });
  });

  masterclassTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(masterclassModal);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(checkoutModal);
      closeModal(masterclassModal);
    });
  });

  [checkoutModal, masterclassModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Handle ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(checkoutModal);
      closeModal(masterclassModal);
      noticeOverlay?.classList.remove('active');
      mobileDrawer?.classList.remove('active');
    }
  });

  // Promo Code Engine in Checkout Modal
  const promoApplyBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('promo-code-input');
  const promoSuccessNotice = document.getElementById('promo-success-notice');

  if (promoApplyBtn && promoInput) {
    promoApplyBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'GOLDRUSH10' || code === 'GOLD10') {
        promoSuccessNotice.style.display = 'block';
        showToast('Promo Code Applied: 10% Discount + 100% Refund Guarantee Activated!');
      } else {
        showToast('Invalid promo code. Use code GOLDRUSH10 for 10% off!', 'info');
      }
    });
  }

  // Checkout Form Submission Simulation
  const checkoutForm = document.getElementById('simulated-checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(checkoutModal);
      showToast('🎉 Order Placed! Trader login credentials dispatched to your email.');
    });
  }

  // Masterclass Reservation Simulation
  const masterclassForm = document.getElementById('masterclass-form');
  if (masterclassForm) {
    masterclassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(masterclassModal);
      showToast('🎟 VIP Pass Reserved! Zoom invitation sent.');
    });
  }

  // 7. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 8. 3D Tilt Card Effect
  const tiltCards = document.querySelectorAll('.tilt-element');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // Welcome Toast
  setTimeout(() => {
    showToast('🌟 Welcome to Solid Gold Fund — 100% Payout Record Since 2023');
  }, 1200);

})();
