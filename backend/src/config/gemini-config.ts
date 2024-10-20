import { GoogleGenerativeAI } from "@google/generative-ai";

export const configureGeminiAI = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  return genAI;
};