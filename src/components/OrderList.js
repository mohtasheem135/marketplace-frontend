import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const OrderList = ({ orderedItems }) => {
  return (
    <div className="space-y-3 overflow-y-auto h-[400px]">
      {orderedItems.map((order, index) => (
        <div>
          <Card className="  h-[100px] p-4 flex">
            <img
              className="w-[150px] rounded-md"
              src={order?.product?.imageUrl}
            />
            <div className="ml-4 flex justify-between items-center w-full">
              <div>
                <p>{order?.product?.name}</p>
                <p>Quantity: {order?.quantity}</p>
              </div>
              <div>
                <Badge className="cursor-default font-light tracking-wider">
                  Total: ${(order?.product.price * order.quantity).toFixed(2)}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
