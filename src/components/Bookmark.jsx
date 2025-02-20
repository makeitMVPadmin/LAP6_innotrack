import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Bookmark() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add to A Collection</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <img
                        src="../assets/placeholder.svg"
                        alt=""
                        className="w-12 h-12 rounded"
                    />
                    <Checkbox id="123abc" className=" " />
                    <label
                        htmlFor="123abc"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Item1
                    </label>
                </div>
            </CardContent>
            <CardFooter>
                <Button>New Collection</Button>
                <Button>Done</Button>
            </CardFooter>
        </Card>
    );
}
