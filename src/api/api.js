export const BASEURL = "http://localhost:5000/";


export function setSession(sesName, sesValue, expDays) {
    let D = new Date();
    D.setTime(D.getTime() + expDays * 86400000);
    document.cookie = `${sesName}=${sesValue};expires=${D.toUTCString()};path=/;secure`;
}

// Generic API call function
export function callApi(reqmethod, url, data) {
    let options = {
        method: reqmethod,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
    };

    if (reqmethod === "POST" || reqmethod === "PUT") {
        options.body = data; 
    }

    console.log("API Request:", { url, options }); 77

    return fetch(url, options)
        .then(response => {
            if (!response.ok) throw new Error(response.status + ": " + response.statusText);
            return response.json(); 
        })
        .then(data => {
            console.log("API Response:", data); 
            return data;
        })
        .catch(error => {
            console.error("API Error:", error.message);
            throw error;
        });
}


export function forgotPassword(email, responseHandler) {
    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    let data = JSON.stringify({ emailid: email });
    callApi("POST", `${BASEURL}user/forgotpassword`, data)
        .then(responseHandler)
        .catch(error => {
            alert("API Error: " + error.message);
        });
}


export function login(email, password) {
    let data = JSON.stringify({ emailid: email, password });
    return callApi("POST", `${BASEURL}user/login`, data);
}


export function signup(name, email, password) {
    let data = JSON.stringify({ name, emailid: email, password });
    return callApi("POST", `${BASEURL}user/signup`, data);
}
