let _accessToken = '';

export const setAccessToken = (accessToken: string) => {
    _accessToken = accessToken;
}

export const getAccessToken = () => {
    return _accessToken;
}