import NavbarTeacher from "@/components/NavbarTeacher";
import { ReactNode } from "react";

interface ILayoutAfterLogin {
  children: ReactNode;
}

export default function LayoutAfterLogin(props: ILayoutAfterLogin) {
  const { children } = props;
  return (
    <div>
      <NavbarTeacher />
      {children}
    </div>
  );
}
