// Simulados locais (embutidos no app).
// Ficam sempre disponiveis, mesmo se o Firestore estiver fora do ar ou vazio,
// e seguem o mesmo formato dos documentos da colecao "AVALIACOES".

export const INSTITUICAO_PADRAO = "Analise e Desenvolvimento de Sistemas (Estacio)";
export const DISCIPLINA_ESTRUTURA_DADOS = "Estrutura de Dados e Alocação de Memória";

// Avaliacao academica - Estrutura de Dados e Alocacao de Memoria (10 questoes)
const questoesEstruturaDados = [
  {
    id: 1,
    enunciado:
      "Considere a diferença de implementação e comportamento entre listas simplesmente e duplamente encadeadas. Avalie as afirmações a seguir:\n" +
      "I. Em cada nó de uma lista duplamente encadeada, há necessidade de armazenar o dobro de referências de ponteiros em relação a uma lista simples.\n" +
      "II. A remoção de um nó do meio de uma lista duplamente encadeada possui complexidade assintótica O(1) caso o ponteiro para o nó a ser removido já seja conhecido.\n" +
      "III. Listas duplamente encadeadas não permitem modificações ou inserções de elementos em posições intermediárias.\n" +
      "Está correto apenas o que se afirma em:",
    alternativas: ["I.", "II.", "I e II.", "I e III.", "II e III."],
    resposta_correta: 2
  },
  {
    id: 2,
    enunciado:
      "Em linguagem C, deseja-se alocar dinamicamente na memória Heap um vetor para armazenar 10 elementos do tipo double. Qual instrução expressa corretamente essa alocação?",
    alternativas: [
      "double vetor[10];",
      "malloc(10 * sizeof(double));",
      "malloc(10 + sizeof(double));",
      "double[10 * sizeof(double)];",
      "free(10 * sizeof(double));"
    ],
    resposta_correta: 1
  },
  {
    id: 3,
    enunciado:
      "Sobre os mecanismos de gestão e alocação dinâmica de memória na linguagem C, assinale a alternativa correta:",
    alternativas: [
      "O operador sizeof é utilizado exclusivamente pela função free() para identificar o tamanho liberado.",
      "As funções malloc(), free() e o operador sizeof formam o conjunto base essencial para gerenciar a memória dinâmica.",
      "A função malloc() recebe como parâmetro a quantidade de variáveis que se deseja alocar, independente do tipo.",
      "As funções calloc() e realloc() servem primordialmente para desalocar vetores da memória.",
      "A função free() exige o ponteiro para o bloco e o tamanho em bytes do tipo alocado."
    ],
    resposta_correta: 1
  },
  {
    id: 4,
    enunciado:
      "Assinale a alternativa correta referente às características fundamentais das estruturas de dados clássicas:",
    alternativas: [
      "Pilhas são estruturas do tipo LIFO (Last In, First Out), onde o último elemento inserido é o primeiro a ser removido.",
      "Filas são estruturas hierárquicas habitualmente implementadas sobre grafos não direcionados.",
      "Em uma Árvore Binária de Busca, todos os nós filhos possuem obrigatoriamente valores menores que o nó pai.",
      "O último nó de uma lista duplamente encadeada convencional contém sempre uma referência para o nó inicial.",
      "Grafos são restritos exclusivamente a ligações unidirecionais entre seus vértices."
    ],
    resposta_correta: 0
  },
  {
    id: 5,
    enunciado:
      "Sobre o algoritmo de ordenação por troca direta conhecido como Bubble Sort (Método da Bolha), assinale a afirmativa correta:",
    alternativas: [
      "Sua complexidade no pior caso e no caso médio é representada por O(n log n).",
      "Em uma versão otimizada com verificação de trocas, o tempo de execução pode atingir O(n) caso a entrada já esteja ordenada.",
      "O tempo de execução do algoritmo é exatamente idêntico para qualquer disposição inicial dos elementos do vetor.",
      "Se o vetor estiver inversamente ordenado, o algoritmo apresenta o seu melhor tempo de execução.",
      "A ordenação ocorre dividindo o vetor em duas metades recursivas sucessivas."
    ],
    resposta_correta: 1
  },
  {
    id: 6,
    enunciado:
      "Árvores de busca são estruturas chave no armazenamento eficiente de dados. Assinale a combinação de propriedades que justifica a ampla utilização dessa estrutura:",
    alternativas: [
      "Necessidade constante de reagrupar elementos através de rotinas externas de ordenação.",
      "Suporte eficiente tanto ao acesso direto quanto ao percurso sequencial ordenado, aliado à flexibilidade de inserções e remoções.",
      "Dependência de estruturas auxiliares rígidas, como pilhas e filas estáticas, para armazenamento dos nós.",
      "Eliminação completa da necessidade de chaves ou índices para localização dos registros.",
      "Aplicação restrita apenas à memória primária da máquina."
    ],
    resposta_correta: 1
  },
  {
    id: 7,
    enunciado:
      "Analise as afirmações sobre os métodos de passagem de parâmetros em linguagens de programação:\n" +
      "I. Na passagem por referência, o parâmetro formal recebe o endereço de memória do argumento real.\n" +
      "II. Na passagem por valor, é criada uma cópia do argumento, isolando a variável original de alterações feitas na função.\n" +
      "III. Alterações feitas em parâmetros passados por valor refletem-se diretamente no escopo chamador.\n" +
      "IV. Quando um parâmetro é passado por referência, modificações dentro da função alteram o valor no programa principal.\n" +
      "V. Na passagem por valor, modificações no parâmetro formal não afetam o valor da variável original.\n" +
      "Estão corretas:",
    alternativas: [
      "I e III, apenas.",
      "II, III e IV, apenas.",
      "I, II, IV e V, apenas.",
      "I, II e III, apenas.",
      "III, IV e V, apenas."
    ],
    resposta_correta: 2
  },
  {
    id: 8,
    enunciado:
      "Considere o seguinte trecho hipotético na linguagem C:\n" +
      "```\nvoid funcaoB() { /* procedimento secundario */ }\nvoid funcaoA() { int contador = 0; funcaoB(); }\n```\n" +
      "Sobre a variável contador, é correto afirmar:",
    alternativas: [
      "O escopo de contador estende-se para dentro do bloco de código de funcaoB().",
      "O tempo de vida de contador é encerrado no momento em que funcaoB() começa a ser executada.",
      "O tempo de vida de contador permanece ativo durante a execução de funcaoB(), pois o quadro de pilha de funcaoA() continua na memória.",
      "A variável contador possui escopo dinâmico e fica acessível globalmente durante a execução.",
      "O escopo e o tempo de vida de contador pertencem exclusivamente à funcaoB()."
    ],
    resposta_correta: 2
  },
  {
    id: 9,
    enunciado:
      "Observe a lógica do seguinte trecho de código escrito em Java:\n" +
      "```\nfor (int i = 0; i < array.length - 1; i++) {\n" +
      "  for (int j = 0; j < array.length - 1 - i; j++) {\n" +
      "    if (array[j] > array[j + 1]) {\n" +
      "      int temp = array[j];\n" +
      "      array[j] = array[j + 1];\n" +
      "      array[j + 1] = temp;\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n" +
      "O trecho apresentado implementa o algoritmo de ordenação conhecido como:",
    alternativas: ["Quick Sort.", "Merge Sort.", "Heap Sort.", "Bubble Sort.", "Insertion Sort."],
    resposta_correta: 3
  },
  {
    id: 10,
    enunciado:
      "Nas Árvores AVL, o equilíbrio da estrutura é mantido por meio de rotações baseadas no fator de balanceamento dos nós. Sobre esse processo, é correto afirmar:",
    alternativas: [
      "Quando o desbalanceamento ocorre na subárvore à direita de um nó, realiza-se uma rotação simples à esquerda para reequilibrar a estrutura.",
      "Uma rotação simples à direita é aplicada quando a subárvore da direita do nó está mais alta que a da esquerda.",
      "Rotações duplas à esquerda ocorrem exclusivamente em casos de desbalanceamento simples à esquerda-esquerda.",
      "A rotação simples altera a ordem relativa de busca dos elementos na árvore binária.",
      "Se o desbalanceamento ocorrer à esquerda, a correção imediata é efetuada por uma rotação simples à esquerda."
    ],
    resposta_correta: 0
  }
];

