// ============================================================
// BANCO DE DADOS - CARIOLOGIA / DENTÍSTICA OPERATÓRIA
// Corrigido a partir do "Guia Mestre de Dentística Operatória"
// ============================================================

const FLASHCARDS = [
  { front: "pH crítico do esmalte?", back: "5.5 — abaixo deste valor inicia a desmineralização do esmalte." },
  { front: "pH crítico da dentina?", back: "6.2 a 6.7 — a dentina desmineraliza em pH mais alto que o esmalte (mais suscetível)." },
  { front: "Grampo indicado para retração gengival cervical?", back: "Grampo 212." },
  { front: "Grampos para molares no isolamento absoluto?", back: "200 a 205." },
  { front: "Grampos para pré-molares?", back: "206 a 209." },
  { front: "Composição da Smear Layer?", back: "Debris microscópicos de esmalte e dentina, bactérias, óleo residual e água." },
  { front: "Função do Silano nas resinas compostas?", back: "Agente de união (acoplamento) entre a carga inorgânica e a matriz orgânica." },
  { front: "Tempo de espera no tratamento expectante antes da restauração final?", back: "60 dias — permite a formação de dentina terciária/reacional." },
  { front: "Tamanho das partículas em resinas nanoparticuladas?", back: "Entre 5 e 100 nanômetros, oferecendo polimento superior." },
  { front: "Ângulo cavossuperficial no amálgama: quanto deve medir?", back: "90° (reto) — bisel é contraindicado, pois o amálgama é friável e fratura em margens finas." },
  { front: "Ângulo cavossuperficial na resina composta?", back: "Pode ser biselado (~45°) em áreas estéticas, otimizando adesão e transição de cor." },
  { front: "Cavidade na fóssula palatina de um incisivo — qual classe de Black?", back: "Classe I, pois fóssulas/fissuras são regiões de má-formação, mesmo em dentes anteriores." },
  { front: "Diferença entre parede pulpar e parede axial?", back: "Pulpar: perpendicular ao longo eixo do dente (assoalho horizontal). Axial: paralela ao longo eixo (presente em caixas proximais)." },
  { front: "Ângulo diedro vs. triedro?", back: "Diedro: encontro de 2 paredes (ex: pulpo-axial). Triedro: encontro de 3 paredes (ex: axio-vestíbulo-pulpar)." },
  { front: "Protocolo do ácido fosfórico 37% no condicionamento?", back: "Esmalte: 30 segundos. Dentina: 15 segundos. Forma a camada híbrida." },
  { front: "Diferença entre adesivo de 4ª e 5ª geração?", back: "4ª geração: 3 passos (ácido + primer + bond separados). 5ª geração: 2 passos (ácido + primer/bond em frasco único)." },
  { front: "Qual o maior inimigo da adesão?", back: "O erro técnico operacional — excesso de condicionamento em dentina ou fotopolimerização inadequada." },
  { front: "Indicação de proteção pulpar em cavidade profunda (sem exposição)?", back: "Forrador (hidróxido de cálcio) + base + selante." },
  { front: "Indicação de proteção pulpar em cavidade média?", back: "Base (CIV ou ZOE) + selante." },
  { front: "Exame padrão-ouro para lesões de Classe II ocultas?", back: "Radiografia interproximal (bitewing)." },
  { front: "Exame eficaz para Classe III em dentes anteriores?", back: "Transiluminação." },
  { front: "Característica clínica de lesão de cárie ATIVA?", back: "Opaca, rugosa e amolecida." },
  { front: "Característica clínica de lesão de cárie INATIVA (paralisada)?", back: "Brilhante, lisa e pigmentada." },
  { front: "Classe VI de Marzouk — onde ocorre?", back: "Pontas de cúspides de dentes posteriores ou bordas incisais de dentes anteriores." },
  { front: "Cavidade classificada como 'composta' tem quantas faces?", back: "2 faces (ex: cavidade MO)." },
];

