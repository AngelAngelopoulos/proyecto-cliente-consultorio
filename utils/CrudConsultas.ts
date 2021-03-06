import {Consulta} from "../typesData/Consulta";

const URL = "https://secret-eyrie-09393.herokuapp.com/api"

/**
 * Nos regresa todas las consultas guardadas en el backend
 */
export const getAllConsultas = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const res = await fetch(
        `${URL}/consultas?include=consultorio.medico`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

/**
 * Nos permite cambiar la prioridad de la consulta
 */
export const changePrioridad = async (id: string, prioridad: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({prioridad: prioridad})
    };

    const res = await fetch(
        `${URL}/consultas/${id}/prioridad`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

/**
 * Nos regresa todas los consultorios guardados en el backend
 */
export const getAllConsultorios = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const res = await fetch(
        `${URL}/consultorios/?include=medicos`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

/**
 * Nos permite crear una consulta en el sistema
 */
export const createConsulta = async (consultorio: string,
                                     medico: string,
                                     paciente: string,
                                     prioridad: string,
                                     fecha: string,
                                     hora: string
) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
            consultorio,
            medico,
            paciente,
            prioridad,
            fecha,
            hora
        })
    };

    const res = await fetch(
        `${URL}/consultas`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

/**
 * Nos permite cambiar el status de la consulta en el backend
 */
export const changeConsultaStatus = async (id: string, is_active: boolean) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({is_active})
    };

    const res = await fetch(
        `${URL}/consultas/${id}/state`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

/**
 * Nos permite obtener los datos especificos de un paciente
 */
export const getPaciente = async() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const res = await fetch(
        `${URL}/pacientes/61a96e70e191436a733d4da7`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}
