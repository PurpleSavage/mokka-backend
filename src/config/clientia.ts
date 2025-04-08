import { GoogleGenAI } from "@google/genai";
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from "openai";
import { envs } from "./envs";

export const clientOpenIA = new OpenAI({apiKey:envs.OPEN_AI_API_KEY});
export const clientGoogleIa= new GoogleGenAI({ apiKey:envs.GOOGLE_AI_API_KEY});
export const clientAnthropicIa = new Anthropic({apiKey: envs.CLAUDE_AI_API_KEY});