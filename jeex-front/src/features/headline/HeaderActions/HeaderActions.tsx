'use client'
import { FC } from 'react'
import { Flex, Button } from '@radix-ui/themes'
import { Plus } from '@phosphor-icons/react'
import { HeaderUser } from '../HeaderUser/HeaderUser'
import styles from './HeaderActions.module.scss'

type HeaderActionsProps = {
  className?: string
}

export const HeaderActions: FC<HeaderActionsProps> = ({ className }) => {
  return (
    <div className={styles.actions}>
      <Button variant="outline" color="gray" className={styles.upload}>
        <Plus weight="bold" /> <span className={styles.uploadText}>Create room</span>
      </Button>

      <HeaderUser />
    </div>
  )
}
