import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedExame from './SismedExame';
import SismedEndereco from './SismedEndereco';
import SismedLaboratorioTconvenio from './SismedLaboratorioTconvenio';

@Entity('sismed_laboratorio', { schema: 'macmassc_sismed' })
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

  @OneToMany(() => SismedExame, (sismedExame) => sismedExame.laboratorio)
  sismedExames: SismedExame[];

  @ManyToOne(
    () => SismedEndereco,
    (sismedEndereco) => sismedEndereco.sismedLaboratorios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'endereco_id', referencedColumnName: 'id' }])
  endereco: SismedEndereco;

  @OneToMany(
    () => SismedLaboratorioTconvenio,
    (sismedLaboratorioTconvenio) => sismedLaboratorioTconvenio.laboratorio,
  )
  sismedLaboratorioTconvenios: SismedLaboratorioTconvenio[];
}
