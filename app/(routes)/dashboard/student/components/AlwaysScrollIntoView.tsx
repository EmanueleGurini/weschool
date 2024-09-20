import { useEffect, useRef } from "react";

const AlwaysScrollIntoView = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => elementRef?.current?.scrollIntoView());

  return <div ref={elementRef} className="-mt-6" />;
};

export default AlwaysScrollIntoView;
