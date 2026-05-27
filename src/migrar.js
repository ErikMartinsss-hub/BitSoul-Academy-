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

const dadosParaInserir = {
  instituicao: "Análise e Desenvolvimento de Sistemas (Estácio)",
  disciplina: "NoSQL",
  data_criacao: new Date().toISOString(),
  questoes: [
    {
      id: 1,
      enunciado: "Sobre o código apresentado a seguir, podemos afirmar, exceto:\n\nCREATE TABLE log_usuario (\nlogin varchar ,\ndata timestamp ,\ndatahora timeuuid ,\nPRIMARY KEY ( ( login , data ), datahora ) ) ;\n\nINSERT INTO log_usuario ( login, data, datahora ) VALUES ( 'aluno_1', toTimestamp(toDate(now())), now() ) ;\n\nINSERT INTO log_usuario ( login, data, datahora ) VALUES ( 'aluno_2', toTimestamp(toDate(now())), now() ) ;\n\nINSERT INTO log_usuario ( login, data, datahora ) VALUES ( 'aluno_3', toTimestamp(toDate(now())), now() ) ;",
      alternativas: [
        "Existe uma chave primária tripla.",
        "A função toTimestamp(toDate(now())) permite obter o valor timestamp.",
        "A função now() permite o preenchimento do atributo timeuuid.",
        "A tabela tem dois atributos no campo chave de partição.",
        "A tabela tem o campo datahora como chave de armazenamento em clusters."
      ],
      resposta_correta: 0
    }
  ]
};

async function popularBanco() {
  console.log("Conectando ao Firestore e inserindo os dados...");
  try {
    const docRef = await addDoc(collection(db, "AVALIACOES"), dadosParaInserir);
    console.log("Sucesso! Documento criado com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao inserir documento:", error);
  }
}

popularBanco();