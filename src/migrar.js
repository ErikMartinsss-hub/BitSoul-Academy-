import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAF4qRhibrwKQECeQgAidVfVEVuW9u1LnA",
  authDomain: "quiz-7668d.firebaseapp.com",
  projectId: "quiz-7668d",
  storageBucket: "quiz-7668d.firebasestorage.app",
  messagingSenderId: "278308983499",
  appId: "1:278308983499:web:233fbb2ac0a26b0511c14e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const questoesFrontEnd = [
  {
    id: 1,
    enunciado: "Na estrutura do Angular, qual elemento e responsavel pela exibicao do conteudo roteado?",
    alternativas: [
      "routerLink",
      "Routes",
      "ActivatedRoute",
      "Router",
      "router-outlet"
    ],
    resposta_correta: 4
  },
  {
    id: 2,
    enunciado: "Qual anotacao deve ser utilizada em campo da classe TypeScript para que seja alimentado por um atributo do seletor?",
    alternativas: [
      "Input",
      "Component",
      "Output",
      "Injectable",
      "NgModule"
    ],
    resposta_correta: 0
  },
  {
    id: 3,
    enunciado: "Qual padrao de projeto comportamental permite que um objeto notifique outros objetos sobre alteracoes em seu estado?",
    alternativas: [
      "Observer",
      "Strategy",
      "Iterator",
      "Interpreter",
      "Facade"
    ],
    resposta_correta: 0
  },
  {
    id: 4,
    enunciado: "No RxJS, qual componente representa a fonte de informacoes para o processamento assincrono, sem possibilidade de assinantes multiplos?",
    alternativas: [
      "Observer",
      "Subject",
      "Subscription",
      "Observable",
      "Operator"
    ],
    resposta_correta: 3
  },
  {
    id: 5,
    enunciado: "O MongoDB e classificado como uma base do tipo:",
    alternativas: [
      "chave-valor.",
      "colunar.",
      "documental.",
      "baseada em grafos.",
      "relacional."
    ],
    resposta_correta: 2
  },
  {
    id: 6,
    enunciado: "No Angular Material, um botao configurado para exibicao elevada, representando a opcao negativa para uma pergunta, utiliza a configuracao:",
    alternativas: [
      'mat-raised-button color="warn"',
      'mat-fab color="accent"',
      'mat-button color="warn"',
      'mat-raised-button color="primary"',
      'mat-button color="accent"'
    ],
    resposta_correta: 0
  },
  {
    id: 7,
    enunciado: "Qual a vantagem de utilizar tipos nos parametros das funcoes no TypeScript?",
    alternativas: [
      "O uso de funcoes elimina a possibilidade de erros em tempo de execucao.",
      "Ao utilizar tipos nos parametros, o TypeScript acelera o desempenho de execucao.",
      "A principal vantagem e a reutilizacao de codigo.",
      "Com tipos nos parametros, o TypeScript possibilita trabalhar com vetores.",
      "Usar tipos nos parametros auxilia a aplicacao correta das operacoes que podem ser feitas com eles."
    ],
    resposta_correta: 4
  },
  {
    id: 8,
    enunciado: "Assinale a alternativa correta a respeito dos aspectos basicos de uma funcao recursiva:",
    alternativas: [
      "Toda funcao recursiva deve ter um caso base em que ela termina, alem da chamada a si mesma dentro da propria funcao.",
      "O programador e obrigado a declarar os tipos de todas as variaveis que ele for usar na funcao recursiva.",
      "O uso de funcoes recursivas deve ser evitado no TS, pois afeta drasticamente o desempenho do sistema.",
      "E essencial que o desenvolvedor documente a funcao recursiva no TS, caso contrario o sistema nao vai permitir que ela funcione.",
      "O programador nao pode esquecer de estabelecer uma quantidade maxima de chamadas para a funcao recursiva."
    ],
    resposta_correta: 0
  },
  {
    id: 9,
    enunciado: 'Dada a arrow function: let r = (x: number):number => x==1? 1:x+r(x-1); console.log(r(8)); Qual codigo possui logica equivalente?',
    alternativas: [
      "function r2(n: number): number { return 36; }",
      "function r1(n: number): number { return (1+n)*n/2; }",
      "let r3 = (x: number):number => 36;",
      "function r4(n: number): number { if(n%2==0){ return 36; } return 0; }",
      "let r5 = (x: number):number => x%2==1? 0:36;"
    ],
    resposta_correta: 1
  },
  {
    id: 10,
    enunciado: "Assinale a alternativa correta a respeito das vantagens de utilizar funcoes RegEx e arrow functions no TypeScript:",
    alternativas: [
      "Ambas as funcoes sao modernas e, por isso, devem ser usadas com frequencia.",
      "Possuem mecanismos de seguranca que eliminam riscos com falta de seguranca.",
      "O TS obriga que os desenvolvedores utilizem estas funcoes.",
      "A biblioteca RegEx possui funcoes muito lentas que sao otimizadas com o uso das arrow functions.",
      "Elas sao otimizadas para gerenciar os dados com mais eficiencia, alem de oferecerem flexibilidade."
    ],
    resposta_correta: 4
  },
  {
    id: 11,
    enunciado: 'Qual expressao RegEx capaz de identificar o padrao: codigo do estado entre parenteses comecando com zero, seguido por nove digitos separados 5-4 com hifen. Exemplo: (095)11111-1111',
    alternativas: [
      "(0\\d\\d)\\d{5}-\\d{4}",
      "\\(0\\d\\d\\)\\d\\d {5}-\\d{4}",
      "\\(0\\d\\d\\)\\d{4}-\\d{5}",
      "\\(0\\d\\d\\)\\d{5}-\\d{4}",
      "(0dd)d{5}-d{4}"
    ],
    resposta_correta: 3
  },
  {
    id: 12,
    enunciado: "Qual a vantagem de utilizar narrowing no TypeScript?",
    alternativas: [
      "Eliminar erros de tipos de dados.",
      "Acelerar o desempenho da execucao das funcoes.",
      "Implementar funcoes compativeis com o JavaScript.",
      "Garantir a flexibilidade e reutilizacao de codigo.",
      "Trabalhar com vetores heterogeneos."
    ],
    resposta_correta: 0
  },
  {
    id: 13,
    enunciado: "Qual forma eficiente de fazer a verificacao de uma variavel que usa narrowing no TypeScript?",
    alternativas: [
      "Utilizar a variavel no codigo e deixar que o TS faca o gerenciamento dos tipos.",
      "Usar a palavra-chave default, pois o TS tentara usar a variavel da forma padrao.",
      "Usar a palavra-chave typeof para estabelecer como a variavel deve se comportar.",
      "Por meio da combinacao dos comandos switch-case.",
      "Usar o simbolo $ antes da variavel para indicar que ela pode assumir tipos distintos."
    ],
    resposta_correta: 2
  }
];

