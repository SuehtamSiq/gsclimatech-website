const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

// Monitora o clique no botão do menu
menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    
    // Captura o elemento atual (seja ele <i> ou <svg> gerado pelo FontAwesome)
    const currentIcon = menuBtn.querySelector("i, svg");
    
    if (currentIcon) {
        if (currentIcon.tagName === "svg" || currentIcon.nodeName === "svg") {
            // Se o FontAwesome já converteu para SVG, mudamos o atributo interno que controla o desenho
            currentIcon.setAttribute("data-icon", isOpen ? "xmark" : "bars");
        } else {
            // Caso ele ainda seja uma tag <i> comum (fallback de segurança)
            currentIcon.setAttribute("class", isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars");
        }
    }
});

// Fecha o menu automaticamente ao clicar em um link
navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        
        const currentIcon = menuBtn.querySelector("i, svg");
        if (currentIcon) {
            if (currentIcon.tagName === "svg" || currentIcon.nodeName === "svg") {
                currentIcon.setAttribute("data-icon", "bars");
            } else {
                currentIcon.setAttribute("class", "fa-solid fa-bars");
            }
        }
    }
});

// ============================================================
// SCROLL REVEAL — anima os elementos .fade-in-up ao entrarem
// na viewport. Respeita prefers-reduced-motion.
// ============================================================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".fade-in-up");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // Sem observer disponível (ou o usuário prefere menos animação):
    // mostra tudo imediatamente.
    revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
}

// ============================================================
// FORMULÁRIO DE CONTATO — validação simples e feedback de envio.
// Sem backend conectado ainda: apenas simula o envio.
// Ver PROXIMOS-PASSOS.md para instruções de integração real.
// ============================================================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const formSuccess = document.getElementById("form-success");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // TODO: substituir por chamada real (fetch para API/CRM, EmailJS, etc.)
        formSuccess.classList.add("is-visible");
        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove("is-visible");
        }, 6000);
    });
}
