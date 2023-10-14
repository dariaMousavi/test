export function setJWT(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt_token", token);
    }
}

export function getJWT() {
    let token = null;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("jwt_token");
    }

    return token;
}