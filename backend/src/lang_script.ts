import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const process_doc = async (
  filename: string | undefined,
  question: string
) => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct",
    temperature: 0.9,
    openAIApiKey: "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",
  });
  const res = await model.invoke(question);

  const loader = new PDFLoader(`./uploads/${filename}`, {
    splitPages: false,
  });

  const doc = await loader.load();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    doc,
    new OpenAIEmbeddings({
      openAIApiKey: "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",
    })
  );
  const vectorStoreRetriever = vectorStore.asRetriever();
  const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

  return await chain.call({
    query: question,
  });
};
