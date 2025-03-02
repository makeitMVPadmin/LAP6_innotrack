import { useAppContext } from "@/AppContext";
import { Skeleton } from "./ui/skeleton";
import Bookmark from "./Bookmark";
import star from "../assets/icons/star-filled.svg";

export default function Summary() {
    const { content, currentIndex } = useAppContext();
    const kpToArray = content[currentIndex]?.keyPoints.replaceAll("•", "").split(/\r?\n/);

    const fallBackKeyPoints = [
        "Smarter Assistants – AI-driven virtual assistants are becoming more intuitive, personalized, and responsive to user needs.",
        "Automation & Robotics – Advancements in AI-powered automation are streamlining tasks in homes, workplaces, and industries.",
        "Immersive AI Experiences – AI is enhancing entertainment, healthcare, and smart devices, creating more seamless and interactive user experiences.",
    ];

    const keyPoints = kpToArray?.length === 3 ? kpToArray : fallBackKeyPoints;

  const tags = {
    "2TtFQsKwmR3GVa1jKmrE": "UI/UX",
    "4LgCNSov0iP7MfxofrkK": "Data Science",
    "4ts4f2TeDzGIl5BwIZpZ": "Cloud Computing",
    "84vXzVFrmob3r0RHIO4o": "AI",
    "Rdj5mCzN6aFYaoY2PxIG": "Software Development",
    "cjXU71iNu0lj51JJUL7x": "Cybersecurity",
    "h3BdxYdEnL0xwNF8fHoI": "Web Development"
  };

    return (
        <>
      {content.length ? <section className="px-fluidx py-fluidy min-w-lg max-w-[100.5625rem] mx-[1.5rem] md:mx-fluid 3xl:mx-auto mt-[1.25rem] bg-[#F6FAFD] rounded-xl border border-black border-solid border-r-2 border-b-2">
              <h2 className="font-fraunces flex gap-fluid items-center text-fluidh2 font-semibold mb-1 tracking-normal">
                  Summary
                    <span
                        className="px-2.5 py-0.5 text-white rounded-full font-normal bg-[#0264D4] h-fit font-montserrat text-xs"
                        >
                        {tags[content[currentIndex].techAreaId]}
                    </span>
              </h2>
              <p
                  key={currentIndex}
                  className="animate-fadeInOut font-montserrat text-fluidp/[1.5] font-normal text-black mt-[1.25rem]"
              >
                  {content.length && content[currentIndex].summary}
              </p>
              <section className="text-end pt-[1.25rem]">
                  <h2 className="font-fraunces flex gap-2 text-fluidh2 font-semibold mb-1">
                      Key Points
                  </h2>
                  <ul className="mt-3">
                      {keyPoints.map((keyPoint, index) => {
                          return (
                              <li
                                  key={index}
                                  className="flex gap-5 font-montserrat text-sm sm:text-base/[1.5] mt-6 text-start"
                              >
                                <span className="block h-[22px] w-[22px]"><img className="block h-[22px] w-[22px]" height={22} width={22} src={star} alt="" /></span>
                                  <span
                                      key={`${index}${currentIndex}`}
                                      className="animate-fadeInOut"
                                  >
                                      {keyPoint.trim()}
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
        </section> : <Skeleton  className="px-fluidx py-fluidy min-w-lg max-w-[100.5625rem] mx-[1.5rem] md:mx-fluid 3xl:mx-auto mt-[1.25rem] rounded-xl border border-black border-solid border-r-2 border-b-2 h-[31.5rem]"/>}
    </>
    );
}