export const DISCIPLINA_LISTAS_PILHAS = "Estrutura de Dados: Listas, Pilhas e Filas";

// Lista de exercicios - Listas, Pilhas e Filas (8 questoes)
const questoesListasPilhas = [
  {
    id: 1,
    enunciado:
      "O acesso ao elemento de uma estrutura de dados tipo pilha se restringe ao mais recente na pilha. Já o acesso a um elemento de uma estrutura tipo fila ocorre ao dado há mais tempo na fila. Sobre pilhas e filas, avalie as assertivas a seguir:\n" +
      "I - Uma forma de evitar o desperdício de memória numa fila em alocação sequencial é utilizar-se lista circular.\n" +
      "II - Em uma pilha em alocação encadeada, a complexidade da remoção é O(n).\n" +
      "III - Pilhas têm a propriedade de inverter a ordem de cadeias, enquanto as filas mantêm a ordem.\n" +
      "A opção que contém todas as assertivas corretas é:",
    alternativas: ["I.", "II.", "I e II.", "I e III.", "II e III."],
    resposta_correta: 3
  },
  {
    id: 2,
    enunciado:
      "Um algoritmo armazena uma sequência de dados inteiros primeiramente em uma fila, e depois transfere todos os elementos, na ordem de remoção da fila, para uma pilha. Em seguida, os dados são retirados da pilha e reinseridos em uma nova fila.\n" +
      "Sobre esse processo, é correto afirmar que:",
    alternativas: [
      "A fila final terá exatamente a mesma ordem de elementos da fila inicial.",
      "A pilha armazena os elementos na mesma ordem da fila, mantendo o primeiro elemento no topo.",
      "A fila final terá os elementos ordenados de forma decrescente, caso os dados de entrada estejam em ordem crescente.",
      "A fila final terá os elementos em ordem inversa à fila inicial.",
      "A pilha remove os elementos na mesma ordem em que foram inseridos nela."
    ],
    resposta_correta: 3
  },
  {
    id: 3,
    enunciado:
      "Várias estruturas de dados podem ser utilizadas para armazenar dados de uma aplicação. Em relação ao assunto, assinale a alternativa correta.",
    alternativas: [
      "A estrutura de dados do tipo pilha sempre retira os elementos que foram inseridos primeiro na estrutura.",
      "A estrutura de dados do tipo lista utiliza a ideia do primeiro a chegar, primeiro a ser servido para inserir elementos.",
      "A estrutura de dados do tipo fila sempre retira os elementos que entraram por último na fila.",
      "A estrutura de dados do tipo pilha, para retirar o elemento do topo da pilha, é necessário retirar o elemento da base da pilha.",
      "A estrutura de dados do tipo fila utiliza a ideia do primeiro a ser inserido, será o primeiro a ser retirado."
    ],
    resposta_correta: 4
  },
  {
    id: 4,
    enunciado:
      "(FGV/2022) Júlio está desenvolvendo uma aplicação e precisa implementar um mecanismo de desfazer/refazer de um editor de texto utilizando o algoritmo LIFO (Last In, First Out). Para implementar o algoritmo LIFO, Júlio deve usar a estrutura de dados:",
    alternativas: ["Fila", "Pilha", "Árvore", "Nó folha", "Tabela hash"],
    resposta_correta: 1
  },
  {
    id: 5,
    enunciado: "Uma lista ordenada alocada sequencialmente possui como desvantagem:",
    alternativas: [
      "Complexidade O(n) para a busca.",
      "Impossibilidade de remoção no meio da lista.",
      "Tamanho limitado de memória alocada para lista.",
      "Impossibilidade de acesso direto.",
      "A reserva de memória em posições contíguas."
    ],
    resposta_correta: 2
  },
  {
    id: 6,
    enunciado:
      "Sobre listas duplamente encadeadas, afirma-se:\n" +
      "I) Cada nó usa o dobro do número de campos ponteiro de uma lista simplesmente encadeada.\n" +
      "II) A complexidade de remoção é metade da complexidade de remoção em lista simplesmente encadeada.\n" +
      "III) Não permitem a inserção de nó no meio da lista.\n" +
      "É correto apenas:",
    alternativas: ["I.", "II.", "III.", "I e III.", "II e III."],
    resposta_correta: 0
  },
  {
    id: 7,
    enunciado:
      "(IBADE/2022) Uma estrutura de dados onde existe uma coleção ordenada de entidades sendo a metodologia de busca com base no deslocamento relativo ao primeiro (cabeça) da coleção, chama-se:",
    alternativas: ["Árvore.", "Lista.", "Pilha.", "Fila.", "Árvore binária."],
    resposta_correta: 1
  },
  {
    id: 8,
    enunciado:
      "(IBFC/2022 - Adaptada) Assinale, das alternativas abaixo, a única que identifica respectivamente uma Estrutura de Dados do tipo FIFO (First In, First Out) e uma outra com a Estrutura de dados do tipo LIFO (Last In, First Out):",
    alternativas: ["Lista - vetor", "Pilha - fila", "Vetor - lista", "Fila - pilha", "Matriz - vetor"],
    resposta_correta: 3
  }
];

