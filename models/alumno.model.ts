import { PersonaModel } from './persona.model'

export class AlumnoModel extends PersonaModel {
  constructor(
    nombre: string,
    apellido: string,
    email: string,
    private legajo: number,
    private fechaAlta: string = new Date().toISOString().split('T')[0],
    private modificacion: string = new Date().toISOString().split('T')[0],
    private isActive: boolean = true
  ) {
    super(nombre, apellido, email)
    this.legajo = legajo
    this.fechaAlta = fechaAlta
    this.modificacion = modificacion
    this.isActive = isActive
  }

  public getLegajo(): number {
    return this.legajo
  }

  public getIsActive(): boolean {
    return this.isActive
  }

  public setIsActive(status: boolean): void {
    this.isActive = status
  }

  public getModificacion(): string {
    return this.modificacion
  }

  public setModificacion(date: string): void {
    this.modificacion = date
  }

  public override getAllAttributes(): {
    legajo: number
    nombre: string
    apellido: string
    email: string
    fechaAlta: string
    modificacion: string
    isActive: boolean
  } {
    return {
      legajo: this.legajo,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
