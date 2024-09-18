import NavbarStudent from "@/components/NavbarStudent";
import { ReactNode } from "react";

interface ILayoutAfterLogin {
  children: ReactNode;
}

export default function LayoutAfterLogin(props: ILayoutAfterLogin) {
  const { children } = props;
  return (
    <div>
      <NavbarStudent />
      {children}
    </div>
  );
}
