export const getError = (error: any) => {
    return error.message && error.response.data.message ? error.response.data.message : error.message
}