const QUESTOES = [
  {
    tema: "Classificação de Black",
    enunciado: "Paciente apresenta lesão cariosa profunda em face palatina de um incisivo lateral superior, restrita à fóssula palatina. Segundo a classificação de Black, esta cavidade é classificada como:",
    alternativas: {
      A: "Classe III, pois trata-se de um dente anterior.",
      B: "Classe I, por se tratar de região de má-formação (fóssula).",
      C: "Classe V, por estar localizada na face palatina.",
      D: "Classe IV, pois envolve o ângulo incisal."
    },
    gabarito: "B",
    comentario: "Fóssulas e fissuras são consideradas regiões de má-formação e classificadas como Classe I independentemente da face ou do grupo dental (anterior ou posterior). O erro comum é classificar pela face anatômica (palatina → Classe III/V), ignorando que a etiologia (má-formação) prevalece sobre a localização.",
    incorretas: {
      A: "Incorreto: a Classe III é reservada a faces proximais de anteriores SEM envolvimento do ângulo incisal — não se aplica a fóssulas.",
      C: "Incorreto: a Classe V refere-se ao terço cervical de qualquer dente, não à região de fóssula palatina.",
      D: "Incorreto: a Classe IV exige envolvimento do ângulo incisal, que não está descrito no caso."
    },
    mnemonico: "Fóssula e cíngulo de anterior = sempre Classe I, nunca pela face."
  },
  {
    tema: "Proteção Dentino-Pulpar",
    enunciado: "Na técnica de tratamento expectante para cavidades muito profundas (próximas à polpa), o objetivo principal da primeira sessão clínica é:",
    alternativas: {
      A: "Remover todo o tecido cariado e realizar a restauração definitiva imediatamente.",
      B: "Realizar a remoção parcial da dentina infectada, evitando exposição pulpar acidental.",
      C: "Aplicar apenas verniz cavitário para reduzir a sensibilidade pós-operatória.",
      D: "Indicar tratamento endodôntico preventivo antes de qualquer remoção de tecido."
    },
    gabarito: "B",
    comentario: "A remoção parcial e seletiva da dentina cariada, seguida de selamento provisório com CIV ou hidróxido de cálcio por aproximadamente 60 dias, visa proteger o complexo dentino-pulpar e estimular a formação de dentina terciária (reacional) antes da restauração final.",
    incorretas: {
      A: "Incorreto: remover todo o tecido infectado em cavidades muito profundas pode causar exposição pulpar acidental — contraindicado nesta etapa.",
      C: "Incorreto: o verniz cavitário isolado não trata a dentina infectada remanescente nem estimula dentina reacional.",
      D: "Incorreto: o tratamento expectante visa justamente preservar a vitalidade pulpar, evitando a endodontia."
    },
    mnemonico: "Tratamento expectante = remoção PARCIAL + selamento + espera de 60 dias."
  },
  {
    tema: "Adesão e Resinas Compostas",
    enunciado: "Qual a principal justificativa biomecânica para o arredondamento dos ângulos internos em preparos cavitários destinados à restauração com resina composta?",
    alternativas: {
      A: "Facilitar o intertravamento mecânico (retenção friccional) do material restaurador.",
      B: "Dissipar as tensões de contração de polimerização e as forças mastigatórias, reduzindo concentração de estresse.",
      C: "Permitir a substituição por amálgama caso a resina composta apresente falha clínica.",
      D: "Aumentar a profundidade mínima exigida pela técnica adesiva."
    },
    gabarito: "B",
    comentario: "Ângulos internos arredondados evitam a concentração de tensões geradas pela contração de polimerização e pelas cargas oclusais, reduzindo o risco de fratura do remanescente dental e de trincas na interface adesiva — um princípio biomecânico central na odontologia adesiva.",
    incorretas: {
      A: "Incorreto: retenção friccional por ângulos vivos é princípio da técnica do amálgama (Black), não da resina composta, que tem retenção micromecânica/adesiva.",
      C: "Incorreto: o arredondamento não está relacionado a uma eventual substituição futura por amálgama.",
      D: "Incorreto: a profundidade mínima não é o critério associado ao arredondamento de ângulos."
    },
    mnemonico: "Ângulo vivo = amálgama (retenção); ângulo arredondado = resina (dissipação de estresse)."
  },
  {
    tema: "Ângulos Cavitários",
    enunciado: "Em relação ao ângulo cavossuperficial, assinale a alternativa correta:",
    alternativas: {
      A: "No amálgama, deve ser biselado em aproximadamente 45° para reduzir o risco de fratura marginal.",
      B: "Na resina composta, deve obrigatoriamente ser de 90°, independentemente da estética.",
      C: "No amálgama, deve ser de 90° (reto), pois o bisel produz margens finas e friáveis que fraturam sob carga.",
      D: "O ângulo cavossuperficial não influencia o selamento marginal nem a resistência do esmalte."
    },
    gabarito: "C",
    comentario: "O amálgama é um material friável (quebradiço) e necessita de um ângulo cavossuperficial reto (90°) para garantir espessura adequada de material na margem, evitando fraturas. Já a resina composta, por sua adesão micromecânica, permite o biselamento (~45°) em áreas estéticas, otimizando a transição óptica e a área de adesão.",
    incorretas: {
      A: "Incorreto: bisel em amálgama é classificado no próprio guia como 'erro fatal' — produz margens finas que fraturam.",
      B: "Incorreto: a resina permite biselamento em situações estéticas; não há obrigatoriedade de 90°.",
      D: "Incorreto: o ângulo cavossuperficial é justamente o ponto crítico que determina o vedamento marginal e a resistência do esmalte remanescente."
    },
    mnemonico: "Amálgama = reto e vivo (90°). Resina = pode biselar para estética/adesão."
  },
  {
    tema: "Paredes Cavitárias",
    enunciado: "Sobre as paredes internas (de fundo) de uma cavidade, assinale a afirmativa correta:",
    alternativas: {
      A: "A parede axial é perpendicular ao longo eixo do dente e está presente apenas em cavidades oclusais.",
      B: "A parede pulpar é paralela ao longo eixo do dente, formando o assoalho da cavidade.",
      C: "A parede axial é paralela ao longo eixo do dente e está presente em caixas proximais e cervicais.",
      D: "Paredes circundantes não atingem a superfície externa do dente, diferindo das paredes de fundo."
    },
    gabarito: "C",
    comentario: "A parede axial é, por definição, uma parede de fundo paralela ao longo eixo dental, característica das caixas proximais (Classe II, III, IV) e de preparos cervicais (Classe V). Já a parede pulpar é perpendicular ao longo eixo, formando um assoalho horizontal.",
    incorretas: {
      A: "Incorreto: inverte a definição — a parede axial é paralela (não perpendicular) ao longo eixo, e não se limita a cavidades oclusais.",
      B: "Incorreto: a parede pulpar é PERPENDICULAR ao longo eixo (assoalho horizontal); a descrição dada corresponde à parede axial.",
      D: "Incorreto: é o oposto — as paredes circundantes SE ESTENDEM até a superfície externa, enquanto as paredes internas (de fundo) não atingem essa superfície."
    },
    mnemonico: "PUlpar = PerpendicUlar (assoalho). AXial = Ao longo do eiXo (paralela)."
  },
  {
    tema: "Isolamento do Campo Operatório",
    enunciado: "Em relação ao isolamento absoluto do campo operatório, assinale a alternativa correta:",
    alternativas: {
      A: "É contraindicado em pacientes com erupção dentária incompleta devido à falta de retenção para o grampo.",
      B: "Deve ser sempre realizado com grampo, mesmo em dentes anteriores, independentemente da necessidade de retração gengival.",
      C: "O grampo 212 é o indicado para molares, enquanto os grampos 200-205 são reservados a pré-molares.",
      D: "É a técnica de escolha apenas para procedimentos curtos e cimentações provisórias."
    },
    gabarito: "A",
    comentario: "Entre as contraindicações ao isolamento absoluto estão a asma severa, a alergia ao látex e a erupção dental incompleta — esta última por impedir a fixação adequada (retenção) do grampo. O isolamento absoluto, por proporcionar campo seco e maior segurança, é indicado para a maioria dos procedimentos adesivos, não apenas os curtos.",
    incorretas: {
      B: "Incorreto: em dentes anteriores, o isolamento pode ser realizado SEM grampo quando não há necessidade de retração gengival profunda.",
      C: "Incorreto: inverte os grampos — 200-205 são para molares e 206-209 para pré-molares; o 212 é destinado à retração cervical.",
      D: "Incorreto: essa descrição corresponde ao isolamento RELATIVO, não ao absoluto."
    },
    mnemonico: "Contraindicações do isolamento absoluto: Asma, Alergia ao látex, Ausência de retenção (3 'A's)."
  },
  {
    tema: "Princípios de Preparo Cavitário (Black)",
    enunciado: "Das sete etapas clássicas do preparo cavitário segundo Black, qual delas tem como objetivo principal a remoção da Smear Layer, sendo vital para a interface adesiva?",
    alternativas: {
      A: "Resistência",
      B: "Conveniência",
      C: "Acabamento",
      D: "Limpeza"
    },
    gabarito: "D",
    comentario: "A etapa de Limpeza tem como finalidade remover a Smear Layer — camada de debris microscópicos de esmalte, dentina, bactérias, óleo residual e água — que, se não removida ou tratada adequadamente, compromete a formação da camada híbrida e a qualidade da adesão.",
    incorretas: {
      A: "Incorreto: Resistência refere-se ao fundo plano e perpendicular às forças, visando evitar fraturas estruturais, não à remoção de debris.",
      B: "Incorreto: Conveniência trata do acesso e visibilidade ao preparo.",
      C: "Incorreto: Acabamento refere-se ao alisamento das margens da cavidade, etapa distinta da limpeza da Smear Layer."
    },
    mnemonico: "As 7 etapas: Contorno, Resistência, Retenção, Conveniência, remoção de Cárie, Acabamento, Limpeza (CRRCCAL)."
  },
  {
    tema: "Etiologia e Fisiopatologia da Cárie",
    enunciado: "Sobre as Lesões Cervicais Não Cariosas (LCNC), assinale a associação correta:",
    alternativas: {
      A: "Abrasão é a perda de estrutura dental por ácidos de origem intrínseca ou extrínseca.",
      B: "Erosão é o desgaste mecânico causado por agentes externos, como escovação traumática.",
      C: "Abfração é a lesão em cunha causada por sobrecarga oclusal de natureza biomecânica.",
      D: "Abrasão, erosão e abfração são sinônimos e descrevem o mesmo mecanismo etiológico."
    },
    gabarito: "C",
    comentario: "A abfração é descrita como uma lesão em forma de cunha resultante de sobrecarga oclusal biomecânica (flexão dental sob carga). É um mecanismo distinto da abrasão (desgaste mecânico externo, ex.: escovação) e da erosão (perda química por ácidos).",
    incorretas: {
      A: "Incorreto: a definição apresentada (perda química por ácidos) corresponde à EROSÃO, não à abrasão.",
      B: "Incorreto: a definição apresentada (desgaste mecânico externo) corresponde à ABRASÃO, não à erosão — as definições estão trocadas.",
      D: "Incorreto: são três mecanismos etiológicos distintos (mecânico, químico e biomecânico) e não devem ser confundidos."
    },
    mnemonico: "Abrasão = Atrito mecânico. Erosão = ácido (quErosão/química). Abfração = Flexão/Força oclusal."
  },
];
