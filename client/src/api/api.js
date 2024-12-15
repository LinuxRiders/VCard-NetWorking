const BASE_URL = import.meta.env.VITE_SERVER;


// --------------------- SECTION ASISTENCIA -----------------------

// export const sendEmailRequest = async (data) =>
//     await fetch(`${BASE_URL}/api/register/sendmail`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });

// export const createUserVoucherRequest = async (data, file) => {
//     // Leer el archivo como base64
//     const reader = new FileReader();

//     return new Promise((resolve, reject) => {
//         reader.onloadend = async () => {
//             const base64File = reader.result.split(',')[1]; // Obtener solo la parte base64

//             // Agregar el archivo codificado en base64 al objeto de datos
//             const payload = {
//                 ...data,
//                 file: base64File,
//                 fileType: file.type
//             };

//             try {
//                 const response = await fetch(`${BASE_URL}/api/register/userVoucher`, {
//                     method: 'POST',
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(payload)
//                 });

//                 resolve(response);
//             } catch (error) {
//                 reject(error);
//             }
//         };

//         reader.onerror = () => reject(new Error('Error al leer el archivo.'));

//         reader.readAsDataURL(file); // Leer el archivo como data URL
//     });
// };
