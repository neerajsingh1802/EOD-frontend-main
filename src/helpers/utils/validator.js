export const EMAIL_VALIDATOR = "EMAIL_VALIDATOR";
export const PASSWORD_VALIDATOR = "PASSWORD_VALIDATOR";
export const REQUIRED_VALIDATOR = "REQUIRED_VALIDATOR";
export const CARD_VALIDATOR = "CARD_VALIDATOR";
export const CUSTOM_VALIDATOR = "CUSTOM_VALIDATOR";

const validate_email = (email) => {
    const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(format);
};

export const hasCapital = (str) => /[A-Z]/.test(str);
export const hasNumber = (str) => /[0-9]/.test(str);
export const minLength = (str, len) => str?.length >= len;
export const lengthValidator = (str, length) => str?.length === length;
export const hasSpecialChar = (str) =>
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);

export const Validate = (type, value, opt = false) => {
    switch (type) {
        case EMAIL_VALIDATOR: {
            if (!value || !value.trim()?.length) return "email is required";
            else if (!validate_email(value)) return "email is invalid";
            else return false;
        }
        case PASSWORD_VALIDATOR: {
            if (!value || !value.trim()?.length) return "password is required";
            else if (value.trim()?.length < 8)
                return "password should be of minimum 8 characters";
            else if (!hasCapital(value))
                return "password must include a capital letter!";
            else if (!hasNumber(value)) return "password must include a digit!";
            else if (!hasSpecialChar(value))
                return "password must include a special character!";
            else if (opt !== false && value !== opt)
                return "password do not match confirm password!";
            else return false;
        }
        case REQUIRED_VALIDATOR: {
            if (!value || (typeof value === "string" && !value.trim()?.length))
                return "this field is required";
            else return false;
        }
        case CARD_VALIDATOR: {
            if (!value || (typeof value === "string" && !value.trim()?.length))
                return "Card number is required";
            if (!lengthValidator(value, 16))
                return "Card number must contain 16 digits only!";
            else return false;
        }
        case CUSTOM_VALIDATOR: {
            if (opt) {
                const error = opt(value);
                return error;
            }
            return false;
        }
    }
};

export const newUser = () => {
    return Boolean(window.location.search.includes("new-user=true"));
};
