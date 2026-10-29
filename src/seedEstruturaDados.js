// Publica os simulados locais (src/data/simulados.js) na colecao "AVALIACOES" do Firestore.
// Uso:  node src/seedEstruturaDados.js
// O app funciona sem rodar este script: os simulados locais aparecem mesmo offline.
// Rodando o script, o simulado passa a ficar salvo no banco (e nao duplica na tela).

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { SIMULADOS_LOCAIS } from './data/simulados.js';

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

const normalizar = (texto = "") =>
  String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

async function publicar() {
  const snapshot = await getDocs(collection(db, 'AVALIACOES'));
  const documentos = snapshot.docs.map((d) => ({ ref: d.ref, ...d.data() }));

  for (const simulado of SIMULADOS_LOCAIS) {
    const mesmaDisciplina = documentos.filter(
      (doc) =>
        normalizar(doc.instituicao) === normalizar(simulado.instituicao) &&
        normalizar(doc.disciplina) === normalizar(simulado.disciplina)
    );

    for (const duplicado of mesmaDisciplina) {
      await deleteDoc(duplicado.ref);
      console.log(`Removido documento antigo: ${duplicado.ref.path}`);
    }

    const dados = { ...simulado };
    delete dados._id;
    delete dados.local;
    const novo = await addDoc(collection(db, 'AVALIACOES'), dados);
    console.log(
      `Publicado: ${dados.instituicao} - ${dados.disciplina} ` +
        `(${dados.questoes.length} questoes) -> ${novo.path}`
    );
  }
}

publicar()
  .then(() => {
    console.log('Concluido.');
    process.exit(0);
  })
  .catch((erro) => {
    console.error('Erro ao publicar simulados:', erro);
    process.exit(1);
  });
