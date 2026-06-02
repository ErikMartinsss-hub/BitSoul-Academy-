import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { parseQuestionsFromPDF } from './utils/pdfParser';
import './App.css';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAF4qRhibrwKQECeQgAidVfVEVuW9u1LnA",
  authDomain: "quiz-7668d.firebaseapp.com",
  projectId: "quiz-7668d",
  storageBucket: "quiz-7668d.firebasestorage.app",
  messagingSenderId: "278308983499",
  appId: "1:278308983499:web:233fbb2ac0a26b0511c14e",
  measurementId: "G-HSB5R955LB"
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
let analytics;
try { analytics = getAnalytics(app); } catch (e) { console.warn("Analytics not available:", e); }
const db = getFirestore(app);

function App() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userHistory, setUserHistory] = useState([]);

  const [showUpload, setShowUpload] = useState(false);
  const [pdfParsing, setPdfParsing] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [isPdfQuiz, setIsPdfQuiz] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const topicMap = {
    "Desenvolvimento Front End": [
      { min: 0, max: 0, topic: "Angular" },
      { min: 1, max: 1, topic: "Angular" },
      { min: 2, max: 2, topic: "RxJS" },
      { min: 3, max: 3, topic: "RxJS" },
      { min: 4, max: 4, topic: "Banco de Dados" },
      { min: 5, max: 5, topic: "Angular Material" },
      { min: 6, max: 6, topic: "TypeScript" },
      { min: 7, max: 7, topic: "TypeScript" },
      { min: 8, max: 8, topic: "TypeScript" },
      { min: 9, max: 9, topic: "TypeScript" },
      { min: 10, max: 10, topic: "TypeScript" },
      { min: 11, max: 11, topic: "TypeScript" },
      { min: 12, max: 12, topic: "TypeScript" }
    ],
    "Angular": [
      { min: 0, max: 0, topic: "NgModule" },
      { min: 1, max: 1, topic: "Express" },
      { min: 2, max: 2, topic: "Polyfills" },
      { min: 3, max: 3, topic: "Formularios" },
      { min: 4, max: 4, topic: "RxJS" },
      { min: 5, max: 5, topic: "MongoDB" },
      { min: 6, max: 6, topic: "CSS" },
      { min: 7, max: 7, topic: "Rotas" },
      { min: 8, max: 8, topic: "RouterModule" },
      { min: 9, max: 9, topic: "DAO" }
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem("attempts");
    if (saved) {
      try { setAttempts(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AVALIACOES"));
        const listaAvaliacoes = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }));
        
        setDados(listaAvaliacoes);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar questões do Firestore:", error);
        // Fallback para não quebrar a aplicação caso a coleção esteja vazia ou em branco
        setDados([
          {
            _id: "fallback-id",
            disciplina: "NoSQL",
            instituicao: "Análise e Desenvolvimento de Sistemas (Estácio)",
            questoes: [
              {
                id: 1,
                enunciado: "Sobre o código apresentado a seguir, podemos afirmar, exceto...",
                alternativas: [
                  "A) Existe uma chave primária tripla.",
                  "B) A função toTimestamp permite obter o valor timestamp.",
                  "C) A função now permite o preenchimento do atributo timeuuid.",
                  "D) A tabela tem dois atributos no campo chave de partição.",
                  "E) A tabela tem o campo datahora como chave de armazenamento em clusters."
                ],
                resposta_correta: 0
              }
            ],
            data_criacao: "2026-05-04T22:35:00.000Z"
          }
        ]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInstitutions = () => {
    const instList = {};
    if (!Array.isArray(dados)) return {};

    dados.forEach((item) => {
      const instituicaoNome = item.instituicao || "Análise e Desenvolvimento de Sistemas (Estácio)";
      const disciplinaNome = item.disciplina || "NoSQL";

      if (!instList[instituicaoNome]) {
        instList[instituicaoNome] = {};
      }
      if (!instList[instituicaoNome][disciplinaNome]) {
        instList[instituicaoNome][disciplinaNome] = [];
      }
      
      if (item.questoes) {
        item.questoes.forEach((q) => {
          instList[instituicaoNome][disciplinaNome].push({
            id: q.id,
            question: q.enunciado || q.question,
            options: q.alternativas || q.options,
            answer: q.resposta_correta !== undefined ? q.resposta_correta : q.answer
          });
        });
      }
    });
    return instList;
  };

  const data = getInstitutions();

  const handleSelectCollege = (college) => {
    setSelectedCollege(college);
    setSelectedSubject(null);
    setShowUpload(false);
  };

  const handleUploadClick = () => {
    setShowUpload(true);
    setSelectedCollege(null);
    setSelectedSubject(null);
    setPdfError('');
    setPdfFileName('');
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    if (selectedCollege && data[selectedCollege]) {
      setQuestions(data[selectedCollege][subject] || []);
    }
  };

  const handleSelect = (index) => {
    if (!isConfirmed) setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;

    if (!isConfirmed) {
      setIsConfirmed(true);
      const correctIndex = questions[currentQuestion]?.answer;
      const hasAnswer = correctIndex !== undefined && correctIndex >= 0;
      const isRight = hasAnswer ? selectedOption === correctIndex : false;

      setUserHistory([
        ...userHistory,
        {
          question: questions[currentQuestion]?.question,
          isCorrect: isRight,
          correctText: hasAnswer ? questions[currentQuestion]?.options[correctIndex] : null,
          hasAnswer,
          selectedText: questions[currentQuestion]?.options[selectedOption]
        }
      ]);

      if (isRight) setScore(score + 1);
    } else {
      const nextQuestion = currentQuestion + 1;
      setIsConfirmed(false);
      setSelectedOption(null);
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
        const attempt = {
          date: new Date().toLocaleString("pt-BR"),
          score: score,
          total: questions.length,
          subject: selectedSubject || "Simulado",
          history: userHistory
        };
        const updated = [attempt, ...attempts].slice(0, 20);
        setAttempts(updated);
        localStorage.setItem("attempts", JSON.stringify(updated));
      }
    }
  };

  const getImprovementTip = (qText) => {
    if (qText && (qText.includes("Cassandra") || qText.includes("CQL"))) {
      return "Foque em chaves de partição, chaves de agrupamento e limitações do CQL.";
    }
    return "Revise os conceitos e estruturas de banco de dados do material.";
  };

  const handleFileUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setPdfError('Por favor, selecione um arquivo PDF v\u00e1lido.');
      return;
    }

    setPdfFileName(file.name);
    setPdfParsing(true);
    setPdfError('');

    try {
      const result = await parseQuestionsFromPDF(file);

      if (result.empty || result.questions.length === 0) {
        const preview = result.rawText
          ? result.rawText.substring(0, 400).replace(/[^\x20-\x7E\xA0-\xFF\n\r]/g, '')
          : '(texto vazio)';
        setPdfError(
          'N\u00e3o foi poss\u00edvel extrair quest\u00f5es deste PDF. ' +
          'Verifique se o PDF cont\u00e9m texto selecion\u00e1vel (n\u00e3o \u00e9 um documento escaneado) ' +
          'e se as quest\u00f5es seguem um formato num\u00e9rico (01., 02., etc.) com alternativas ((A), (B), etc.).\n\n' +
          'Texto extra\u00eddo (in\u00edcio):\n' + preview
        );
        setPdfParsing(false);
        return;
      }

      setIsPdfQuiz(!result.hasAnswers);
      setQuestions(result.questions);
      setSelectedCollege(`PDF: ${file.name}`);
      setSelectedSubject('Simulado');
      setShowUpload(false);
      setPdfParsing(false);
    } catch (err) {
      console.error('Erro ao processar PDF:', err);
      setPdfError(`Erro ao processar o PDF: ${err.message}`);
      setPdfParsing(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsConfirmed(false);
    setScore(0);
    setShowScore(false);
    setUserHistory([]);
    setShowHistory(false);
  };

  const handleRestart = () => {
    handleRetry();
    setSelectedCollege(null);
    setSelectedSubject(null);
    setQuestions([]);
    setShowUpload(false);
    setPdfParsing(false);
    setPdfError('');
    setPdfFileName('');
    setIsPdfQuiz(false);
  };

  const getQuestionTopic = (qIndex) => {
    if (!selectedSubject) return "";
    const mapping = topicMap[selectedSubject];
    if (!mapping) return "";
    const entry = mapping.find(m => qIndex >= m.min && qIndex <= m.max);
    return entry ? entry.topic : "";
  };

  const getTopicPerformance = () => {
    const topics = {};
    userHistory.forEach((item, idx) => {
      const topic = getQuestionTopic(idx);
      if (!topic) return;
      if (!topics[topic]) topics[topic] = { correct: 0, total: 0 };
      topics[topic].total++;
      if (item.isCorrect) topics[topic].correct++;
    });
    return topics;
  };

  return (
    <section id="quiz-container">
      <h1 className="title">BitSoul Academy 🎓</h1>

      {loading ? (
        <div className="card">
          <h2>Carregando questões do Firestore...</h2>
        </div>
      ) : showUpload ? (
        <div className="card">
          <h2>Enviar PDF para Simulado</h2>
          <p className="upload-hint">
            Envie um PDF com perguntas de multipla escolha. O sistema extraira as perguntas
            e alternativas automaticamente.
          </p>
          <div
            className="upload-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleFileUpload(file);
            }}
          >
            <input
              type="file"
              accept=".pdf"
              id="pdf-input"
              className="file-input"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleFileUpload(file);
              }}
            />
            <label htmlFor="pdf-input" className="file-label">
              {pdfFileName ? `📄 ${pdfFileName}` : 'Clique ou arraste um PDF aqui'}
            </label>
          </div>
          {pdfParsing && (
            <div className="parsing-status">
              <p>Processando PDF... Isso pode levar alguns segundos.</p>
            </div>
          )}
          {pdfError && (
            <div className="error-box">
              <p>{pdfError}</p>
            </div>
          )}
          <button
            className="confirm-button restart-btn"
            onClick={() => setShowUpload(false)}
            disabled={pdfParsing}
          >
            Voltar
          </button>
        </div>
      ) : !selectedCollege ? (
        <div className="card">
          <h2>Selecione a sua instituição de ensino:</h2>
          <div className="subject-selection">
            {Object.keys(data).length === 0 ? (
              <p>Nenhuma instituição carregada do banco de dados.</p>
            ) : (
              Object.keys(data).map((college, index) => (
                <button
                  key={index}
                  className="confirm-button subject-btn"
                  onClick={() => handleSelectCollege(college)}
                >
                  {college} 🏛️
                </button>
              ))
            )}
          </div>
          <div className="upload-divider">
            <span>ou</span>
          </div>
          <button
            className="confirm-button upload-pdf-btn"
            onClick={handleUploadClick}
          >
            📄 Enviar PDF para Simulado
          </button>
        </div>
      ) : !selectedSubject ? (
        <div className="card">
          <h2>Matérias em {selectedCollege}:</h2>
          {Object.keys(data[selectedCollege]).length === 0 ? (
            <p style={{ margin: "20px 0", color: "#666" }}>Nenhuma matéria cadastrada no momento.</p>
          ) : (
            <div className="subject-selection">
              {Object.keys(data[selectedCollege]).map((subject, index) => (
                <button
                  key={index}
                  className="confirm-button subject-btn"
                  onClick={() => handleSelectSubject(subject)}
                >
                  {subject} 📚
                </button>
              ))}
            </div>
          )}
          <button
            className="confirm-button restart-btn"
            onClick={() => handleSelectCollege(null)}
          >
            Voltar para Faculdades
          </button>
        </div>
      ) : (
        <div className="card">
          <h2>
            {selectedCollege} - {selectedSubject}
          </h2>
          {showScore ? (
            <div className="score-section">
              <h2>
                Resultado: {score}/{questions.length}
              </h2>
              <div className="score-percentage">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="chart-bar">
                <div
                  className="chart-bar-correct"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
                <div
                  className="chart-bar-wrong"
                  style={{ width: `${((questions.length - score) / questions.length) * 100}%` }}
                />
              </div>
              <div className="chart-labels">
                <span className="chart-label-correct">{score} corretas</span>
                <span className="chart-label-wrong">{questions.length - score} erradas</span>
              </div>

              {isPdfQuiz && (
                <p className="no-answer-note">
                  Este simulado foi gerado a partir de um PDF sem gabarito.
                  As respostas nao foram corrigidas automaticamente.
                </p>
              )}

              {!isPdfQuiz && (
                <div className="topic-section">
                  <h3>Desempenho por topico</h3>
                  <div className="topic-grid">
                    {Object.entries(getTopicPerformance()).map(([topic, data]) => (
                      <div key={topic} className="topic-item">
                        <div className="topic-name">{topic}</div>
                        <div className="topic-bar">
                          <div
                            className="topic-bar-fill"
                            style={{
                              width: `${(data.correct / data.total) * 100}%`,
                              background: data.correct === data.total
                                ? "#4caf50"
                                : data.correct >= data.total / 2
                                  ? "#ff9800"
                                  : "#f44336"
                            }}
                          />
                        </div>
                        <div className="topic-stats">
                          {data.correct}/{data.total}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="attempts-section">
                <h3>Tentativas anteriores</h3>
                {attempts.filter(a => a.subject === (selectedSubject || "Simulado")).map((att, i) => (
                  <div key={i} className="attempt-item">
                    <span className="attempt-date">{att.date}</span>
                    <span className={`attempt-score ${att.score >= att.total / 2 ? "attempt-good" : "attempt-bad"}`}>
                      {att.score}/{att.total}
                    </span>
                    <div className="attempt-bar-wrapper">
                      <div
                        className="attempt-bar-fill"
                        style={{ width: `${(att.score / att.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                {attempts.filter(a => a.subject === (selectedSubject || "Simulado")).length === 0 && (
                  <p className="no-attempts">Nenhuma tentativa anterior.</p>
                )}
              </div>

              <div className="analysis-box">
                {userHistory.map((item, index) => {
                  const isCorrect = item.hasAnswer ? item.isCorrect : null;
                  const topic = getQuestionTopic(index);
                  let itemClass = "analysis-item";
                  if (isCorrect === true) itemClass += " item-correct";
                  else if (isCorrect === false) itemClass += " item-wrong";
                  else itemClass += " item-unknown";
                  return (
                    <div key={index} className={itemClass}>
                      <p>
                        <strong>Q{index + 1}:</strong>{" "}
                        {isCorrect === true ? "Correto" : isCorrect === false ? "Errado" : "?"}{" "}
                        {item.question}
                      </p>
                      {topic && <p className="tip">Topico: {topic}</p>}
                      {item.hasAnswer === false && item.selectedText && (
                        <p className="tip">
                          Sua resposta: {item.selectedText}
                        </p>
                      )}
                      {isCorrect === false && (
                        <p className="tip">
                          Correta: {item.correctText}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="result-buttons">
                <button className="confirm-button" onClick={handleRetry}>
                  Fazer Novamente
                </button>
                <button className="confirm-button restart-btn" onClick={handleRestart}>
                  Escolher Outra Materia
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-section">
              <p>
                Questão {currentQuestion + 1} de {questions.length}
              </p>
              <p className="question-text">{questions[currentQuestion]?.question}</p>
              <div className="options-container">
                {questions[currentQuestion]?.options.map((option, index) => {
                  const hasAnswer = questions[currentQuestion]?.answer >= 0;
                  const isCorrect = hasAnswer && index === questions[currentQuestion]?.answer;
                  const isSelected = index === selectedOption;
                  let btnClass = "option-button";
                  if (isSelected) btnClass += " active";
                  if (isConfirmed && hasAnswer) {
                    if (isCorrect) btnClass += " correct";
                    if (isSelected && !isCorrect) btnClass += " wrong";
                  }
                  if (isConfirmed && !hasAnswer && isSelected) {
                    btnClass += " confirmed-no-answer";
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      className={btnClass}
                      disabled={isConfirmed}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)})</span>
                      <span className="option-text">{option}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleConfirm}
                className="confirm-button"
                disabled={selectedOption === null}
              >
                {isConfirmed ? "Próxima Questão ➡️" : "Confirmar Resposta ✅"}
              </button>
            </div>
          )}
        </div>
      )}
      <p className="footer">Desenvolvido por Erik Martins 🚀</p>
    </section>
  );
}

export default App;