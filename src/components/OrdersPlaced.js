import React, { useEffect, useState } from "react";
import OrderService from "../service/orderService";
import { Card } from "./ui/card";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import OrderList from "./OrderList";

const OrdersPlaced = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getOrders();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="px-[20px] md:px-[100px] py-[50px]">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul className="space-x-2 flex flex-wrap">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="">
                <Card className="py-4 px-4 flex flex-col h-[200px] justify-between items-center">
                  <div className="flex space-x-5">
                    <div className="space-y-4">
                      <User size={50} />
                      <p className="">{order.userName}</p>
                    </div>
                    <div>
                      <Badge>{order.orderStatus}</Badge>
                    </div>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="">
                          <Button>View All Orders</Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="">
                        <DialogHeader>
                          <DialogTitle>Order List of {order.userName}</DialogTitle>
                          <DialogDescription>
                            List of all the orders.
                          </DialogDescription>
                        </DialogHeader>
                        <OrderList orderedItems={order.orderedItems} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPlaced;
