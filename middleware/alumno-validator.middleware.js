const alumnoValidator = (req, res, next) => {
    if (!req.body) return next()

    const { nombre, apellido, email, isActive } = req.body
    const error = []

    if (nombre !== undefined && typeof nombre !== 'string') {
        error.push("No se ingreso un caracter valido para el campo 'nombre'")
    }

    if (apellido !== undefined && typeof apellido !== 'string') {
        error.push("No se ingreso un caracter valido para el campo 'apellido'")
    }

    if (email !== undefined && typeof email !== 'string') {
        error.push("No se ingreso un caracter valido para el campo 'email'")
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
        error.push("No se ingreso un caracter valido para el campo 'isActive'")
    }

    if (error.length > 0) {
        return res.status(400).json({
            msg: 'Datos de peticion invalidos',
            error
        })
    }

    next()
}

module.exports = { alumnoValidator }