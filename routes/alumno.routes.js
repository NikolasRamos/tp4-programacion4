const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoByLegajo,
  deleteAlumnoByLegajo
} = require('../controllers/alumno.controller')
const { alumnoValidator } = require('../middleware/alumno-validator.middleware')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', alumnoValidator, getAlumnoById)
rutas.post('/', alumnoValidator, postNewAlumno)
rutas.put('/:legajo', alumnoValidator, putAlumnoByLegajo)
rutas.delete('/:legajo', alumnoValidator, deleteAlumnoByLegajo)

module.exports = rutas
