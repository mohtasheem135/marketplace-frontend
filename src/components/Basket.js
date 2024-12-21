import React from "react";
import { useBasket } from "../context/BasketContext";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import PlaceOrder from "./PlaceOrder";

const Basket = () => {
  const { basket, removeFromBasket } = useBasket();

  return (
    <div className="px-[20px] md:px-[100px] py-10">
      <Dialog>
        <DialogTrigger asChild>
          {basket.length > 0 && (
            <div className="mt-[0px] absolute right-[100px]">
              <Button>Place Order</Button>
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
            <DialogDescription>
              Fill up your details and place order
            </DialogDescription>
          </DialogHeader>
          <PlaceOrder basket={basket} />
        </DialogContent>
      </Dialog>

      {basket.length === 0 ? (
        <p>Your basket is empty!</p>
      ) : (
        <div className="flex flex-wrap">
          {basket.map((item) => (
            <div className="px-2 h-[400px]">
              <Card className="p-4 w-[250px]">
                <div className="p-4 flex justify-center items-center shadow-md rounded-md">
                  <img
                    src={item?.product?.imageUrl}
                    alt="iamge"
                    className="rounded-md "
                  />
                </div>
                <h3 className="my-2 cursor-default">{item?.product.name}</h3>
                <p className="cursor-default">Quantity: {item.quantity}</p>
                <div className="flex justify-between items-center my-2">
                  <Badge className="font-light mb-2 text-[16px] cursor-default">
                    Total: ${(item?.product.price * item.quantity).toFixed(2)}
                  </Badge>
                  <button
                    onClick={() => removeFromBasket(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
