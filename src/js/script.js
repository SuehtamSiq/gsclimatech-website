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
