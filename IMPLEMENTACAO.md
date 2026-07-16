# GS ClimaTech — Landing Page

## O que foi implementado

**Hero (`#home`)** — mantive sua estrutura e classes originais e adicionei:
- Duas "correntes de ar" (`.airflow`) — círculos borrados em gradiente azul que se movem lentamente ao fundo. É o elemento de assinatura visual do site: em vez de blobs genéricos, remetem ao fluxo de ar de um sistema de climatização, e entregam o efeito "liquid glass" pedido.
- Copy revisada (headline, subtítulo) e um bloco de estatísticas de confiança (anos de mercado, instalações entregues, avaliação média).
- Selo flutuante sobre a imagem (`.header__badge`) com efeito glass (`backdrop-filter: blur`).

**Sobre Nós (`#about`)** — layout assimétrico: texto à esquerda (história + 3 pilares: Tecnologia, Pontualidade, Limpeza) e um painel visual à direita com card de estatística e painel translúcido.

**Serviços (`#service`)** — grid de 4 cards (Instalação, Manutenção Preventiva, Higienização Química, Infraestrutura) com ícone, hover flutuante e sombra suave. Abaixo, um **carrossel infinito de marcas** (`.brands__carousel`) feito em CSS puro (`@keyframes` + faixa duplicada), sem depender de JS ou de imagens de logotipos de terceiros — usei "chips" com nome da marca + ícone, para evitar qualquer problema de direito de uso de logo. Pausa automaticamente no hover.

**Galeria (`#galery`)** — mosaico com 2 tiles grandes e 4 pequenos. Como não recebi fotos reais dos projetos, os tiles usam gradiente + ícone como placeholder (ver "Próximos passos").

**Contato (`#contact`)** — formulário (nome, e-mail, telefone, mensagem) com validação HTML5 + feedback de envio via JS, e uma coluna de informações de contato (e-mail, WhatsApp, horário, região de atendimento).

**Footer** — versão dark (`--bg-section-dark`), navegação rápida, contato e ícones sociais.

**Animações** — classe utilitária `.fade-in-up`, ativada via `IntersectionObserver` (arquivo `script.js`) conforme os elementos entram na tela. Respeita `prefers-reduced-motion`.

Todo o CSS novo foi anexado ao final do seu `style.css`, comentado por seção, e o bloco desktop (`@media (min-width: 769px)`) ficou separado no fim do arquivo, como pedido.

## O que ainda falta

1. **Imagens reais** — a galeria e a foto do header usam placeholders. Troque `src/images/header.JPEG` pela foto definitiva e adicione as fotos de projetos em `src/images/galery/`, atualizando os `div.galery__item` para `<img>`.
2. **Envio do formulário** — o formulário hoje só simula o envio (não há backend). Veja a seção abaixo para integrar de verdade.
3. **Logos reais das marcas parceiras** — troquei por chips de texto para evitar usar logotipos de terceiros sem autorização; se vocês tiverem os logos oficiais com permissão de uso, substitua `.brand__chip` por `<img>`.
4. **SEO básico** — faltam meta description, Open Graph e um favicon.
5. **Conteúdo definitivo** — os textos que escrevi são um ponto de partida; vale revisar com o time de marketing (preços, diferenciais reais, região de atendimento exata).

## Próximos passos sugeridos

- **Integrar o formulário** a um serviço como Formspree, EmailJS ou uma rota própria (Node/PHP) — hoje ele só faz `e.preventDefault()` e mostra uma mensagem de sucesso local.
- **Otimizar imagens** (WebP, `loading="lazy"`) antes de publicar.
- **Testar acessibilidade**: contraste dos textos sobre os gradientes da galeria, navegação por teclado no menu mobile, `aria-label`s dos ícones sociais.
- **Testar em dispositivos reais** (o layout foi construído mobile-first, com breakpoint único em 769px, igual ao padrão que você já usava no nav).
- **Deploy**: qualquer host estático (Vercel, Netlify, GitHub Pages) funciona, já que não há dependências de build.
