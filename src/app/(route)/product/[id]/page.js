import React from "react";
import Productpage from "./components/Productpage";

const page = ({ params }) => {
  const Id = params.id ;
  return (
    <div>
      <Productpage ProductId={Id} />
    </div>
  );
};

export default page;
