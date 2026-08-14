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
// FORMULÁRIO DE CONTATO — prioridade WhatsApp, com e-mail (EmailJS)
// disparado em paralelo como reforço.
//
// IMPORTANTE: sem um backend/WhatsApp Business API, não existe como
// o site enviar a mensagem sozinho e "silenciosamente" pro WhatsApp.
// O que fazemos aqui é abrir uma conversa já com o texto pronto
// (via link wa.me) — a pessoa só precisa apertar "Enviar" lá dentro.
// Isso funciona tanto no WhatsApp Web (desktop) quanto no app (celular).
//
// COMO ATIVAR O WHATSAPP (1 minuto):
// 1. Troque o valor de WHATSAPP_NUMBER abaixo pelo número da empresa,
//    no formato internacional, SÓ números (sem +, espaço, traço ou parênteses):
//    55 (Brasil) + DDD + número. Ex.: "5511987654321"
//
// O e-mail automático via EmailJS continua funcionando como estava
// (veja as instruções logo abaixo) — ele dispara em paralelo, sem
// travar a abertura do WhatsApp.
// ============================================================
const WHATSAPP_NUMBER = "5511937441209"; // ex.: "5511987654321"

const EMAILJS_SERVICE_ID = "SEU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "SUA_PUBLIC_KEY";

if (window.emailjs && EMAILJS_PUBLIC_KEY !== "SUA_PUBLIC_KEY") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const formSuccess = document.getElementById("form-success");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const data = new FormData(contactForm);
        const name = (data.get("name") || "").toString().trim();
        const email = (data.get("email") || "").toString().trim();
        const phone = (data.get("phone") || "").toString().trim();
        const message = (data.get("message") || "").toString().trim() || "Sem mensagem adicional.";

        // 1) WHATSAPP — prioridade. Precisa ser disparado de forma síncrona,
        // logo no clique, senão o navegador pode bloquear a abertura da aba.
        if (WHATSAPP_NUMBER !== "SEU_NUMERO_WHATSAPP") {
            const whatsappUrl = buildWhatsAppUrl({ name, email, phone, message });
            window.open(whatsappUrl, "_blank", "noopener");
        } else {
            console.warn("WhatsApp não configurado ainda — defina WHATSAPP_NUMBER no topo deste bloco em script.js.");
        }

        // 2) E-MAIL — reforço em paralelo, não bloqueia o passo acima.
        if (window.emailjs && EMAILJS_PUBLIC_KEY !== "SUA_PUBLIC_KEY") {
            emailjs
                .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .catch((error) => console.error("Erro ao enviar e-mail de reforço:", error));
        }

        showSuccess();
        contactForm.reset();
    });

    function showSuccess() {
        formSuccess.classList.add("is-visible");
        setTimeout(() => formSuccess.classList.remove("is-visible"), 6000);
    }

    function buildWhatsAppUrl({ name, email, phone, message }) {
        const lines = [
            "Olá! Vim pelo site da GS ClimaTech e gostaria de um orçamento.",
            "",
            `Nome: ${name}`,
            `E-mail: ${email}`,
            `Telefone: ${phone}`,
            `Mensagem: ${message}`,
        ];
        const text = encodeURIComponent(lines.join("\n"));
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    }
}