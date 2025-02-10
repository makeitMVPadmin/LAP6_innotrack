import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function AddBookmark() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(["Design", "Development", "AI"]);
  const [newCategory, setNewCategory] = useState("");
  const [creating, setCreating] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(true);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setCreating(false);
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={handleOpen}></Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Bookmark</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to a Collection</DialogTitle>
            <DialogDescription>Select or create a category.</DialogDescription>
          </DialogHeader>

          <div>
            {categories.map((category, index) => (
              <div key={index}>
                <span>{category}</span>
              </div>
            ))}
          </div>

          {creating ? (
            <div>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
              />
              <Button onClick={handleAddCategory}>Save</Button>
            </div>
          ) : (
            <Button onClick={() => setCreating(true)}>
              Create A New Category
            </Button>
          )}
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddBookmark;
