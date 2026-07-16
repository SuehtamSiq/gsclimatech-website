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
// FORMULÁRIO DE CONTATO — envia o e-mail automaticamente via
// EmailJS (sem precisar de servidor/backend próprio).
//
// COMO ATIVAR (leva ~5 minutos):
// 1. Crie uma conta grátis em https://www.emailjs.com
// 2. Em "Email Services", conecte o e-mail da empresa (Gmail, Outlook etc.)
//    e copie o SERVICE_ID gerado.
// 3. Em "Email Templates", crie um template usando as variáveis
//    {{name}}, {{email}}, {{phone}} e {{message}} (mesmos "name"
//    dos campos do formulário no index.html) e copie o TEMPLATE_ID.
// 4. Em "Account" > "General", copie sua Public Key.
// 5. Troque os três valores abaixo (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY).
// ============================================================
const EMAILJS_SERVICE_ID = "SEU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "SUA_PUBLIC_KEY";

if (window.emailjs && EMAILJS_PUBLIC_KEY !== "SUA_PUBLIC_KEY") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const formSuccess = document.getElementById("form-success");
    const submitBtn = contactForm.querySelector(".contact__submit");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Enquanto as chaves acima não forem preenchidas, o formulário
        // só simula o envio (não sai nenhum e-mail de verdade).
        if (!window.emailjs || EMAILJS_PUBLIC_KEY === "SUA_PUBLIC_KEY") {
            console.warn("EmailJS não configurado ainda — veja as instruções no topo deste bloco em script.js.");
            showSuccess();
            contactForm.reset();
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "ENVIANDO...";

        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                showSuccess();
                contactForm.reset();
            })
            .catch((error) => {
                console.error("Erro ao enviar o formulário:", error);
                alert("Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    });

    function showSuccess() {
        formSuccess.classList.add("is-visible");
        setTimeout(() => formSuccess.classList.remove("is-visible"), 6000);
    }
}
