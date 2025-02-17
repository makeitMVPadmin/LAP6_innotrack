import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewCollectionPopup() {
    return (
        <Card>
            <CardContent>
                <Input></Input>
            </CardContent>
            <CardFooter>
                <Button></Button>
                <Button></Button>
            </CardFooter>
        </Card>
    );
}
