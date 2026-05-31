const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoByLegajo,
  deleteAlumnoByLegajo
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', postNewAlumno)
rutas.put('/:legajo', putAlumnoByLegajo)
rutas.delete('/:legajo', deleteAlumnoByLegajo)

module.exports = rutas