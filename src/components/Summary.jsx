import { useAppContext } from "@/AppContext";
import { Button } from "./ui/button";

export default function Summary() {

    const { content } = useAppContext();
    
    const keyPoints = ["Smarter Assistants – AI-driven virtual assistants are becoming more intuitive, personalized, and responsive to user needs.", "Automation & Robotics – Advancements in AI-powered automation are streamlining tasks in homes, workplaces, and industries.", "Immersive AI Experiences – AI is enhancing entertainment, healthcare, and smart devices, creating more seamless and interactive user experiences."];

    return (
        <section className="max-w-[103rem] w-full px-[5rem] py-[2rem] mt-[7rem] m-auto bg-[#F6FAFD] rounded-xl border border-black border-solid border-r-2 border-b-2">
            <h2 className="font-fraunces flex gap-2 text-2xl font-semibold mb-1 tracking-normal">Summary</h2>
            <p className="font-montserrat text-base/[1.5] font-normal text-black mt-[1.25rem]">{content.length && content[0].summary}</p>
            <section className="text-end pt-[1.25rem]">
                <h2 className="font-fraunces flex gap-2 text-2xl font-semibold mb-1">Key Points</h2>
                <ul className="mt-3">
                    {
                        keyPoints.map((keyPoint, index) => {
                            return (
                                <li key={index} className="relative font-montserrat text-base/[1.5] mt-6 ml-[3.125rem] before:content-listStar before:absolute before:left-[-2.375rem] before:top-[2px] text-start">{keyPoint}</li>
                            );
                        })
                    }
                </ul>
            </section>
        </section>
    );
}