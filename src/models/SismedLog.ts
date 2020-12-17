import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Funcionario from './SismedFuncionario';

@Entity('sismed_log', { schema: 'macmassc_sismed' })
export default class SismedLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'funcionario_id' })
  funcionarioId: number;

  @Column('date', { name: 'data' })
  data: string;

  @Column('time', { name: 'hora' })
  hora: string;

  @Column('varchar', { name: 'descricao', nullable: true, length: 255 })
  descricao: string;

  @Column('varchar', { name: 'evento', nullable: true, length: 50 })
  evento: string;

  @ManyToOne(
    () => Funcionario,
    (Funcionario) => Funcionario.logs,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: Funcionario;
}
