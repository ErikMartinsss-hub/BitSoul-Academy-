# BitSoul Academy

Plataforma de simulados inteligente para estudantes. Escolha sua instituicao, selecione a materia e resolva questoes de multipla escolha com correcao automatica e analise de desempenho.

## Funcionalidades

- **Simulados por Instituicao** — Questoes organizadas por faculdade e disciplina, carregadas do Firebase Firestore.
- **Upload de PDF** — Envie um PDF com questoes de multipla escolha e o sistema extrai automaticamente as perguntas, alternativas e gabarito para criar um simulado personalizado.
- **Correcao Automatica** — Resposta certa fica verde, errada fica vermelha, com destaque da alternativa correta.
- **Analise de Desempenho** — Ao final, confira seus acertos e erros, com dicas de melhoria para cada questao.
- **Responsivo** — Funciona perfeitamente no celular e no desktop.

## Como usar

### Rodar localmente

```bash
git clone https://github.com/ErikMartinsss-hub/BitSoul-Academy-.git
cd BitSoul-Academy-
npm install
npm run dev
```

### Upload de PDF para simulado

1. Na tela inicial, clique em **"Enviar PDF para Simulado"**
2. Arraste ou selecione um arquivo PDF com questoes de multipla escolha
3. O sistema extrai automaticamente as questoes e alternativas
4. Resolva o simulado e veja seu desempenho

**Formato esperado do PDF:**

```
01. Qual e a capital do Brasil?
(A) Sao Paulo
(B) Rio de Janeiro
(C) Brasilia
(D) Salvador

Gabarito:
1 - C
```

O sistema reconhece:
- Perguntas numeradas (1., 01., Questao 1.)
- Alternativas com (A), A), A., (a), etc.
- Gabarito ao final do documento (Gabarito:, Respostas:, Resolucao:)

## Tecnologias

- React 19 — Interface de usuario
- Vite 8 — Build e desenvolvimento
- Firebase Firestore — Banco de dados das questoes
- pdfjs-dist — Extracao de texto de PDFs (processamento 100% no navegador)
- Vercel — Deploy

## Estrutura

```
src/
  utils/
    pdfParser.js     - Extracao e parsing de questoes de PDF
  App.jsx            - Componente principal (telas, quiz, resultados)
  App.css            - Estilos da aplicacao
  index.css          - Estilos globais
  main.jsx           - Ponto de entrada React
  migrar.js          - Script para popular o Firestore
```

## Desenvolvido por

Erik Martins
