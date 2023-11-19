import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { RoomParticipantModel } from './roomParticipant.model'

@Entity()
export class RoomModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'sid' })
  sid!: string

  @Column({ name: 'chat_id' })
  chatId!: string

  @Column({ name: 'name' })
  name!: string

  @OneToMany(() => RoomParticipantModel, (participant) => participant.room)
  participants!: RoomParticipantModel[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date
}
