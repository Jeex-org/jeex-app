import { FC, PropsWithChildren } from "react";
import styles from "./ProtectContent.module.scss";

type ProtectContentProps = {};

export const ProtectContent: FC<PropsWithChildren<ProtectContentProps>> = ({
  children,
}) => {
  const address = "tmp-address";

  return (
    <>
      {!address ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>Please, connect wallet</h2>
            <div className={styles.wallet}>Wallet_BUTTON</div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
