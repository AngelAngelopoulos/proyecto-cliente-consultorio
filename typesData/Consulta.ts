export interface Consulta {
    "_id": string,
    "numero_turno": number,
    "consultorio": Consultorio,
    "medico": Medico,
    "prioridad": string,
    "fecha": string,
    "hora": string,
    "paciente": string,
    "is_active": boolean
}

export interface Consultorio {
    "_id": string,
    "direccion": string,
    "telefono": string,
    "nombre": string,
    "medicos": Medico[]
}

export interface Medico {
    "_id": string,
    "especialidad": string,
    "telefono": string,
    "nombre": string,
}

export interface Paciente {
    "_id": string,
    "nombre": string,
    "telefono": string,
    "edad": number
}
