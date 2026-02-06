
import { GoogleGenAI, Type } from "@google/genai";
import { AIAdvice } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPregnancyAdvice = async (week: number): Promise<AIAdvice> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `我现在怀孕第 ${week} 周。请以一个温柔体贴的孕产专家的口吻，给我提供以下信息：
      1. 宝宝现在的尺寸（用一种常见的水果或蔬菜形容）。
      2. 宝宝现在的发育重点。
      3. 给准妈妈的本周生活或饮食建议。
      4. 一句温馨的鼓励语。
      请以 JSON 格式返回。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            babySize: { type: Type.STRING },
            babyDevelopment: { type: Type.STRING },
            momTips: { type: Type.STRING },
            encouragement: { type: Type.STRING },
          },
          required: ["babySize", "babyDevelopment", "momTips", "encouragement"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback static data if API fails
    return {
      babySize: "正在茁壮成长中",
      babyDevelopment: "宝宝的每一个器官都在努力发育，这是生命最初的奇迹。",
      momTips: "注意休息，少食多餐，保持心情愉悦最重要。",
      encouragement: "亲爱的准妈妈，你辛苦了，你正在完成这世上最伟大的事业。"
    };
  }
};
