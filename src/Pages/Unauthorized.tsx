import { Button } from "@/components/ui/button";
import React, { FunctionComponent } from "react";

const Unauthorized: FunctionComponent = () => {
  return (
    <div className="container text-center add py-4">
      <h1 className="text-black">Page non autorisé ! </h1>
      <Button variant={"link"}>
        <a href="/">Page d'acceuil</a>
      </Button>
    </div>
  );
};

export default Unauthorized;
