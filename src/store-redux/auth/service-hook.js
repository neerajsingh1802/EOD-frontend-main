import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { REDUCER_TYPES } from "..";
import REQUEST from "../api";
import { ENDPOINTS } from "../api/endpoint";
import ACTIONS from "./action-types";
import { REDUCER } from "./reducer";

export const APP_USER = "appUser";
export const APP_TOKEN = "appToken";

const setStorage = (data) => {
    localStorage.setItem(APP_USER, data);
};

const setToken = (token) => {
    localStorage.setItem(APP_TOKEN, token);
};

const removeStorage = () => {
    localStorage.removeItem(APP_USER);
};

const resolveResponse = (
    resp,
    successCb = () => { },
    successMsg = "",
    errorCb = () => { }
) => {
    const { data: resData, status } = resp;
    console.log(!!resData, "resData+++")
    if (!!resData || status === 200) {
        const { data, message } = resData;
        toast.success(message || successMsg);
        successCb(data || resData);
    }
    if (!resData && status !== 200) {
        console.log(resp);
        const { message } = resp;
        const error = message?.split("_")?.join(" ");
        toast.error(error || "Something might went wrong!");
        errorCb();
    }
};

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state[REDUCER_TYPES.AUTH]);

    const login = async (payload = {}) => {
        const body = {
            ...payload,
        };
        const onSuccess = (res) =>
            resolveResponse(
                res,
                (data) => {
                    setToken(data?.user.id);
                    dispatch(REDUCER[ACTIONS.LOGIN](data));
                    setTimeout(() => navigate("/", { replace: true }), 2000);
                },
                "Successfully logged In!"
            );

        const client = new REQUEST();
        await client.post(
            ENDPOINTS.LOGIN,
            body,
            { 'Content-Type': 'application/x-www-form-urlencoded' },
            onSuccess
        );
    };

    const register = async (payload = {}) => {
        const { firstName, lastName, email } = payload
        const body = {
            email,
        };
        const onSuccess = (res) =>
            resolveResponse(
                res,
                (_data) => {
                    dispatch(REDUCER[ACTIONS.REGISTER](payload));
                    setTimeout(() => {
                        navigate(`/verify-otp?email=${email}`, { replace: true });
                    }, 2000);
                },
                "We have sent an OTP to your email!"
            );

        const client = new REQUEST();
        const response = await client.post(
            ENDPOINTS.REGISTER,
            body,
            {},
            onSuccess
        );
        return response;
    };

    const createPassword = async (email, name, password) => {
        const body = {
            fullName: name,
            email,
            password: password,
        };

        const onSuccess = (resp) =>
            resolveResponse(
                resp,
                (data) => {
                    console.log(resp.headers)
                    dispatch(REDUCER[ACTIONS.CREATE_PASSWORD](data?.user?.id));
                    dispatch(REDUCER[ACTIONS.SET_COOKIE](resp.headers.get('Set-Cookie')));
                    setTimeout(() => navigate(`/register/fill-details`, { replace: true }), 2000);
                },
                "Password created successfully!"
            );

        const client = new REQUEST();
        const response = await client.post(
            `v1/user/signup`,
            body,
            {},
            onSuccess
        );
        return response;
    };

    const verifyOtp = async (otp, email) => {
        if (!email) {
            toast.error("Please provide an email!");
            return;
        }

        const body = { email, otp };
        const onSuccess = (res) =>
            resolveResponse(
                res,
                (data) => {
                    setStorage(data.user);
                },
                "Verification success!"
            );

        const client = new REQUEST();
        const response = await client.post(
            ENDPOINTS.REGISTER_OTP_VALIDATE,
            body,
            {},
            onSuccess
        );
        return response;
    };

    const forgotPassword = async (email) => {
        if (!email) {
            toast.error("Please provide an email!");
            return;
        }
        const onSuccess = (resp) =>
            resolveResponse(resp, (_data) => {

                setTimeout(
                    () =>
                        navigate(`/verify-otp?email=${email}&reset-password=true`, {
                            replace: true,
                        }),
                    2000
                );
            });
        const body = { email, language: state.language };
        const client = new REQUEST();
        const response = await client.post(
            ENDPOINTS.FORGOT_PASSWORD,
            body,
            {},
            onSuccess
        );
        return response;
    };

    const resetPassword = async (otp, email, password) => {
        const body = {
            otp,
            email,
            password: password.password,
            repeatedPassword: password.confirmPassword,
        };

        const onSuccess = (resp) =>
            resolveResponse(
                resp,
                (_data) => {
                    setTimeout(() => navigate(`/login`, { replace: true }), 2000);
                },
                "Password changed successfully!"
            );

        const client = new REQUEST();
        const response = await client.post(
            `v1/forget-password/reset-password`,
            body,
            {},
            onSuccess
        );
        return response;
    };

    const logout = async () => {


        const client = new REQUEST();
        await client.get(
            `logout`,
            { 'Content-Type': 'application/json' },
        );
        removeStorage();
        dispatch(REDUCER[ACTIONS.LOGOUT]());
        setTimeout(() => {
            window.location.replace("/login");
        }, 1000);
    };

    const updateUser = async (payload, id) => {
        const body = {
            ...payload,
        };
        const onSuccess = (res) =>
            resolveResponse(
                res,
                (data) => {
                    console.log("updated")
                },
                "You have successfully updated your details!"
            );

        const client = new REQUEST();
        await client.put(
            `v1/user/${id}`,
            body,
            { 'Content-Type': 'application/json' },
            onSuccess
        );
    }

    const updateCompany = async (payload, id) => {
        const body = {
            companyType: payload.companyType,
            name: payload.companyName,
            ownership: payload.ownership,
            contactNumber: payload.phone1,
            emailDomain: payload.domain,
            // address: payload.address,
            // country: payload.country,
            // state: payload.state,
            // city: payload.city,
            // pincode: payload.pincode,

        };
        const onSuccess = (res) =>
            resolveResponse(
                res,
                (data) => {
                    setTimeout(() => navigate(`/`, { replace: true }), 2000);
                },
                "You have successfully Updated Company Details!"
            );

        const client = new REQUEST();
        await client.put(
            `v1/company`,
            body,
            { 'Content-Type': 'application/json' },
            onSuccess
        );
    }

    const accountTypeSelection = (val) => {
        dispatch(REDUCER[ACTIONS.SET_ACCOUNT_TYPE](val));
    };

    return {
        state,
        login,
        register,
        createPassword,
        logout,
        verifyOtp,
        forgotPassword,
        resetPassword,
        updateUser,
        updateCompany,
        accountTypeSelection
    };
};

export default useAuth;