const questoesAngular = [
  {
    id: 1,
    enunciado: "Qual dos atributos de NgModule define o componente principal de um modulo do Angular?",
    alternativas: [
      "imports",
      "providers",
      "exports",
      "bootstrap",
      "declarations"
    ],
    resposta_correta: 3
  },
  {
    id: 2,
    enunciado: "Considerando um servico no estilo REST com NodeJS e Express, qual a assinatura do metodo para responder a chamada http://localhost:3000/alunos/29891, retornando os dados do aluno no formato JSON?",
    alternativas: [
      "router.get('/alunos', async (req, res) => { });",
      "router.put('/alunos/:id', async (req, res) => { });",
      "router.get('/alunos/:id', async (req, res) => { });",
      "router.delete('\\/alunos/:id', async (req, res) => { });",
      "router.post('/alunos', async (req, res) => { });"
    ],
    resposta_correta: 2
  },
  {
    id: 3,
    enunciado: "No Angular, o arquivo polyfills.ts tem como objetivo:",
    alternativas: [
      "Definir o conteudo da pagina inicial do aplicativo.",
      "Estabelecer as formatacoes globais atraves de configuracoes CSS.",
      "Configurar a inicializacao do aplicativo.",
      "Inicializar o ambiente de testes para o aplicativo.",
      "Incluir elementos para compatibilidade em diferentes plataformas e navegadores."
    ],
    resposta_correta: 4
  },
  {
    id: 4,
    enunciado: "No Angular com formularios reativos, para um campo do tipo checkbox que o usuario deve marcar para aceitar as regras do site, qual validador e o correto?",
    alternativas: [
      "Validators.required",
      "Validators.pattern",
      "Validators.max",
      "Validators.minLength",
      "Validators.requiredTrue"
    ],
    resposta_correta: 4
  },
  {
    id: 5,
    enunciado: 'No RxJS, considere: const observable = interval(1000).pipe(map((x:number)=>x*x)).pipe(observeOn(asyncScheduler)); Para que serve o metodo pipe?',
    alternativas: [
      "Gerar numeros sequencialmente.",
      "Elevar cada numero gerado ao quadrado.",
      "Fornecer o resultado de forma assincrona para o assinante da fonte de dados.",
      "Gerar o conjunto de numeros inteiros entre 1 e 1000.",
      "Direcionar o fluxo de dados para o processamento seguinte, antes de enviar o resultado."
    ],
    resposta_correta: 4
  },
  {
    id: 6,
    enunciado: "No MongoDB com NodeJS, qual metodo permite a inclusao de um documento em uma colecao?",
    alternativas: [
      "insertOne",
      "persist",
      "findOne",
      "create",
      "find"
    ],
    resposta_correta: 0
  },
  {
    id: 7,
    enunciado: 'Observe o CSS: .container{ display: flex; flex-direction: row; flex-wrap: wrap; width: 100%; overflow-y: scroll; height: 230px; } Qual informacao e verdadeira sobre essa formatacao?',
    alternativas: [
      "Exibe barra de rolagem horizontal quando o conteudo excede a largura.",
      "O elemento tera largura de 100 pixels.",
      "Define exibicao sequencial na vertical com quebra de linha para cada filho.",
      "Permite area de exibicao com posicionamento sequencial e quebra de linha quando nao ha espaco na horizontal.",
      "O elemento usara 100% do espaco vertical disponivel."
    ],
    resposta_correta: 3
  },
  {
    id: 8,
    enunciado: "No Angular, qual interface deve ser implementada por um servico para controlar acesso a uma rota?",
    alternativas: [
      "SignIn",
      "CanActivate",
      "Authenticate",
      "SignOut",
      "VerifyUser"
    ],
    resposta_correta: 1
  },
  {
    id: 9,
    enunciado: "No Angular, qual modulo gerencia a troca de conteudo com base em rotas dentro de uma SPA?",
    alternativas: [
      "BrowserModule",
      "ReactiveFormsModule",
      "RouterModule",
      "FormsModule",
      "HttpClientModule"
    ],
    resposta_correta: 2
  },
  {
    id: 10,
    enunciado: "Qual padrao de projeto deve ser usado para centralizar a persistencia e reduzir custos de manutencao com SQL espalhado pelo codigo?",
    alternativas: [
      "Observer",
      "Proxy",
      "Data Access Object",
      "Flyweight",
      "Service Locator"
    ],
    resposta_correta: 2
  }
];

