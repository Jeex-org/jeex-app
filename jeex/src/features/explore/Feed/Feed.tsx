"use client";
import { FC, PropsWithChildren } from "react";
import styles from "./Feed.module.scss";

type FeedProps = {};

export const Feed: FC<PropsWithChildren<FeedProps>> = ({ children }) => {
  return <section className={styles.feed}>{children}</section>;
};
