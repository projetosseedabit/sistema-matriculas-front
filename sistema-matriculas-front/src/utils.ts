function getCookieValue(name: string) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
        return match[2];
    }
}

export async function fetchWithToken(url: string, options: RequestInit = {}) {
    const token = getCookieValue("token");
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
}
