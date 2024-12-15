const BASE_URL = import.meta.env.VITE_SERVER;


export const getDataUser = async (data) =>
    await fetch(`${BASE_URL}/api/user/getData`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

