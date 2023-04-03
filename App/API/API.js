import axios from "axios";
import {SERVER_HOST as host} from "@env";

async function otp(phone) {
    url = host + "/otp";
    let response;

    await axios.post(url, {
        phone: phone
    }, {
        timeout: 5000
    })
    .then((res) => {
        response = res.status;
    })
    .catch((error) => {
        console.log(error);
    })

    return response;
}

async function validate(phone, otp) {
    url = host + "/login";
    let response;

    await axios.post(url, {
        phone: phone,
        otp: otp
    }, {
        timeout: 5000
    })
    .then((res) => {
        response = [res.status, res.data];
    })
    .catch((error) => {
        response = [error.response.status];
    })

    return response;
}

async function authenticateLogin(loginID, sessionID) {
    url = host + "/authenticate";
    let response;

    await axios.post(url, {
        loginID,
        sessionID
    }, {
        timeout: 5000
    })
    .then((res) => {
        response = res.status;
        return;
    })
    .catch((error) => {
        response = error.response.status;
    })

    return response;
}

async function registerUser(fname, lname, email, loginID, sessionID) {
    url = host + "/signup/user";
    let response;

    await axios.post(url, {
        fname,
        lname,
        email,
        loginID,
        sessionID
    }, {
        timeout: 5000
    })
    .then((res) => {
        if (res) {
            response = res.status;
        }
        return;
    })
    .catch((error) => {
        response = error.response.status;
    })

    return response;
}

async function getSpaces() {
    url = host + "/spaces";
    let response;

    await axios.get(url)
    .then((res) => res.data)
    .then((res) => {
        response = res;
        return;
    })
    .catch((error) => {
        console.log(error);
    })

    return response;
}

export { otp, validate, authenticateLogin, registerUser, getSpaces };