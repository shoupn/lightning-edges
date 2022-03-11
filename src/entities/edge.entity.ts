import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity("edge", { schema: "public" })
export class Edge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  node1Alias: string;

  @Column({ type: 'varchar', length: 300 })
  node2Alias: string;

  @Column({ type: 'int' })
  capacity: number;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
