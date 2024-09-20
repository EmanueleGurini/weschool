"use client";
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

interface IAIPerformance {
  students: string;
  subjects: string;
}



export default function AIPerformance({ students, subjects }: IAIPerformance) {
  const [response, setResponse] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const handleGenerate = async () => {
    setResponse("")
    setLoader(true)
    const prompt = ` From this object ${subjects}, step by step, perform the following operations:

    1. Calculate the average of the grades associated with each subject; if the value is null, do not show me any advice on that subject.
    2. If the average of each subject is equal to or greater than 6, still provide advice for improvement along with a congratulatory message.
    3. If the average for each subject is less than 6, give advice to improve the situation in those subjects, referring to me by the name ${students}.
    4. Also provide me with links where I can find documentation to improve performance in those subjects.
    5. NOTE: IN THE TEXT, I DO NOT WANT YOU TO RETURN THE OPERATIONS DONE, BUT ONLY THE ADVICE AND ANY DOCUMENTATION LINKS.
    6. The documentation links should have target=_blank with an underline style.
    7. RETURN EVERYTHING NOT IN MARKDOWN BUT IN HTML TAGS STYLED WITH TAILWIND.
    8. DO NOT SHOW ME THE CODE EXPLANATION and the initial backticks with 'html' written.`;

    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const output = (result.response.candidates as GenerateContentCandidate[])[0].content.parts[0].text;
        if (output) {
          setResponse(output);
          setLoader(false);
        }
      }
    } catch (error) {
      console.error("Error Creating Story", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 items-end p-10 ">
      <div className="bg-white w-full h-[450px] flex justify-center font-nunito text-sm text-color100 overflow-y-scroll">
        {response && parse(response)}
        {response === "" && loader && <div className="w-full h-full flex items-center justify-center"><div className= "h-[40px] w-[40px] rounded-full border-2 border-t-0 border-contrast animate-spin-fast"></div></div>}
        {!loader && response ==="" && <div className="w-full h-full flex items-center justify-center"><Image width={200} height={200} src="/img/ai.png" alt="ai icon"/></div>}
      </div>
      <button 
        className="mb-4 my-4 inline-block rounded-lg bg-color100 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50" 
        onClick={handleGenerate}
      >
        Click here for AI suggestions
      </button>

    </div>
  );
}
