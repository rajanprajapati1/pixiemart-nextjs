import React from "react";
import SingleOrderPage from "../components/SingleOrderPage";

const page = ({ params }) => {
  const OrderId = params.id;
  return <SingleOrderPage OrderId={OrderId} />;
};

export default page;
