import { Token } from "@mui/icons-material";

const BASE_URL = "https://listyantidewi.pythonanywhere.com/";

// login
export async function login(username, password) {
    const response = await fetch("https://listyantidewi.pythonanywhere.com/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(Token)}`
         },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Login gagal!");
    return await response.json();
}

//register
export const register = async (userData) => {
    const response = await fetch("https://listyantidewi.pythonanywhere.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Gagal mendaftar");
    }

    return response.json();
};
