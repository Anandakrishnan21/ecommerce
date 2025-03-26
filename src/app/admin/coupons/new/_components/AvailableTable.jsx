import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { CircleCheck, Infinity, MoreVertical } from "lucide-react";
import { AiOutlineGlobal } from "react-icons/ai";
import Link from "next/link";
import DeleteCoupon from "@/app/admin/_components/DeleteCoupon";
import { Skeleton } from "@/components/ui/skeleton";

function AvailableTable({ availableCoupons, setCoupons, loading }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="sr-only">Status</TableHead>
          <TableHead>Coupon code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead>Remaining users</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Products</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              </TableRow>
            ))
          : availableCoupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell>
                  <CircleCheck size={16} color="blue" />
                </TableCell>
                <TableCell>{coupon.couponCode}</TableCell>
                <TableCell>
                  {coupon.type === "percentage"
                    ? coupon.limit + "%"
                    : coupon.limit}
                </TableCell>
                <TableCell>{coupon.expiresAt}</TableCell>
                <TableCell>
                  <Infinity />
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  {coupon.productName == "All products" ? (
                    <AiOutlineGlobal size={20} />
                  ) : (
                    coupon.productName
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical size={16} />
                      <span className="sr-only">Action</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/admin/coupons/edit/${coupon._id}`}>
                          Update
                        </Link>
                      </DropdownMenuItem>
                      <DeleteCoupon id={coupon._id} setCoupons={setCoupons} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

export default AvailableTable;
