import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const refineNotes = async (currentNotes: string, projectType: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return currentNotes;

  try {
    const prompt = `
      Você é um especialista em orçamentos de engenharia civil e impermeabilização.
      Melhore o seguinte texto de 'Observações' para um orçamento profissional.
      Mantenha o tom formal, claro e técnico.
      
      Tipo do Projeto: ${projectType}
      Texto atual: "${currentNotes}"
      
      Se o texto atual for muito simples (ex: "zero observações"), sugira 3 tópicos padrões importantes para orçamentos de impermeabilização (ex: tempo de cura, necessidade de superfície limpa, garantia).
      Retorne apenas o texto aprimorado, sem aspas ou preâmbulos.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || currentNotes;
  } catch (error) {
    console.error("Error refining notes:", error);
    return currentNotes;
  }
};

export const suggestDescription = async (inputType: 'material' | 'labor', keyword: string): Promise<string> => {
    const ai = getClient();
    if (!ai) return keyword;
  
    try {
      const prompt = `
        Aja como um orçamentista de obras.
        Escreva uma descrição técnica curta e profissional para um item de linha em um orçamento.
        
        Contexto: Orçamento de Impermeabilização.
        Categoria: ${inputType === 'material' ? 'Material' : 'Mão de Obra / Serviço'}.
        Palavra-chave/Ideia do usuário: "${keyword}"
        
        Retorne apenas a descrição sugerida (ex: "Manta asfáltica aluminizada 3mm...").
      `;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
  
      return response.text || keyword;
    } catch (error) {
      console.error("Error suggesting description:", error);
      return keyword;
    }
  };