const questoesTypeScript = [
  {
    id: 1,
    enunciado: "Qual o objetivo da funcao construtora de uma classe do TypeScript?",
    alternativas: [
      "Garantir que o programa seja orientado a objetos.",
      "Garantir que o programa esta sintaticamente correto.",
      "Identificar a oportunidade de reusabilidade do codigo.",
      "Estabelecer o comportamento inicial do objeto.",
      "Todo programa em TypeScript e orientado a objetos e deve ter o construtor explicitamente implementado."
    ],
    resposta_correta: 3
  },
  {
    id: 2,
    enunciado: 'Considere: function w(n: number): number { if(n==0){ return 0; } if(n==1){ return 1; } return n+w(n-1); } console.log(w(5)); Qual o resultado?',
    alternativas: ["0", "1", "10", "15", "120"],
    resposta_correta: 3
  },
  {
    id: 3,
    enunciado: 'Considere: class P { public exibir_informacao(a: number|string):void { console.log("resultado"); } } const obj1 = new P(); obj1.exibir_informacao(10); Qual o resultado?',
    alternativas: [
      'vai exibir a frase: "resultado"',
      "vai exibir o numero 10",
      'vai exibir "vazio"',
      "O codigo esta sintaticamente incorreto",
      'vai exibir a mensagem: "number|string"'
    ],
    resposta_correta: 0
  },
  {
    id: 4,
    enunciado: 'Considere: function t(a: number|string):number { let r:number= (typeof a === "number" ? 1 : 2); return r**(r+r); } console.log(t("Teste")); Qual o resultado?',
    alternativas: ["1", "2", "Teste", "8", "16"],
    resposta_correta: 4
  },
  {
    id: 5,
    enunciado: "Considere: let s = (x: number, y: number):number => x+y; console.log(s(s(1,2),s(3,4))); Qual o resultado?",
    alternativas: ["1", "2", "3", "7", "10"],
    resposta_correta: 4
  },
  {
    id: 6,
    enunciado: 'Considere: function exibir(a: number|string|undefined): string { return a; } exibir(); Selecione a opcao correta sobre o codigo:',
    alternativas: [
      "numero",
      "string",
      "nao e um tipo definido",
      'no tipo de retorno da funcao e necessario incluir "string"',
      'no tipo de retorno da funcao e necessario incluir "undefined"'
    ],
    resposta_correta: 4
  },
  {
    id: 7,
    enunciado: 'Considere: function f1(msg: string, num: number): number { return msg+num; } let tnum: number = 10; let tmsg: string = "10"; console.log(f1(tmsg, tnum)); Qual o resultado?',
    alternativas: ['"1010"', "10", "20", '"10"', '"20"'],
    resposta_correta: 0
  },
  {
    id: 8,
    enunciado: "Considere: function f2(x: number, y: number): number { return x+=y; } let x:number = f2(10, 20); console.log(x); Qual o resultado?",
    alternativas: ["0", "10", "20", "30", "erro de execucao"],
    resposta_correta: 3
  },
  {
    id: 9,
    enunciado: "Considere: let vetor:number[] = [1, 5, 9, 10, 15]; const e:number = vetor.indexOf(5); console.log(e); Qual o resultado?",
    alternativas: ["0", "1", "5", "15", "Erro de execucao"],
    resposta_correta: 1
  },
  {
    id: 10,
    enunciado: 'Considere: function y(a: number|string):string { return (typeof a === "number" ? "numero" : "string"); } console.log(y("Teste")); Qual o resultado?',
    alternativas: ["number", "numero", "string", "Teste", "a"],
    resposta_correta: 2
  },
  {
    id: 11,
    enunciado: "Considere: let valor: number = (22%10)+1; console.log(valor); Qual o resultado?",
    alternativas: ["0", "1", "3", "33", "221"],
    resposta_correta: 2
  },
  {
    id: 12,
    enunciado: "Considere o trecho de codigo com funcao que recebe number|string|undefined e retorna string. Selecione a opcao correta sobre o codigo:",
    alternativas: [
      "numero",
      "string",
      "nao e um tipo definido",
      'no tipo de retorno da funcao e necessario incluir "string"',
      'no tipo de retorno da funcao e necessario incluir "undefined"'
    ],
    resposta_correta: 4
  },
  {
    id: 13,
    enunciado: "Considere: class Teste extends R { public imprimir = () => { console.log('imprimir teste'); } } Selecione a opcao correta:",
    alternativas: [
      "R e a superclasse de Teste",
      "R herda as caracteristicas da classe Teste",
      "Nao e possivel fazer nenhuma afirmacao sobre o codigo",
      "A classe R possui um metodo chamado imprimir",
      "A classe Teste e privada"
    ],
    resposta_correta: 0
  },
  {
    id: 14,
    enunciado: "Considere o trecho de codigo que calcula o resultado entre dois numeros. Qual o resultado da execucao?",
    alternativas: ["8", "10", "20", "30", "50"],
    resposta_correta: 3
  }
];

