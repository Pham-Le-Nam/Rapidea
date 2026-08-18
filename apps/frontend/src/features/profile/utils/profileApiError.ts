export function getProfileApiErrorMessage(error: unknown, fallbackMessage: string) {
    const responseMessage = (error as {
        response?: { data?: { message?: string | string[] } };
    })?.response?.data?.message;

    if (Array.isArray(responseMessage)) {
        return responseMessage.join(". ");
    }

    if (responseMessage) {
        return responseMessage;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallbackMessage;
}
