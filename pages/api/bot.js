import { OpenAI } from 'langchain/llms/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

const store = await buildVectorStore(); // earlier embedded data

export default async function handler(req, res) {
  const { question } = req.body;
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });

  const similar = await store.similaritySearch(question, 3);
  const context = similar.map(d => d.pageContent).join('\n---\n');

  const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
  const answer = await llm.call(`Context:\n${context}\n\nQuestion: ${question}\nAnswer:`);

  res.status(200).json({ answer });
}
