export function extractSessionCookies(cookieStr: string): {session: string, sig: string} {
    const cookies = cookieStr.split(","); // ["session=dfgh; path=/; httponly", "session.sig=hjkl; path=/"]
    const retObj: any = { session: null, sig: null };
    for (const cookie of cookies) {
        const split = cookie.split(";"); // ["session=dfgh", "path=/", "httponly"]
        const nameValue = split[0]; // "session=dfgh"
        const nameValueSplit = nameValue.split("="); // ["session", "dfgh"]
        if (nameValueSplit[0].trim() === "session") {
            retObj.session = nameValueSplit[1].trim();
        } else if (nameValueSplit[0].trim() === "session.sig") {
            retObj.sig = nameValueSplit[1].trim();
        }
    }
    return retObj;
}
