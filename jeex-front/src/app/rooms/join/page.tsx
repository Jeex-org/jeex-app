'use client'
import { FC, useEffect } from 'react'
import cn from 'classnames'

type CreateRoomFormProps = {
  className?: string
}

export const JoinRoomLoader: FC<CreateRoomFormProps> = ({ className }) => {
  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 20000)).then(() => {})
  }, [])

  return (
    <div className={cn(className)}>
      <div>Creating...</div>
    </div>
  )
}

export default JoinRoomLoader
