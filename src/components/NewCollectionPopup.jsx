import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewCollectionPopup() {
    return (
        <Card className="w-[324px] border-r-2 border-b-2 border-black bg-[#FCFDFD]">
            <CardContent className="pt-4 px-4">
                <Input
                    placeholder="Enter collection name"
                    className="text-lg border-r-2 border-b-2 border-[#182127] rounded-lg"
                />
            </CardContent>
            <CardFooter className="pb-4 px-4 flex justify-between">
                <Button className="bg-yellow-400 hover:bg-yellow-400 text-[#28363F] rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_2px_1px_-1px_rgba(0,0,0,0.20)]">
                    Done
                </Button>
                <Button className="bg-[#FCFDFD]" variant="ghost">
                    Cancel
                </Button>
            </CardFooter>
        </Card>
    );
}
