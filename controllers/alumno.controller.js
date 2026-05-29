const fs = require('fs').promises
const { json } = require('stream/consumers')
const { AlumnoModel } = require('../models/alumno.model.ts')
const { eventLoopUtilization } = require('perf_hooks')


const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el datalle del alumno con legajo n° ${legajo}`
    })
  }
}

const postNewAlumno = async (req, res) => {
  try{
    const { nombre, apellido, email } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf-8')
    const alumnos = JSON.parse(data)

    console.log('Se parseó la información a "alumnos"')

    const legajos = alumnos.map((alumno) => alumno.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1

    console.log(`Nuevo legajo generado: ${nuevoLegajo}`)

    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)

    console.log(nuevoAlumno)
    const alumnoNuevo = nuevoAlumno.getAlumnoAllAtributes()
    alumnos.push(alumnoNuevo)
    console.log(nuevoAlumno.getAlumnoAllAtributes())

    fs.writeFile('./data/alumnos.js', JSON.stringify(alumnoNuevo, null, 2), 'utf-8')

    return res.status(200).json({
      msg: `Se agrego al sistema el nuevo alumno con el legajo n° ${nuevoLegajo}`
    })
    } catch (error) {
      return res.status(500).json({
        error: `No se pudo dar de alta el alumno`
      })
    }
}

const putAlumnoByLegajo = async(req, res) => {
  const { legajo } = req.params
  try {
    const {nombre, apellido, email, isActive} = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf-8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex((alumno) => alumno.legajo === Number(legajo))

    if (index === -1){
      return res.status(404).json({
        msg: `No se encontro el alumno con legajo n° ${legajo}`
      })
    }

    const alumnoEncontrado = alumnos[index]

    const alumnoModificado = new AlumnoModel(
      alumnoEncontrado.legajo,
      alumnoEncontrado.nombre,
      alumnoEncontrado.apellido,
      alumnoEncontrado.email,
      alumnoEncontrado.fechaAlta,
      alumnoEncontrado.modificacion,
      alumnoEncontrado.isActive
    )

    if (nombre) { 
      alumnoEncontrado.setNombre(nombre) 
    }
    if (apellido) { 
      alumnoEncontrado.SetApellido(apellido) 
    }
    if (email) { 
      alumnoEncontrado.setEmail(email) 
    }
    if (isActive) { 
      alumnoEncontrado.SetIsActive(isActive) 
    }

    const alumnoModificadoJson = alumnoModificado.getAllAttributes

    fs.writeFile('./data/alumnos.json', json.stringify(alumnoModificadoJson, null, 2))

    return res.status(200).json({
      msg: `Se modifico correctamente el alumno con legajo n° ${legajo}`
    })

  } catch (error) {
    return res.status(500).json({
      error: `No se pudieron modificar los datos del alumno con legajo n° ${legajo}`
    })
  }
}

const deleteAlumnoByLegajo = async(req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/alumnos.json', 'utf-8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex(
      (alumnos) => alumno.legajo === Number(legajo)
    )

    if (index === -1){
      return res.status(404).json({
        msg: `No se encontro el alumno con legajo n° ${legajo}`
      })
    }

    return res.status(200).json({
      msg: `Se elimino correctamente el alumno con el legajo n° ${alumnoEncontrado.legajo}`,
      alumno: alumnoEncontrado
    })

  } catch (error) {

  }
}

module.exports = { getAlumnoAll, getAlumnoById, postNewAlumno, putAlumnoByLegajo, deleteAlumnoByLegajo}
