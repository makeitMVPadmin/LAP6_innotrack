import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";

export default function NewCollectionPopup({ onCreateCollection }) {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [error, setError] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function handleCreateNewCategory() {
        const regex = /^[a-zA-Z0-9-_/&+]+$/;
        newCategoryName.trim();
        if (regex.test(newCategoryName)) {
            let newCategoryInfo = {
                name: newCategoryName.trim(),
                createdAt: Date.now(),
            };
            onCreateCollection(newCategoryInfo);
            setError(false);
        } else {
            setError(true);
        }
        setNewCategoryName("");
        setIsPopupVisible(false);
        setTimeout(setIsPopupOpen(false), 300);
    }

    function handleClosePopup() {
        setIsPopupVisible(false);
        setTimeout(setIsPopupOpen(false), 300);
    }

    useEffect(() => {
        if (isPopupOpen) {
            const timer = setTimeout(() => {
                setIsPopupVisible(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isPopupOpen]);

    return (
        <>
            <Dialog
                open={isPopupOpen}
                onOpenChange={(open) => {
                    if (open) {
                        setIsPopupOpen(true);
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button className="bg-[#0264D4] hover:bg-[#0264D4] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton">
                        New Collection
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none shadow-none top-[75%]">
                    <div
                        className={cn(
                            " w-full max-w-md transform transition-all duration-300 ease-in-out",
                            isPopupVisible
                                ? "-translate-x-[590px]"
                                : "-translate-x-[1500px]"
                        )}
                    >
                        <div className="w-[324px] border-black border-r-2 border-b-2 rounded-xl bg-[#FCFDFD] my-4">
                            <div className="pt-4 pb-6 px-4">
                                <Input
                                    value={newCategoryName}
                                    onChange={(e) =>
                                        setNewCategoryName(e.target.value)
                                    }
                                    placeholder="Enter collection name"
                                    className={cn(
                                        "text-lg border-[#182127] border-r-2 border-b-2 rounded-lg",
                                        error && "border-red-600"
                                    )}
                                ></Input>
                            </div>
                            <DialogFooter className="pb-4 px-4 flex sm:justify-between">
                                <Button
                                    onClick={handleClosePopup}
                                    className="bg-[#FCFDFD] border-black border-l border-t border-r-2 border-b-2 focus:outline-none"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateNewCategory}
                                    className="bg-[#0264D4] hover:bg-[#0264D4] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton"
                                >
                                    Done
                                </Button>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
