import DeleteProduct from "@/app/admin/_components/DeleteProduct";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getProducts } from "@/utils/api";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { resolve } from "styled-jsx/css";

function ProductTable() {
  const { toast } = useToast();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleAvailability = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ isAvailableForPurchase: newStatus }),
      });

      if (res.ok) {
        toast({
          variant: "success",
          title: "Success",
          description: "Successfully update the status",
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to update the status",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="sr-only">Available for purchase</TableHead>
          <TableHead>Product Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Orders</TableHead>
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
              </TableRow>
            ))
          : products.map((product) => (
              <TableRow
                key={product._id}
                className={`${
                  product.isAvailableForPurchase ? "" : "opacity-80"
                }`}
              >
                <TableCell>
                  {product.isAvailableForPurchase ? (
                    <>
                      <span className="sr-only">Available</span>
                      <CheckCircle2 size={16} color="blue" />
                    </>
                  ) : (
                    <>
                      <span className="sr-only">Unavailable</span>
                      <XCircle size={16} color="red" />
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Image
                    src={product.imagePath}
                    width={20}
                    height={20}
                    alt="img"
                  />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>0</TableCell>
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
                        <Link href={`/admin/products/edit/${product._id}`}>
                          Update
                        </Link>
                      </DropdownMenuItem>
                      {product.isAvailableForPurchase === true ? (
                        <DropdownMenuItem
                          onClick={() =>
                            handleAvailability(
                              product._id,
                              product.isAvailableForPurchase
                            )
                          }
                        >
                          Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            handleAvailability(
                              product._id,
                              product.isAvailableForPurchase
                            )
                          }
                        >
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DeleteProduct
                        id={product._id}
                        setProducts={setProducts}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

export default ProductTable;
