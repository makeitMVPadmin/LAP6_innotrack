import { useAppContext } from "@/AppContext";
import Bookmark from "./Bookmark";

export default function Summary() {
    const { content, currentIndex } = useAppContext();

    const keyPoints = [
        "Smarter Assistants – AI-driven virtual assistants are becoming more intuitive, personalized, and responsive to user needs.",
        "Automation & Robotics – Advancements in AI-powered automation are streamlining tasks in homes, workplaces, and industries.",
        "Immersive AI Experiences – AI is enhancing entertainment, healthcare, and smart devices, creating more seamless and interactive user experiences.",
    ];

    const tags = ["DEV", "DATA"];

    return (
        <section className="px-[5rem] py-[2rem] mx-[1rem] mt-[7rem] bg-[#F6FAFD] rounded-xl border border-black border-solid border-r-2 border-b-2">
            <h2 className="font-fraunces flex gap-4 items-center text-2xl font-semibold mb-1 tracking-normal">
                Summary
                {tags.map((tag, index) => {
                    return (
                        <span
                            key={index}
                            className="px-2.5 py-0.5 text-white rounded-full font-normal bg-[#0264D4] h-fit font-montserrat text-xs"
                        >
                            {tag}
                        </span>
                    );
                })}
            </h2>
            <p
                key={currentIndex}
                className="animate-fadeInOut font-montserrat text-base/[1.5] font-normal text-black mt-[1.25rem]"
            >
                {content.length && content[currentIndex].summary}
            </p>
            <section className="text-end pt-[1.25rem]">
                <h2 className="font-fraunces flex gap-2 text-2xl font-semibold mb-1">
                    Key Points
                </h2>
                <ul className="mt-3">
                    {keyPoints.map((keyPoint, index) => {
                        return (
                            <li
                                key={index}
                                className="relative font-montserrat text-base/[1.5] mt-6 ml-[3.125rem] before:content-listStar before:absolute before:left-[-2.375rem] before:top-[2px] text-start"
                            >
                                <span
                                    key={`${index}${currentIndex}`}
                                    className="animate-fadeInOut"
                                >
                                    {keyPoint}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <div className="flex justify-end mt-[1.5rem] gap-[1rem]">
            <a href="#"
                    className="font-montserrat font-semibold text-sm/[1.57] px-3.5 py-1.5 text-[#28363F] bg-yellow-400 
    hover:bg-yellow-500 border-black border-l border-t border-r-2 
    border-b-2 rounded-lg shadow-customButton transition"
                  >
                    Read More
                  </a>
                <Bookmark contentInfo={content[currentIndex] ?? { id: "" }} />
            </div>
        </section>
    );
}
