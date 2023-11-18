import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { Righteous } from "next/font/google";
import styles from "./Logo.module.scss";

const righteous = Righteous({ weight: "400", subsets: ["latin"] });

type LogoProps = {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" className={cn(styles.logo, righteous.className, className)}>
      Jeex
    </Link>
  );
};
