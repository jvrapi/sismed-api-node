import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Funcionario from './SismedFuncionario';

@Entity('sismed_perfil')
export default class SismedPerfil {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'descricao', length: 45 })
  descricao: string;

  @OneToMany(
    () => Funcionario,
    (Funcionario) => Funcionario.perfil,
  )
  funcionarios: Funcionario[];
}
