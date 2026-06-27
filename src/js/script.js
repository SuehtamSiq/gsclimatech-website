const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Abre e fecha o menu ao clicar no botão do hambúrguer
menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

/* --- MELHORIA DE USABILIDADE ADICIONADA --- */
// Fecha o menu automaticamente quando o usuário clica em um link do menu
navLinks.addEventListener("click", (e) => {
    // Verifica se o clique foi de fato em um link (tag <a>)
    if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
    }
});

