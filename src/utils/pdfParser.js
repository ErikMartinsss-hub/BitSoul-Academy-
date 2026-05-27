const PDFJS_VERSION = '5.7.284';

export async function parseQuestionsFromPDF(file) {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const lastY = { current: null };
    for (const item of content.items) {
      const y = item.transform[5];
      if (lastY.current !== null && Math.abs(y - lastY.current) > 2) {
        fullText += '\n';
      } else if (lastY.current !== null) {
        fullText += ' ';
      }
      lastY.current = y;
      fullText += item.str;
    }
    fullText += '\n\n';
  }

  if (fullText.trim().length < 50) {
    return { questions: [], hasAnswers: false, rawText: fullText, empty: true };
  }

  return parseQuestionsFromText(fullText);
}

export function parseQuestionsFromText(text) {
  const answerKey = extractAnswerKey(text);

  const questions = [];
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

  let currentQuestion = null;
  let currentAlternatives = [];
  let foundFirstAlternative = false;
  let numQuestionsWithAnswers = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const qMatch = line.match(/^(?:Quest[aã]o\s+)?(\d+)\s*[.)]\s*(.*)/i);

    if (qMatch) {
      if (currentQuestion && currentAlternatives.length >= 2) {
        const qNum = currentQuestion.num;
        const answer = currentQuestion.inlineAnswer != null
          ? currentQuestion.inlineAnswer
          : (answerKey && answerKey[qNum] !== undefined ? answerKey[qNum] : -1);
        if (answer >= 0) numQuestionsWithAnswers++;
        questions.push({
          id: questions.length + 1,
          question: currentQuestion.text.trim(),
          options: [...currentAlternatives],
          answer
        });
      }

      currentQuestion = {
        num: parseInt(qMatch[1]),
        text: qMatch[2],
        inlineAnswer: null
      };

      const inlineMatch = line.match(/[Rr]esposta\s*:?\s*[lL]etra\s*([A-Ea-e])/);
      if (inlineMatch) {
        currentQuestion.inlineAnswer = inlineMatch[1].toUpperCase().charCodeAt(0) - 65;
      }

      currentAlternatives = [];
      foundFirstAlternative = false;
    } else if (currentQuestion) {
      const aMatch = line.match(/^\(?([A-Ea-e])\s*[.)]\s*(.*)/);
      if (aMatch) {
        currentAlternatives.push(`${aMatch[1].toUpperCase()}) ${aMatch[2]}`);
        foundFirstAlternative = true;
      } else if (foundFirstAlternative && currentAlternatives.length > 0) {
        currentAlternatives[currentAlternatives.length - 1] += ' ' + line;
      } else {
        currentQuestion.text += ' ' + line;
      }
    }
  }

  if (currentQuestion && currentAlternatives.length >= 2) {
    const qNum = currentQuestion.num;
    const answer = currentQuestion.inlineAnswer != null
      ? currentQuestion.inlineAnswer
      : (answerKey && answerKey[qNum] !== undefined ? answerKey[qNum] : -1);
    if (answer >= 0) numQuestionsWithAnswers++;
    questions.push({
      id: questions.length + 1,
      question: currentQuestion.text.trim(),
      options: [...currentAlternatives],
      answer
    });
  }

  if (questions.length === 0) {
    return parseQuestionsFallback(text);
  }

  return {
    questions,
    hasAnswers: numQuestionsWithAnswers > 0,
    rawText: text,
    empty: false
  };
}

function parseQuestionsFallback(text) {
  const answerKey = extractAnswerKey(text);
  const questions = [];
  let numQuestionsWithAnswers = 0;

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  let currentQuestion = null;
  let currentAlternatives = [];
  let foundFirstAlternative = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const qMatch = line.match(/^(\d+)\s*[.)]\s*(.*)/);

    if (qMatch) {
      if (currentQuestion && currentAlternatives.length >= 2) {
        const answer = answerKey && answerKey[currentQuestion.num] !== undefined ? answerKey[currentQuestion.num] : -1;
        if (answer >= 0) numQuestionsWithAnswers++;
        questions.push({
          id: questions.length + 1,
          question: currentQuestion.text.trim(),
          options: [...currentAlternatives],
          answer
        });
      }
      currentQuestion = { num: parseInt(qMatch[1]), text: qMatch[2] };
      currentAlternatives = [];
      foundFirstAlternative = false;
    } else if (currentQuestion) {
      const aMatch = line.match(/^\(?([A-Ea-e])\s*[.)]\s*(.*)/);
      if (aMatch) {
        currentAlternatives.push(`${aMatch[1].toUpperCase()}) ${aMatch[2]}`);
        foundFirstAlternative = true;
      } else if (foundFirstAlternative && currentAlternatives.length > 0) {
        currentAlternatives[currentAlternatives.length - 1] += ' ' + line;
      } else {
        currentQuestion.text += ' ' + line;
      }
    }
  }

  if (currentQuestion && currentAlternatives.length >= 2) {
    const answer = answerKey && answerKey[currentQuestion.num] !== undefined ? answerKey[currentQuestion.num] : -1;
    if (answer >= 0) numQuestionsWithAnswers++;
    questions.push({
      id: questions.length + 1,
      question: currentQuestion.text.trim(),
      options: [...currentAlternatives],
      answer
    });
  }

  return {
    questions,
    hasAnswers: numQuestionsWithAnswers > 0,
    rawText: text,
    empty: false
  };
}

function extractAnswerKey(text) {
  const patterns = [
    /(?:GABARITO|RESPOSTAS?|RESOLU[ÇC][AÃ]O|RESPOSTAS?\s*OFICIAIS)\s*:?([\s\S]*?)(?=\n\s*(?:\n|$))/i,
    /(?:GABARITO|RESPOSTAS?|RESOLU[ÇC][AÃ]O|RESPOSTAS?\s*OFICIAIS)\s*:?([\s\S]*)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const keySection = match[1];
      const keyMap = {};
      const entryRegex = /(\d+)\s*[-.)\s]*\s*([A-Ea-e])\s*(?:[-.)\s]*\s*|$)/g;
      let entry;
      while ((entry = entryRegex.exec(keySection)) !== null) {
        keyMap[parseInt(entry[1])] = entry[2].toUpperCase().charCodeAt(0) - 65;
      }
      if (Object.keys(keyMap).length > 0) return keyMap;
    }
  }

  return null;
}
