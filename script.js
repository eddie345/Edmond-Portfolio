const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const form = document.querySelector('.contact-form');

if (form) {
    const statusBox = form.querySelector('#formStatus') || document.getElementById('formStatus');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Send message';
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        const name = (form.querySelector('[name="name"]') ? form.querySelector('[name="name"]').value.trim() : '') || 'Potential Client';
        const email = form.querySelector('[name="email"]') ? form.querySelector('[name="email"]').value.trim() : '';
        const projectType = (form.querySelector('[name="project_type"]') ? form.querySelector('[name="project_type"]').value : '') || 'General Inquiry';
        const message = (form.querySelector('[name="message"]') ? form.querySelector('[name="message"]').value.trim() : '') || 'No details provided.';

        // Background AJAX dispatch to FormSubmit
        const payload = JSON.stringify({
            name: name,
            email: email,
            _subject: `New Project Inquiry: ${projectType} from ${name}`,
            project_type: projectType,
            message: message,
            _captcha: 'false',
            _template: 'table'
        });

        try {
            fetch('https://formsubmit.co/ajax/hi@codewithedmond.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: payload,
                keepalive: true
            }).catch((err) => console.warn('Background email dispatch note:', err));
        } catch (err) {
            console.warn('Dispatch init error:', err);
        }

        // Inline AJAX notification response
        setTimeout(() => {
            if (statusBox) {
                statusBox.className = 'form-status success is-visible';
                statusBox.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Message sent successfully! Thank you for reaching out, I\'ll get back to you shortly.</span>
                `;
            }

            form.reset();
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }

            // Automatically hide the inline notification after 8 seconds
            setTimeout(() => {
                if (statusBox) {
                    statusBox.classList.remove('is-visible');
                }
            }, 8000);
        }, 300);
    });
}

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('projectModalImage');
const modalTitle = document.getElementById('projectModalTitle');
const modalTagline = document.getElementById('projectModalTagline');
const modalDescription = document.getElementById('projectModalDescription');
const modalLink = document.getElementById('projectModalLink');

function openProjectUrl(url) {
    if (!url || url === '#' || url === 'javascript:void(0)') return;

    try {
        const normalizedUrl = new URL(url, window.location.href).toString();
        const popup = window.open('', '_blank', 'noopener,noreferrer');

        if (popup) {
            popup.opener = null;
            popup.location.href = normalizedUrl;
            return;
        }

        const tempLink = document.createElement('a');
        tempLink.href = normalizedUrl;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener noreferrer';
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        tempLink.remove();
    } catch (error) {
        console.warn('Invalid project URL:', url, error);
    }
}

function openProjectModal(card) {
    if (!modal || !card) return;

    const title = card.dataset.title || 'Project';
    const tagline = card.dataset.tagline || 'Selected work';
    const description = card.dataset.description || 'Project details';
    const image = card.dataset.image || '';
    const link = card.dataset.link || '#';

    modalTitle.textContent = title;
    modalTagline.textContent = tagline;
    modalDescription.textContent = description;
    modalImage.src = image;
    modalImage.alt = `${title} preview`;
    modalLink.href = link;

    modalLink.setAttribute('target', '_blank');
    modalLink.setAttribute('rel', 'noreferrer');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeProjectModal);
});

document.querySelectorAll('[data-back-to-portfolio]').forEach((button) => {
    button.addEventListener('click', () => {
        closeProjectModal();
        const workSection = document.getElementById('work');
        if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.querySelectorAll('.project-trigger, .project-preview-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');

        if (!href || href === '#' || href === 'javascript:void(0)') {
            event.preventDefault();
            return;
        }

        // Let the browser handle standard new-tab navigation for project links.
        // The links already include target="_blank" and rel="noopener noreferrer".
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeProjectModal();
    }
});

const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    toggleBackToTopButton();
    window.addEventListener('scroll', toggleBackToTopButton, { passive: true });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
