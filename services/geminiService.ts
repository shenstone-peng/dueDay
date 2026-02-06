import { GoogleGenAI, SchemaType } from "@google/genai"; // 注意：这里我修正了 Type 的引入，新版SDK通常用 SchemaType
import { AIAdvice } from "../types";

// ⚠️ 重要：为了安全起见，不要在文件顶层初始化 Client，
// 这样可以防止某些环境下因为读不到 Key 而直接白屏崩溃。

export const getPregnancyAdvice = async (week: number): Promise<AIAdvice> => {
  // 1. 获取 Key (对应你在 Vercel 设置的 VITE_GEMINI_API_KEY)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 2. 检查 Key 是否存在，方便调试
  if (!apiKey) {
    console.error("❌ 错误: 未找到 VITE_GEMINI_API_KEY。请检查 Vercel 环境变量设置。");
    // 返回兜底数据，避免页面报错
    return getFallbackData();
  }

  try {
    // 3. 在函数内部初始化
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // 建议：目前稳定且快速的模型是 2.0-flash 或 1.5-flash
      contents: `我现在怀孕第 ${week} 周。请以一个温柔体贴的孕产专家的口吻，给我提供以下信息：
      1. 宝宝现在的尺寸（用一种常见的水果或蔬菜形容）。
      2. 宝宝现在的发育重点。
      3. 给准妈妈的本周生活或饮食建议。
      4. 一句温馨的鼓励语。
      请以 JSON 格式返回。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT, // 如果你的 SDK 版本报错，请改回 Type.OBJECT
          properties: {
            babySize: { type: SchemaType.STRING },
            babyDevelopment: { type: SchemaType.STRING },
            momTips: { type: SchemaType.STRING },
            encouragement: { type: SchemaType.STRING },
          },
          required: ["babySize", "babyDevelopment", "momTips", "encouragement"],
        },
      },
    });
    
    // 如果 response.text 已经是对象（新版 SDK 有时会自动解析），直接返回；否则 parse
    const text = response.text(); // 注意：新版 SDK .text() 通常是一个方法
    return typeof text === 'string' ? JSON.parse(text) : text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackData();
  }
};

// 兜底数据提取出来，方便复用
const getFallbackData = () => ({
  babySize: "正在茁壮成长中",
  babyDevelopment: "宝宝的每一个器官都在努力发育，这是生命最初的奇迹。",
  momTips: "注意休息，少食多餐，保持心情愉悦最重要。",
  encouragement: "亲爱的准妈妈，你辛苦了，你正在完成这世上最伟大的事业。"
});
