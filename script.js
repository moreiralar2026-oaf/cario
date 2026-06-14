// ============================================================
// DASHBOARD INTERATIVO - DENTÍSTICA OPERATÓRIA
// ============================================================

const STORAGE_KEY = 'dentistica_progresso_v1';

let progresso = carregarProgresso();
let flashIndex = 0;
let flashFlipped = false;

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFlashcards();
    initQuestoes();
    atualizarStats();
});

// ===================== PERSISTÊNCIA =====================
function carregarProgresso() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { /* ignora */ }
    return { flashcardsVistos: {}, respostas: {} };
}

function salvarProgresso() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
    } catch (e) { /* ambiente sem localStorage */ }
}

document.getElementById('reset-btn').addEventListener('click', () => {
    if (!confirm('Tem certeza que deseja reiniciar todo o progresso?')) return;
    progresso = { flashcardsVistos: {}, respostas: {} };
    salvarProgresso();
    location.reload();
});

// ===================== TABS =====================
function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
}

// ===================== FLASHCARDS =====================
function initFlashcards() {
    document.getElementById('flash-total').textContent = FLASHCARDS.length;

    const card = document.getElementById('flashcard');
    card.addEventListener('click', flipFlashcard);

    document.getElementById('flash-flip').addEventListener('click', (e) => {
        e.stopPropagation();
        flipFlashcard();
    });

    document.getElementById('flash-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateFlash(-1);
    });

    document.getElementById('flash-next').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateFlash(1);
    });

    renderFlashJump();
    renderFlashcard();
}

function renderFlashcard() {
    const item = FLASHCARDS[flashIndex];
    document.getElementById('flash-front').textContent = item.front;
    document.getElementById('flash-back').textContent = item.back;
    document.getElementById('flash-current').textContent = flashIndex + 1;

    const card = document.getElementById('flashcard');
    card.classList.remove('flipped');
    flashFlipped = false;

    // marca como visto
    progresso.flashcardsVistos[flashIndex] = true;
    salvarProgresso();
    atualizarStats();

    // atualiza dots
    document.querySelectorAll('.flashcard-jump span').forEach((dot, i) => {
        dot.classList.toggle('active', i === flashIndex);
    });
}

function flipFlashcard() {
    const card = document.getElementById('flashcard');
    flashFlipped = !flashFlipped;
    card.classList.toggle('flipped', flashFlipped);
}

function navigateFlash(delta) {
    flashIndex = (flashIndex + delta + FLASHCARDS.length) % FLASHCARDS.length;
    renderFlashcard();
}

function renderFlashJump() {
    const container = document.getElementById('flash-jump');
    container.innerHTML = '';
    FLASHCARDS.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === flashIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            flashIndex = i;
            renderFlashcard();
        });
        container.appendChild(dot);
    });
}

// ===================== QUESTÕES =====================
function initQuestoes() {
    const temas = [...new Set(QUESTOES.map(q => q.tema))];
    const filterBar = document.getElementById('filter-bar');

    temas.forEach(tema => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filtro = tema;
        btn.textContent = tema;
        filterBar.appendChild(btn);
    });

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderQuestoes(btn.dataset.filtro);
        });
    });

    renderQuestoes('todos');
}

function renderQuestoes(filtro) {
    const container = document.getElementById('questoes-container');
    container.innerHTML = '';

    const lista = filtro === 'todos'
        ? QUESTOES
        : QUESTOES.filter(q => q.tema === filtro);

    lista.forEach((q) => {
        const idx = QUESTOES.indexOf(q);
        const card = document.createElement('div');
        card.className = 'questao-card';

        const tag = document.createElement('span');
        tag.className = 'questao-tag';
        tag.textContent = q.tema;
        card.appendChild(tag);

        const titulo = document.createElement('h4');
        titulo.textContent = `Questão ${idx + 1}. ${q.enunciado}`;
        card.appendChild(titulo);

        const altContainer = document.createElement('div');
        altContainer.className = 'alternativas';

        const resultadoBox = document.createElement('div');
        resultadoBox.className = 'resultado-box';

        Object.entries(q.alternativas).forEach(([letra, texto]) => {
            const btn = document.createElement('button');
            btn.className = 'alt-btn';
            btn.textContent = `${letra}) ${texto}`;
            btn.dataset.letra = letra;

            btn.addEventListener('click', () => {
                responderQuestao(idx, letra, q, altContainer, resultadoBox);
            });

            altContainer.appendChild(btn);
        });

        card.appendChild(altContainer);
        card.appendChild(resultadoBox);
        container.appendChild(card);

        // restaura resposta salva
        const respostaSalva = progresso.respostas[idx];
        if (respostaSalva) {
            responderQuestao(idx, respostaSalva, q, altContainer, resultadoBox, true);
        }
    });
}

function responderQuestao(idx, letraEscolhida, q, altContainer, resultadoBox, silencioso) {
    const jaRespondida = progresso.respostas[idx] !== undefined;

    if (!jaRespondida) {
        progresso.respostas[idx] = letraEscolhida;
        salvarProgresso();
        atualizarStats();
    }

    // desabilita e marca alternativas
    altContainer.querySelectorAll('.alt-btn').forEach(btn => {
        btn.classList.add('disabled');
        const letra = btn.dataset.letra;
        if (letra === q.gabarito) {
            btn.classList.add('correct');
        } else if (letra === progresso.respostas[idx]) {
            btn.classList.add('incorrect');
        }
    });

    // monta resultado
    const acertou = progresso.respostas[idx] === q.gabarito;
    let html = `<h5>${acertou ? '✅ Resposta correta!' : '❌ Resposta incorreta'}</h5>`;
    html += `<p><strong>Gabarito: ${q.gabarito}.</strong> ${q.comentario}</p>`;

    if (q.incorretas) {
        html += `<div style="margin-top:8px;">`;
        Object.entries(q.incorretas).forEach(([letra, texto]) => {
            html += `<p class="erro-item">⚠️ <strong>${letra})</strong> ${texto}</p>`;
        });
        html += `</div>`;
    }

    if (q.mnemonico) {
        html += `<div class="mnemonico-box">💡 <strong>Macete:</strong> ${q.mnemonico}</div>`;
    }

    resultadoBox.innerHTML = html;
    resultadoBox.classList.add('show');
}

// ===================== STATS =====================
function atualizarStats() {
    const flashVistos = Object.keys(progresso.flashcardsVistos).length;
    const respondidas = Object.keys(progresso.respostas).length;
    const total = QUESTOES.length;

    let acertos = 0;
    Object.entries(progresso.respostas).forEach(([idx, letra]) => {
        if (QUESTOES[idx] && QUESTOES[idx].gabarito === letra) acertos++;
    });

    const taxa = respondidas > 0 ? Math.round((acertos / respondidas) * 100) : 0;

    document.getElementById('stat-flash').textContent = `${flashVistos}/${FLASHCARDS.length}`;
    document.getElementById('stat-questoes').textContent = `${respondidas}/${total}`;
    document.getElementById('stat-acertos').textContent = `${taxa}%`;
}
