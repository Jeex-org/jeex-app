import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { RoomParticipantModel } from './roomParticipant.model'

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'address' })
  address!: string

  @OneToMany(() => RoomParticipantModel, (participant) => participant.user)
  roomParticipant!: RoomParticipantModel[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date
}
