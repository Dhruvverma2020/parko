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



export { otp, validate };