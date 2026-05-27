# 🎓 BitSoul Academy

Plataforma de simulados inteligente para estudantes. Escolha sua instituição, selecione a matéria e resolva questões de múltipla escolha com correção automática e análise de desempenho.

## ✨ Funcionalidades

- **📚 Simulados por Instituição** — Questões organizadas por faculdade e disciplina, carregadas do Firebase Firestore.
- **📄 Upload de PDF** — Envie um PDF com questões de múltipla escolha e o sistema extrai automaticamente as perguntas, alternativas e gabarito para criar um simulado personalizado.
- **✅ Correção Automática** — Resposta certa fica verde, errada fica vermelha, com destaque da alternativa correta.
- **📊 Análise de Desempenho** — Ao final, confira seus acertos e erros, com dicas de melhoria para cada questão.
- **📱 Responsivo** — Funciona perfeitamente no celular e no desktop.

## 🚀 Como usar

### Acessar online
Basta abrir o link do projeto no Vercel (ou rodar localmente).

### Rodar localmente

```bash
# Clone o repositório
git clone https://github.com/ErikMartinsss-hub/BitSoul-Academy-.git

# Entre na pasta
cd BitSoul-Academy-

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Upload de PDF para simulado

1. Na tela inicial, clique em **"📄 Enviar PDF para Simulado"**
2. Arraste ou selecione um arquivo **PDF** com questões de múltipla escolha
3. O sistema extrai automaticamente as questões e alternativas
4. Resolva o simulado e veja seu desempenho

**Formato esperado do PDF:**
```
01. Qual é a capital do Brasil?
(A) São Paulo
(B) Rio de Janeiro
(C) Brasília
(D) Salvador

Gabarito:
1 - C
```

O sistema reconhece:
- Perguntas numeradas (`1.`, `01.`, `Questão 1.`)
- Alternativas com `(A)`, `A)`, `A.`, `(a)`, etc.
- Gabarito ao final do documento (`Gabarito:`, `Respostas:`, `Resolução:`)

## 🛠️ Tecnologias

- **React 19** — Interface de usuário
- **Vite 8** — Build e desenvolvimento
- **Firebase Firestore** — Banco de dados das questões
- **pdfjs-dist** — Extração de texto de PDFs (processamento 100% no navegador)
- **Vercel** — Deploy

## 📁 Estrutura

```
src/
├── utils/
│   └── pdfParser.js     # Extração e parsing de questões de PDF
├── App.jsx              # Componente principal (telas, quiz, resultados)
├── App.css              # Estilos da aplicação
├── index.css            # Estilos globais
├── main.jsx             # Ponto de entrada React
└── migrar.js            # Script para popular o Firestore
```

## 🧑‍💻 Desenvolvido por

Erik Martins 🚀
