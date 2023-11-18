"use client";

import { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "./QueryClientProvider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};
