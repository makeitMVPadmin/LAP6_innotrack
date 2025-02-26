import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import info from "../assets/icons/info-circled.svg";
import bookmark from "../assets/icons/bookmark.svg";
import { Button } from "./ui/button";

export default function SummaryDialog({content}){

    const keyPoints = ["Smarter Assistants – AI-driven virtual assistants are becoming more intuitive, personalized, and responsive to user needs.", "Automation & Robotics – Advancements in AI-powered automation are streamlining tasks in homes, workplaces, and industries.", "Immersive AI Experiences – AI is enhancing entertainment, healthcare, and smart devices, creating more seamless and interactive user experiences."];

    return(
        <Dialog className="bg-transparent">
            <DialogTrigger className="bg-transparent border-transparent shadow-none w-auto h-auto p-0">
                <img src={info} alt="" />
            </DialogTrigger>
            <DialogContent showOverlay={false} animateOpen="animate-modalSlideInBottom" animateClose="animate-modalSlideOutBottom" className="pt-[4.375rem] pb-[2.1875rem] px-[1.5rem] max-w-[43.1875rem]">
                <DialogHeader>
                    <DialogTitle className="font-fraunces flex gap-2 text-2xl font-semibold mb-1 tracking-normal">Summary <img src={bookmark} alt="" /></DialogTitle>
                    <DialogDescription className="font-montserrat text-xs/4 font-normal text-black">{content}</DialogDescription>
                </DialogHeader>
            <section className="text-end">
                <h2 className="font-fraunces flex gap-2 text-2xl font-semibold mb-1">Key Points</h2>
                <ul className="mt-3">
                    {
                        keyPoints.map((keyPoint, index) => {
                            return (
                                <li key={index} className="relative font-montserrat text-base/[1.5] mt-6 ml-[3.125rem] first:mt-[0] before:content-listStar before:absolute before:left-[-2.375rem] before:top-[2px] text-start">{keyPoint}</li>
                            );
                        })
                    }
                </ul>
                <Button className="font-montserrat ml-auto mt-[1.625rem] bg-[#FFD22F] text-black px-[2rem] py-[0.375rem] text-xs/1.4 font-medium">Read More</Button>
            </section>
            </DialogContent>
        </Dialog>
    );
} 