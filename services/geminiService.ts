import { GoogleGenAI } from "@google/genai";
import { Assessment } from '../types';

const getAiClient = () => {
    // Em um app real, garanta que process.env.API_KEY esteja definida.
    if (!process.env.API_KEY) {
        console.warn("Gemini API Key is missing.");
        return null;
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const GeminiService = {
  /**
   * Gera uma sugestão de treino baseada em tipo e duração.
   */
  generateWorkout: async (type: string, duration: number, intensity: string) => {
    const ai = getAiClient();
    if (!ai) return "Serviço de IA indisponível (Chave ausente)";

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Crie um plano de treino detalhado de ${type} com duração de ${duration} minutos e intensidade ${intensity}. Formate com seções claras: Aquecimento, Parte Principal e Volta à Calma. Use markdown e escreva em Português do Brasil.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Workout Error:", error);
      return "Não foi possível gerar o treino no momento.";
    }
  },

  /**
   * Analisa o progresso do aluno com base no histórico.
   */
  analyzeProgress: async (studentName: string, assessments: Assessment[]) => {
    const ai = getAiClient();
    if (!ai) return "Serviço de IA indisponível (Chave ausente)";

    if (assessments.length < 2) {
      return "Dados insuficientes para análise. Por favor, registre pelo menos duas avaliações.";
    }

    const dataString = assessments.map(a => 
      `Data: ${a.date}, Peso: ${a.weight}kg, Gordura: ${a.bodyFatPercentage}%, VO2Max: ${a.vo2Max || 'N/A'}, Agachamento: ${a.squatMax || 'N/A'}`
    ).join('\n');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analise o progresso fitness do aluno ${studentName} com base nos seguintes dados:\n${dataString}\n\nForneça um resumo motivador das tendências, áreas de melhoria e conselhos específicos para o próximo mês. Mantenha abaixo de 150 palavras e use Português do Brasil.`,
      });
      return response.text;
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return "Não foi possível analisar o progresso.";
    }
  }
};