import { Nav, NavLink } from "@/components/Sidebar";
import {
  AiOutlineDashboard,
  AiOutlineShopping,
  AiOutlineTag,
} from "react-icons/ai";
export const dynamic = "force-dynamic";
export default function AdminLayout({ children }) {
  return (
    <div className="h-screen grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
      <Nav>
        <NavLink href="/admin">
          <AiOutlineDashboard size={16} />
          Dashboard
        </NavLink>
        <NavLink href="/admin/products">
          <AiOutlineTag size={16} />
          Products
        </NavLink>
        <NavLink href="/admin/orders">
          <AiOutlineShopping size={16} />
          Orders
        </NavLink>
      </Nav>
      <div className="p-4">{children}</div>
    </div>
  );
}