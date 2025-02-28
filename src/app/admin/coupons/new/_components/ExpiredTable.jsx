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
import { CircleX, Infinity, MoreVertical } from "lucide-react";
import SubHeader from "@/app/admin/_components/SubHeader";
import { AiOutlineGlobal } from "react-icons/ai";

function ExpiredTable({ expiredCoupons }) {
  return (
    <div className="mt-10">
      <SubHeader>Expired coupon</SubHeader>
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
          {expiredCoupons.map((coupon) => (
            <TableRow key={coupon._id}>
              <TableCell>
                <CircleX size={16} color="red" />
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
                    <DropdownMenuItem>Update</DropdownMenuItem>
                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                    {/* <DeleteButton id={product._id} setProducts={setProducts} /> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExpiredTable;
