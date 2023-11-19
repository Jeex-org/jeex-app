import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import { RoomModel } from './room.model'

@Entity()
export class RoomParticipantModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'token' })
  token!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'room_id' })
  roomId!: number

  @ManyToOne(() => RoomModel, (room) => room.participants)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room!: RoomModel

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date
}
