import { FC, PropsWithChildren } from "react";
import { Header } from "@/features/headline/Header/Header";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {};

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};
