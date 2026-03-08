import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCao2mq_34eCL45OT1sljzYgv54zMy2JUM");

export async function analyzeWaste(imageFile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

    const prompt = `You are a waste segregation expert for Ranchi, India.
Analyze this image and identify the waste item.
Respond ONLY in this exact JSON format with no extra text:
{
  "itemName": "name of the item",
  "category": "Wet Waste" or "Dry Waste" or "Hazardous Waste",
  "bin": "Green Bin" or "Blue Bin" or "Red Bin",
  "recyclable": true or false,
  "biodegradable": true or false,
  "hazardous": true or false,
  "disposalTip": "one specific tip for Ranchi",
  "confidence": "High" or "Medium" or "Low"
}
Rules:
Wet Waste = Green Bin = food, vegetables, fruits, leaves
Dry Waste = Blue Bin = plastic, paper, glass, metal, cardboard
Hazardous = Red Bin = batteries, medicines, chemicals, e-waste`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: imageFile.type,
          data: base64
        }
      }
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Parse failed");

  } catch (error) {
    console.error("Gemini error:", error);
    return {
      itemName: "Unknown Item",
      category: "Dry Waste",
      bin: "Blue Bin",
      recyclable: false,
      biodegradable: false,
      hazardous: false,
      disposalTip: "When in doubt place in Blue Bin and visit our Waste Guide!",
      confidence: "Low"
    };
  }
}