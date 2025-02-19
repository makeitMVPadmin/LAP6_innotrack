import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Checkbox } from "@/components/ui/checkbox";

export default function Bookmark() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add to A Collection</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <img
                        src="../assets/placeholder.svg"
                        alt=""
                        className="w-12 h-12 rounded"
                    />
                    <label htmlFor="">Item1</label>
                </div>
            </CardContent>
            <CardFooter>
                <Button>New Collection</Button>
                <Button>Done</Button>
            </CardFooter>
        </Card>
    );
}
