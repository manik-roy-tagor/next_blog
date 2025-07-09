// scripts/embedBlogs.js
import axios from 'axios';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

const API_URL = 'https://developertagor.xyz/iyf_lal_api/api/blogs.php?page=1';

(async () => {
  const res = await axios.get(API_URL);
  const blogs = res.data.data;

  const texts = blogs.map(b => `${b.title}\n${b.content}`);
  const metadata = blogs.map(b => ({ id: b.id, title: b.title }));

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: 'your-openai-api-key' });
  const store = await MemoryVectorStore.fromTexts(texts, metadata, embeddings);

  // Test search
  const result = await store.similaritySearch('যোগ ব্যায়ামের উপকারিতা', 1);
  console.log(result);
})();