async function popularBanco() {
  const docsToDelete = ["mDqK4dWWZfFCOz4gHbiT", "qoMazjwQ667vOfUHYSRB", "SUbXIpjjjxGbbaI4zzt1"];

  for (const id of docsToDelete) {
    try {
      await deleteDoc(doc(db, "AVALIACOES", id));
      console.log("Removido documento:", id);
    } catch (error) {
      console.log("Aviso: nao foi possivel remover", id, error.message);
    }
  }

  // 1) Desenvolvimento Front End (13 questoes)
  const dadosFE = {
    instituicao: "Analise e Desenvolvimento de Sistemas (Estacio)",
    disciplina: "Desenvolvimento Front End",
    data_criacao: new Date().toISOString(),
    questoes: questoesFrontEnd
  };

  console.log("Inserindo " + questoesFrontEnd.length + " questoes em Desenvolvimento Front End...");
  try {
    const docRef = await addDoc(collection(db, "AVALIACOES"), dadosFE);
    console.log("FE inserido. ID:", docRef.id);
  } catch (error) {
    console.error("Erro FE:", error);
  }

  // 2) Angular (10 questoes)
  const dadosAngular = {
    instituicao: "Analise e Desenvolvimento de Sistemas (Estacio)",
    disciplina: "Angular",
    data_criacao: new Date().toISOString(),
    questoes: questoesAngular
  };

  console.log("Inserindo " + questoesAngular.length + " questoes em Angular...");
  try {
    const docRef = await addDoc(collection(db, "AVALIACOES"), dadosAngular);
    console.log("Angular inserido. ID:", docRef.id);
  } catch (error) {
    console.error("Erro Angular:", error);
  }

  // 3) TypeScript (10 questoes)
  const dadosTS = {
    instituicao: "Analise e Desenvolvimento de Sistemas (Estacio)",
    disciplina: "TypeScript",
    data_criacao: new Date().toISOString(),
    questoes: questoesTypeScript
  };

  console.log("Inserindo " + questoesTypeScript.length + " questoes em TypeScript...");
  try {
    const docRef = await addDoc(collection(db, "AVALIACOES"), dadosTS);
    console.log("TS inserido. ID:", docRef.id);
  } catch (error) {
    console.error("Erro TS:", error);
  }
}

popularBanco();
