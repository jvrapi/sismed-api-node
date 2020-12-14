import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import SismedFuncionario from './SismedFuncionario';

@Entity('sismed_perfil', { schema: 'macmassc_sismed' })
export default class SismedPerfil {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'descricao', length: 45 })
  descricao: string;

  @OneToMany(
    () => SismedFuncionario,
    (sismedFuncionario) => sismedFuncionario.perfil,
  )
  sismedFuncionarios: SismedFuncionario[];
}
