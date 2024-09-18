"use client";
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import parse from "html-react-parser";
interface IAIPerformance {
  students: string;
  subjects: string;
}

export default function AIPerformance({ students, subjects }: IAIPerformance) {
  const [response, setResponse] = useState<string>("");

  const handleGenerate = async () => {
    const prompt = ` Da questo oggetto ${subjects}, un passo alla volta, mi fai le seguenti operazioni : 
    1. Calcola la media dei voti associati a ciascuna materia, se il valore è null non mostrami alcun consiglio su quella materia.
    2. Se la media di ogni materia è pari o superiore a 6, dai comunque dei consigli per migliorare insieme a un messaggio di congratulazioni.
    3. Se la media per ogni materia è inferiore a 6, restituisci dei consigli per migliorare la situazione in quelle materie, riferisciti a me con il nome ${students}.
    4. Forniscimi anche dei link dove posso trovare documentazione per migliorare il rendimento in quelle materie
    5. NOTA BENE : NEL TESTO NON VOGLIO CHE MI RESTITUISCI LE OPERAZIONI FATTE , MA SOLO I CONSIGLI E EVENTUALI LINK DI DOCUMENTAZIONE 
    6 I link di documentazione devono essere target = _blank con uno style underline
    7. RESTITUISCIMI IL TUTTO NON IN MARK DOWN MA IN tag html stilizzato in TAILWIND 
    8. NON MOSTRARMI LA SPIEGAZIONE DEL CODICE e i backtick iniziali con scritto html `;

    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const output = (result.response.candidates as GenerateContentCandidate[])[0].content.parts[0].text;
        if (output) {
          setResponse(output);
        }
      }
    } catch (error) {
      console.error("Error Creating Story", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div>{parse(response)}</div>
      <button className="flex justify-center" onClick={handleGenerate}>
        CLICCAMI TUTTO
      </button>
    </div>
  );
}
