export const _apiBase = "https://rickandmortyapi.com/api";

export function getCorrectURL(url) {
    const isFullUrl = url.startsWith("http");
    return isFullUrl ? url : `${_apiBase}/${url}`;
}

export async function getResource(url) {
    const fullUrl = getCorrectURL(url);
    const res = await fetch(fullUrl);
    if (!res.ok) {
        throw new Error(`Could not fetch ${fullUrl}, status: ${res.status}`);
    }
    return await res.json();
}

export function showName(info) {
    const arr = Object.keys(info);
    return arr.map(element => {
        return element[0].toUpperCase() + element.slice(1);
    });
}

export function showLink(data) {
    const arr = Object.values(data)
    return arr.map((el) => {
        return el.match(/([a-z]*)$/gm)[0];
    });
}

export function showId(url) {
    return url.match(/([0-9]*)$/gm)[0]
}

export function showDisplayName(url) {
    return url.match(/\b\w{7,9}\b/gm)[0]
}


