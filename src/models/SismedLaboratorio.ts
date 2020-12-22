import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Exame from './SismedExame';
import Endereco from './SismedEndereco';
import LaboratorioTconvenio from './SismedLaboratorioTconvenio';

@Entity('sismed_laboratorio')
export default class SismedLaboratorio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'cnpj', unique: true, length: 14 })
  cnpj: string;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @Column('varchar', { name: 'responsavel', length: 45 })
  responsavel: string;

  @Column('varchar', { name: 'telefone_fixo', length: 10 })
  telefoneFixo: string;

  @Column('varchar', { name: 'email', nullable: true, length: 45 })
  email: string | null;

  @Column('int', { name: 'endereco_id' })
  enderecoId: number;

  @OneToMany(() => Exame, (Exame) => Exame.laboratorio)
  exames: Exame[];

  @ManyToOne(
    () => Endereco,
    (Endereco) => Endereco.laboratorios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true },
  )
  @JoinColumn([{ name: 'endereco_id', referencedColumnName: 'id' }])
  endereco: Endereco;

  @OneToMany(
    () => LaboratorioTconvenio,
    (LaboratorioTconvenio) => LaboratorioTconvenio.laboratorio,
  )
  LaboratorioTconvenios: LaboratorioTconvenio[];
}
