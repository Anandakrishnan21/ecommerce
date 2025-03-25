import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import React from "react";

function DeleteProduct({ id, setProducts }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prevProduct) =>
          prevProduct.filter((product) => product._id !== id)
        );
        toast({
          variant: "success",
          title: "Delete",
          description: "Product deleted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete product!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Service error",
        description: "Check the internet connection!",
      });
    }
  };
  return (
    <DropdownMenuItem variant="destructive" onClick={handleDelete}>
      Delete
    </DropdownMenuItem>
  );
}

export default DeleteProduct;
