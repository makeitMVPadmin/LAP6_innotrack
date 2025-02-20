import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import info from "../assets/icons/info-circled.svg";
import bookmark from "../assets/icons/bookmark.svg";

export default function Summary({content}){

    return(
        <Dialog className="bg-transparent">
            <DialogTrigger className="bg-transparent border-transparent shadow-none w-auto h-auto p-0">
                <img src={info} alt="" />
            </DialogTrigger>
            <DialogContent showOverlay={false} className="pt-[4.375rem] pb-[2.1875rem] px-[1.5rem]"><DialogHeader>
                <DialogTitle className="font-fraunces flex gap-2 text-2xl font-semibold mb-1">Summary <img src={bookmark} alt="" /></DialogTitle>
                <DialogDescription className="font-montserrat text-xs/4 font-normal text-black">{content}</DialogDescription>
            </DialogHeader>
            <section>
                <h2 className="font-fraunces flex gap-2 text-2xl font-semibold mb-1">Key Points</h2>
                <ul>

                </ul>
            </section>
            </DialogContent>
        </Dialog>
    );
} 