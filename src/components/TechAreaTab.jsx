import { Button } from "@/components/ui/button";

export default function TechAreaTab({ techAreas }) {
    return (
        <div>
            <Button>All</Button>
            {techAreas.map((techarea) => (
                <Button>{techarea.name}</Button>
            ))}
        </div>
    );
}