export const SIMULADOS_LOCAIS = [
  {
    _id: "local-estrutura-de-dados",
    instituicao: INSTITUICAO_PADRAO,
    disciplina: DISCIPLINA_ESTRUTURA_DADOS,
    questoes: questoesEstruturaDados,
    data_criacao: "2026-10-29T00:00:00.000Z",
    local: true
  },
  {
    _id: "local-listas-pilhas-filas",
    instituicao: INSTITUICAO_PADRAO,
    disciplina: DISCIPLINA_LISTAS_PILHAS,
    questoes: questoesListasPilhas,
    data_criacao: "2026-10-30T00:00:00.000Z",
    local: true
  }
];

const normalizar = (texto = "") =>
  String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

// Junta os simulados locais a lista vinda do Firestore, sem duplicar
// disciplina que ja exista no banco e reaproveitando o nome da instituicao
// que ja esta cadastrada (com ou sem acentos).
export function withSimuladosLocais(lista = []) {
  const remotos = Array.isArray(lista) ? lista : [];

  const chave = (item) => `${normalizar(item.instituicao)}|${normalizar(item.disciplina)}`;
  const existentes = new Set(remotos.map(chave));
  const instituicoes = new Map(
    remotos
      .filter((item) => item.instituicao)
      .map((item) => [normalizar(item.instituicao), item.instituicao])
  );

  const locais = SIMULADOS_LOCAIS
    .filter((simulado) => !existentes.has(chave(simulado)))
    .map((simulado) => ({
      ...simulado,
      instituicao: instituicoes.get(normalizar(simulado.instituicao)) || simulado.instituicao
    }));

  return [...remotos, ...locais];
}
