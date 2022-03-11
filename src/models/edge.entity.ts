import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity, Index,
} from 'typeorm';

@Entity("edge", { schema: "public" })
export class Edge {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300 })
  node1Alias: string;

  @Column({ type: 'varchar', length: 300 })
  node2Alias: string;

  @Column({ type: 'int' })
  capacity: number;
}
