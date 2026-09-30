// ============================================================
// LOGIN — autentica no Supabase e redireciona pro painel certo
// (cliente ou funcionário) de acordo com quem fez login.
//
// COMO CONFIGURAR: cole a Project URL e a chave publishable/anon
// de cada projeto (Settings > API Keys no Supabase). Nunca cole
// a chave secret/service_role aqui.
// ============================================================
const PROD_HOSTNAMES = ["gsclimatech-website.vercel.app/"]; // domínio de produção
const isProd = PROD_HOSTNAMES.includes(window.location.hostname);

const SUPABASE_URL = isProd ? "https://chnjlswtlhmeirqyieil.supabase.co" : "https://ggxvqexynkmprnowntwm.supabase.co";
const SUPABASE_KEY = isProd ? "sb_publishable_sYcgnLUpfSbstg491XbtUg_hitqKETG" : "sb_publishable_wTB5QsHT4JjgTfoIfAcVHg_StIjxXQb";

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const { data, error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
        loginError.textContent = "E-mail ou senha incorretos.";
        return;
    }

    const userId = data.user.id;

    const { data: funcionario } = await db
        .from("funcionarios")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

    if (funcionario) {
        window.location.href = "painel-equipe.html";
        return;
    }

    const { data: cliente } = await db
        .from("clientes")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

    if (cliente) {
        window.location.href = "painel-cliente.html";
        return;
    }

    loginError.textContent = "Login feito, mas essa conta ainda não está vinculada a um cliente ou funcionário.";
});