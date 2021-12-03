

export interface Consulta {
    "_id": string,
    "numero_turno": number,
    "consultorio": Consultorio,
    "medico": Medico,
    "prioridad": string,
    "fecha": string,
    "hora": string,
    "paciente": string,
}

export interface Consultorio {
    "_id": string,
    "direccion": string,
    "telefono": string,
    "nombre": string,
}

export interface Medico {
    "_id": string,
    "especialidad": string,
    "telefono": string,
    "nombre": string,
}
