import React from "react";
import { Card } from "./Card";

const bgImage = () => {
  const imageUrl = "./src/assets/bgImage.png";

  return (
    <div className="container mx-auto p-4">
      <Card bgImage={`bg-[url(${imageUrl})]`}></Card>
    </div>
  );
};

export default bgImage;
