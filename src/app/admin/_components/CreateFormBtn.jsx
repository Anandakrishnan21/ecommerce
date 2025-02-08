import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function CreateFormBtn({ children, link }) {
  return (
    <Button asChild variant="outline" size="sm">
      <Link href={link}>{children}</Link>
    </Button>
  );
}

export default CreateFormBtn;
