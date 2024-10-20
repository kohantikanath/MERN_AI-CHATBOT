import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGeminiAI } from "../config/gemini-config.js";
import { GoogleGenerativeAI, GenerativeModel, ChatSession } from "@google/generative-ai";

interface ChatMessage {
  role: string;
  content: string;
}

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // grab chats of user
    const chats: ChatMessage[] = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to Gemini API
    const genAI: GoogleGenerativeAI = configureGeminiAI();
    const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare the chat history for Gemini
    const chatHistory = chats.map(chat => ({
      role: chat.role === "user" ? "user" : "model",
      parts: [{ text: chat.content }],
    }));

    // Start a new chat session
    const chat: ChatSession = model.startChat({ history: chatHistory });

    // Get the response from Gemini
    const result = await chat.sendMessage(message);
    const response = result.response;

    // Add the response to the user's chat history
    const aiMessage: ChatMessage = { content: response.text(), role: "assistant" };
    user.chats.push(aiMessage);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};