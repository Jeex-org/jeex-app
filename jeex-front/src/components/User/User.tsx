import { FC } from "react";
import cn from "classnames";
import { Avatar } from "@radix-ui/themes";
import styles from "./User.module.scss";

export type Person = {
  nickName: string;
  fullName?: string;
  photoUrl?: string;
  to?: string;
  isOnline?: boolean;
  isVerified?: boolean;
  size?: "small" | "medium" | "large";
};

type UserProps = Person & {
  className?: string;
};

export const User: FC<UserProps> = ({
  className,
  size = "medium",
  nickName,
  fullName,
  photoUrl,
  isOnline,
  isVerified,
}) => {
  const AvatarImg = () => {
    return <Avatar size="2" src={photoUrl} fallback="AT" radius="full" />;
  };

  return (
    <div className={cn(styles.user, className)}>
      <div className={styles.avatar}>
        <AvatarImg />
      </div>
      <div className={styles.info}>
        <div className={styles.nickName}>{nickName}</div>
        {fullName && <div className={styles.fullName}>{fullName}</div>}
      </div>
    </div>
  );
};
