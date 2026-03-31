import { useState } from 'react'
import './App.css'

function App() {
  const questions = [
    { id: 1, question: "Os valores do Scrum devem ser incorporados pelo Scrum Team e são essenciais para o sucesso dos projetos. Qual das opções apresenta os valores do Scrum?", options: ["Integridade, cuidado, confiabilidade, conformidade.", "Foco, adaptação, resiliência, pensamento sistêmico.", "Liderança, tailoring, partes interessadas.", "Compromisso, foco, abertura, respeito, coragem, planejamento, entrega e medição.", "Compromisso, foco, abertura, respeito e coragem."], answer: 4 },
    { id: 2, question: "Qual das alternativas a seguir é um dos princípios do Guia PMBOK 7?", options: ["Monitoramento", "Planejamento", "Execução", "Escopo", "Partes interessadas"], answer: 4 },
    { id: 3, question: "O que é uma abordagem de desenvolvimento segundo o Guia PMBOK?", options: ["Abordagem usada para desenvolver sistemas de informação.", "Abordagem usada para desenvolver projetos baseada nos métodos ágeis.", "Abordagem adotada para desenvolver entregas durante o ciclo de vida do projeto.", "Método usado para desenvolver projetos baseado no princípio de tailoring.", "Método usado e originado no manifesto ágil."], answer: 2 },
    { id: 4, question: "Qual dos artefatos a seguir poderia ser usado em uma abordagem de desenvolvimento preditiva para definir ou revisar o que será feito?", options: ["Por meio do product backlog.", "Por meio do sprint backlog.", "Por meio do escopo do projeto e da sua estrutura analítica.", "Por meio do orçamento.", "Por meio do registro das questões."], answer: 2 },
    { id: 5, question: "Os domínios de desempenho são uma das grandes novidades da sétima edição do Guia PMBOK. Qual das opções a seguir define melhor um domínio de desempenho?", options: ["Um domínio de desempenho do projeto é um grupo de atividades relacionadas que são críticas para a entrega eficaz dos resultados do projeto.", "Um domínio de desempenho do projeto é a combinação dos grupos de processos com as áreas de conhecimento do projeto.", "Um domínio de desempenho do projeto é uma área identificada de gerenciamento de projetos definida por seus requisitos de conhecimentos e descrita em termos dos processos que a compõem.", "Um domínio de desempenho do projeto é um agrupamento lógico de entradas, ferramentas, técnicas e saídas de gerenciamento de projetos.", "Um domínio de desempenho do projeto é uma série de atividades sistemáticas para criar uma ou mais saídas."], answer: 0 },
    { id: 6, question: "Qual das alternativas é um resultado esperado do domínio de desempenho de partes interessadas?", options: ["Propriedade compartilhada.", "Partes interessadas identificadas.", "Uma relação de trabalho produtiva com as partes interessadas ao longo do projeto.", "As partes interessadas que podem se opor ao projeto ou às suas entregas podem afetar negativamente os resultados do projeto.", "As partes interessadas têm conflitos em relação aos objetivos do projeto."], answer: 2 },
    { id: 7, question: "Qual das alternativas a seguir se refere a uma das mudanças trazidas pelo Guia PMBOK 7?", options: ["Reduziu os processos de 49 para 32.", "Foi de referência detalhada em processos para orientador com princípios.", "Trocou a abordagem de processos ITO para processos mais ágeis.", "Adotou os princípios do manifesto ágil.", "Adotou os valores do manifesto ágil."], answer: 1 },
    { id: 8, question: "Qual das situações abaixo é relacionada a um princípio do Guia PMBOK 7?", options: ["Reconheça, avalie e reaja às interações do sistema.", "Nossa maior prioridade é satisfazer o cliente mediante a entrega contínua e adiantada de software com valor agregado.", "Mudanças nos requisitos são bem-vindas, mesmo que tardiamente no desenvolvimento.", "Entregar frequentemente software funcionando, de poucas semanas a poucos meses.", "Pessoas de negócio e desenvolvedores devem trabalhar diariamente em conjunto por todo o projeto."], answer: 0 },
    { id: 9, question: "Qual o Timebox (tempo limite) da Daily Scrum para sincronização do time?", options: ["30 minutos", "1 hora", "15 minutos", "5 minutos", "Não há tempo limite"], answer: 2 },
    { id: 10, question: "No Kanban, qual a principal função de visualizar o fluxo no quadro?", options: ["Limitar o WIP (Work In Progress) e gerenciar o fluxo de valor.", "Substituir o planejamento da Sprint.", "Apenas para decoração da sala.", "Microgerenciar as tarefas dos desenvolvedores.", "Eliminar a necessidade de reuniões."], answer: 0 },
    { id: 11, question: "O Guia PMBOK 7ª edição introduziu uma mudança estrutural significativa. Quantos são os princípios de entrega de projetos estabelecidos nesta edição?", options: ["São 10 princípios.", "São 5 princípios.", "São 12 princípios.", "São 8 princípios.", "São 49 princípios."], answer: 2 },
    { id: 12, question: "No método Kanban, qual é a estrutura básica de estágios (camadas de fluxo) necessária para a visualização inicial do trabalho em um quadro?", options: ["Apenas uma camada de Execução.", "Duas camadas: Início e Fim.", "Três camadas: A fazer (To Do), Fazendo (Doing) e Feito (Done).", "Cinco camadas baseadas nos grupos de processos.", "Não existem camadas no método Kanban."], answer: 2 }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userHistory, setUserHistory] = useState([]); // Histórico para análise

  const handleSelect = (index) => {
    if (!isConfirmed) setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;

    if (!isConfirmed) {
      setIsConfirmed(true);
      const correct = questions[currentQuestion].answer;
      const isRight = selectedOption === correct;
      
      // Salva no histórico
      setUserHistory([...userHistory, {
        question: questions[currentQuestion].question,
        isCorrect: isRight,
        correctText: questions[currentQuestion].options[correct]
      }]);

      if (isRight) setScore(score + 1);
    } else {
      const nextQuestion = currentQuestion + 1;
      setIsConfirmed(false);
      setSelectedOption(null);
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }
  };

  // Função para gerar dica de melhoria
  const getImprovementTip = (qText) => {
    if (qText.includes("Scrum")) return "Revise os 5 Valores e o Timebox (15min) no Guia Scrum.";
    if (qText.includes("PMBOK 7")) return "Estude os 12 Princípios e os 8 Domínios de Desempenho.";
    if (qText.includes("Kanban")) return "Foque em Limitação de WIP e visualização do Fluxo de Valor.";
    if (qText.includes("preditiva")) return "Revise EAP e Escopo em projetos Waterfall.";
    return "Revise os fundamentos de abordagens ágeis vs preditivas.";
  }

  return (
    <section id="quiz-container">
      <h1 className="title">BitSoul Academy 🎓</h1>
      <div className="card">
        {showScore ? (
          <div className="score-section">
            <h2>Resultado: {score}/{questions.length}</h2>
            <div className="analysis-box">
              {userHistory.map((item, index) => (
                <div key={index} className={`analysis-item ${item.isCorrect ? 'item-correct' : 'item-wrong'}`}>
                  <p><strong>Q{index + 1}:</strong> {item.isCorrect ? "✅ " : "❌ "}{item.question}</p>
                  {!item.isCorrect && <p className="tip">💡 <strong>Melhorar:</strong> {getImprovementTip(item.question)}</p>}
                </div>
              ))}
            </div>
            <button className="confirm-button restart-btn" onClick={() => window.location.reload()}>Refazer Sprint</button>
          </div>
        ) : (
          <div className="quiz-section">
            <p>Questão {currentQuestion + 1} de {questions.length}</p>
            <p className="question-text">{questions[currentQuestion].question}</p>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === questions[currentQuestion].answer;
                const isSelected = index === selectedOption;
                let btnClass = "option-button";
                if (isSelected) btnClass += " active";
                if (isConfirmed) {
                  if (isCorrect) btnClass += " correct";
                  if (isSelected && !isCorrect) btnClass += " wrong";
                }
                return (
                  <button key={index} onClick={() => handleSelect(index)} className={btnClass} disabled={isConfirmed}>
                    <span className="option-letter">{String.fromCharCode(65 + index)})</span>
                    <span className="option-text">{option}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={handleConfirm} className="confirm-button" disabled={selectedOption === null}>
              {isConfirmed ? "Próxima Questão ➡️" : "Confirmar Resposta ✅"}
            </button>
          </div>
        )}
      </div>
      <p className="footer">Desenvolvido por Erik Martins 🚀</p>
    </section>
  )
}

export default App