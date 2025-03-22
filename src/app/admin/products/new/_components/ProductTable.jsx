import DeleteButton from "@/app/admin/_components/DeleteButton";
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
import { useToast } from "@/hooks/use-toast";
import { getProducts } from "@/utils/api";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ProductTable() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
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
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 size={16} />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle />
                </>
              )}
            </TableCell>
            <TableCell>
              <Image src={product.imagePath} width={20} height={20} alt="img" />
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
                    <Link href={`/admin/products/edit/${product._id}`}>Update</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Deactivate</DropdownMenuItem>
                  <DeleteButton id={product._id} setProducts={setProducts} />
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
