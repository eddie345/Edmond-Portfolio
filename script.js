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
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim() || 'New client';
        const email = form.querySelector('[name="email"]').value.trim();
        const subject = form.querySelector('[name="subject"]').value.trim() || `Project inquiry from ${name}`;
        const message = form.querySelector('[name="message"]').value.trim() || 'No message provided.';
        const emailAddress = 'edmondkorley5@gmail.com';
        const whatsappNumber = '233500886680';

        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`)}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Edmond, my name is ${name}.\n\n${message}\n\nEmail: ${email || 'Not provided'}`)}`;

        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Opening...';
        button.disabled = true;

        window.open(gmailLink, '_blank', 'noopener');
        window.open(whatsappLink, '_blank', 'noopener');

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
        }, 1800);
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
