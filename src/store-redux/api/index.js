import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const BASE_URL = "https://enterprise-ondemand.co.in/"

axios.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.err || 'Something went wrong!';
        toast.error(message);
        return Promise.reject(error);
    }
);


export const extractErrorMessage = (err) => {
    let message = err.message;
    if (err?.response?.data?.message) {
        const errorData = err?.response?.data;
        message = errorData.message;
        if (errorData.errors) {
            message = Object.values(errorData.errors)[0][0];
        }
        if (errorData.data) {
            message = Object.values(errorData.data)[0][0];
        }
    }
    return message;
};

export default class REQUEST {
    async get(route, headers = {}) {
        try {
            const response = await axios.get(BASE_URL + route, {
                headers: { Accept: "application/json", ...headers },
            });
            return !!response ? response : { status: "success" };
        } catch (err) {
            const { message } = err;
            toast.error(message || "Something might went wrong!");
            return err;
        }
    }

    async post(
        route,
        body,
        headers = {},
        onSuccess = () => { },
        onError = () => { },
        noToast
    ) {
        try {
            const response = await axios.post(BASE_URL + route, body, {
                headers: { accept: "application/json", ...headers },
            });
            onSuccess(response);
            return response;
        } catch (err) {
            let message = extractErrorMessage(err);
            !noToast && toast.error(message || "Something might went wrong!");
            const result = { error: true, message: message };
            onError(result);
            return result;
        }
    }

    async put(
        route,
        body,
        headers = {},
        onSuccess = () => { },
        onError = () => { },
        noToast
    ) {
        try {
            const response = await axios.put(BASE_URL + route, body, {
                headers: { Accept: "application/json", credentials: "include", ...headers },
            });
            onSuccess(response);
            return response;
        } catch (err) {
            let message = extractErrorMessage(err);
            !noToast && toast.error(message || "Something might went wrong!");
            const result = { error: true, message: message };
            onError(result);
            return result;
        }
    }

    async delete(
        route,
        body,
        headers = {},
        onSuccess = () => { },
        onError = () => { },
        noToast
    ) {
        try {
            const response = await axios.delete(BASE_URL + route, body, {
                headers: { Accept: "application/json", ...headers },
            });
            onSuccess(response);
            return response;
        } catch (err) {
            let message = extractErrorMessage(err);
            !noToast && toast.error(message || "Something might went wrong!");
            const result = { error: true, message: message };
            onError(result);
            return result;
        }
    }
}
