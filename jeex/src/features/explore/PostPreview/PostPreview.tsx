"use client";
import { FC } from "react";
import { AspectRatio } from "@radix-ui/themes";
import { Person, User } from "@/components/User/User";
import { PlayStat } from "@/components/PlayStat/PlayStat";
import { Like } from "@/components/Like/Like";
import styles from "./PostPreview.module.scss";

type PostPreviewProps = {
  title: string;
  tags: string[];
  user: Person; // TODO: Create own type for tags
};

export const PostPreview: FC<PostPreviewProps> = ({ title, tags, user }) => {
  return (
    <article className={styles.post}>
      <AspectRatio ratio={8 / 10.5} className={styles.media}>
        <div className={styles.stat}>
          <PlayStat count={23498} />
        </div>
      </AspectRatio>
      <footer className={styles.footer}>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
          <ul className={styles.tags}>
            {tags.map((tag, index) => (
              <li className={styles.tag} key={index}>
                <a href={`#${tag}`} className={styles.tagLink}>
                  #{tag}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.user}>
          <User
            nickName={user.nickName}
            photoUrl={user.photoUrl}
            to={`/user/${user.nickName}`}
          />
        </div>
        <div className={styles.likes}>
          <Like count={2356} />
        </div>
      </footer>
    </article>
  );
};
