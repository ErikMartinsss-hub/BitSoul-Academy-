import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

async function popularBanco() {
  const dados = {
    instituicao: "Analise e Desenvolvimento de Sistemas (Estacio)",
    disciplina: "Desenvolvimento Front End",
    data_criacao: new Date().toISOString(),
    questoes: questoesFrontEnd
  };

  console.log("Inserindo questoes de Desenvolvimento Front End...");
  try {
    const docRef = await addDoc(collection(db, "AVALIACOES"), dados);
    console.log("Sucesso! Documento criado com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao inserir documento:", error);
  }
}

popularBanco();
