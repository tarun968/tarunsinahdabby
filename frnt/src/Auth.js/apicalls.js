// import {REACT_APP_SERVER_URL} from '../../'
export const signup = (Email,Name,Password) => {
    // console.log("user data ",user)
    return fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({Email,Name,Password})
    }).then(response => {
        return response.json()
    }
    ).catch(err => console.log("err", err))
}

export const signin = (Name, Password) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({Name,Password})
    }).then(response => {
        return response.json()
    }
    ).catch(err => console.log("err", err))
}

export const authenticate = (data, next) => {
    console.log('data',data)
    if (typeof window !== 'undefined') {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("jwt")
        next();
    }
    return fetch(`${process.env.REACT_APP_SERVER_URL}/signout`, {
        method: 'POST'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined'){
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}