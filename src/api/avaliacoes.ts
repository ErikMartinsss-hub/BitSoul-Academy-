import { MongoClient } from 'mongodb';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Pega a variável MONGODB_URI salva na Vercel
const uri = process.env.MONGODB_URI;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurações de CORS e métodos permitidos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!uri) {
    return res.status(500).json({ error: 'MONGODB_URI não configurado no painel' });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('QUIZ');
    const collection = database.collection('AVALIACOES');

    // Busca todas as avaliações e converte para array
    const questoes = await collection.find({}).toArray();
    return res.status(200).json(questoes);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  } finally {
    await client.close();
  }
}