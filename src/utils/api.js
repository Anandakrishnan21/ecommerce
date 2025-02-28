export const getProducts = async () => {
  try {
    const res = await fetch("/api/product", {
      cache: "no-store",
    });

    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data!",
      });
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const getCoupons = async () => {
  try {
    const res = await fetch("/api/coupon", {
      cache: "no-store",
    });

    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data!",
      });
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};
