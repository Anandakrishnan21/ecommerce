import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatter";
import { getCoupons } from "@/utils/api";
import React, { useEffect, useState } from "react";
import AvailableTable from "./AvailableTable";
import ExpiredTable from "./ExpiredTable";

function CouponTable() {
  const { toast } = useToast();
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [expiredCoupons, setExpiredCoupons] = useState([]);
  const date = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoupons();
        const available = data.filter((data) => {
          return data.expiresAt > formatDate(date);
        });

        const expired = data.filter((data) => {
          return data.expiresAt < formatDate(date);
        });
        setAvailableCoupons(available);
        setExpiredCoupons(expired);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      }
    };
    fetchData();
  }, [toast]);

  return (
    <div>
      <AvailableTable availableCoupons={availableCoupons} />
      <ExpiredTable expiredCoupons={expiredCoupons} />
    </div>
  );
}

export default CouponTable;
