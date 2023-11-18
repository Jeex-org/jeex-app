"use client";
import { FC } from "react";
import { Flex, Tooltip, IconButton, Button } from "@radix-ui/themes";
import { Envelope, PaperPlaneTilt, Plus } from "@phosphor-icons/react";
import { SupBadge } from "@/components/SupBadge/SupBadge";
import { HeaderUser } from "../HeaderUser/HeaderUser";
import styles from "./HeaderActions.module.scss";

type HeaderActionsProps = {
  className?: string;
};

export const HeaderActions: FC<HeaderActionsProps> = ({ className }) => {
  return (
    <Flex gap="2" align="center">
      <Button variant="outline" color="gray" className={styles.upload}>
        <Plus weight="bold" />{" "}
        <span className={styles.uploadText}>Create room</span>
      </Button>

      <Tooltip content="Messages">
        <IconButton size="3" radius="full" className={styles.button}>
          <PaperPlaneTilt />
        </IconButton>
      </Tooltip>

      <Tooltip content="Inbox">
        <IconButton size="3" radius="full" className={styles.button}>
          <Envelope />
          <SupBadge text="3" className={styles.badge} />
        </IconButton>
      </Tooltip>

      <HeaderUser />
    </Flex>
  );
};
