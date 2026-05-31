const fs = require('fs').promises

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo === Number(legajo)
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
      error: 'No se pudo obtener el detalle del alumno'
    })
  }
}

const postNewAlumno = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const legajos = alumnos.map((alumno) => alumno.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1

    const nuevoAlumno = {
      legajo: nuevoLegajo,
      nombre,
      apellido,
      email,
      fechaAlta: new Date().toISOString().split('T')[0],
      modificacion: new Date().toISOString().split('T')[0],
      isActive: true
    }

    alumnos.push(nuevoAlumno)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(201).json({
      msg: 'Alumno creado correctamente',
      alumno: nuevoAlumno
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo crear el alumno'
    })
  }
}

const putAlumnoByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params
    const { nombre, apellido, email, isActive } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex(
      (alumno) => alumno.legajo === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el alumno con legajo ${legajo}`
      })
    }

    if (nombre) alumnos[index].nombre = nombre
    if (apellido) alumnos[index].apellido = apellido
    if (email) alumnos[index].email = email
    if (isActive !== undefined) alumnos[index].isActive = isActive

    alumnos[index].modificacion =
      new Date().toISOString().split('T')[0]

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: 'Alumno modificado correctamente',
      alumno: alumnos[index]
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo modificar el alumno'
    })
  }
}

const deleteAlumnoByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex(
      (alumno) => alumno.legajo === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el alumno con legajo ${legajo}`
      })
    }

    const alumnoEliminado = alumnos[index]

    alumnos.splice(index, 1)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: 'Alumno eliminado correctamente',
      alumno: alumnoEliminado
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo eliminar el alumno'
    })
  }
}

module.exports = {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoByLegajo,
  deleteAlumnoByLegajo
}