import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TechAreaTab({ techAreas, selectedTabId, onTabChange }) {
    return (
        <div className="flex gap-5 items-center mb-8">
            {techAreas?.map((techArea) => (
                <Button
                    key={techArea.id}
                    className={cn(
                        "rounded-lg h-8 px-4",
                        "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                        selectedTabId === techArea.id
                            ? "text-white bg-[#0264D4] hover:bg-[#03438e]"
                            : "bg-[#C2D1DB40] text-[#748590] hover:bg-slate-300"
                    )}
                    onClick={() => onTabChange(techArea.id)}
                >
                    {techArea.name}
                </Button>
            ))}
        </div>
    );
}
