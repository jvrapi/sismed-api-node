import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Funcionario from './SismedFuncionario';
import Laboratorio from './SismedLaboratorio';
import Paciente from './SismedPaciente';

@Entity('sismed_endereco', { schema: 'macmassc_sismed' })
export default class SismedEndereco {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'cep', nullable: true, length: 10 })
  cep: string | null;

  @Column('varchar', { name: 'logradouro', nullable: true, length: 255 })
  logradouro: string | null;

  @Column('smallint', { name: 'numero', nullable: true })
  numero: number | null;

  @Column('varchar', { name: 'complemento', nullable: true, length: 45 })
  complemento: string | null;

  @Column('varchar', { name: 'bairro', nullable: true, length: 45 })
  bairro: string | null;

  @Column('varchar', { name: 'cidade', nullable: true, length: 45 })
  cidade: string | null;

  @Column('varchar', { name: 'estado', nullable: true, length: 2 })
  estado: string | null;

  @OneToMany(
    () => Funcionario,
    (Funcionario) => Funcionario.endereco,
  )
  funcionarios: Funcionario[];

  @OneToMany(
    () => Laboratorio,
    (Laboratorio) => Laboratorio.endereco,
  )
  laboratorios: Laboratorio[];

  @OneToMany(() => Paciente, (Paciente) => Paciente.endereco)
  pacientes: Paciente[];
}
