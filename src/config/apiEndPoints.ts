const apiEndPoints = {
    "auth": {
        login: {
            url: "/auth/login",
            method: "POST"
        },
        refresh: {
            url: "/auth/refresh",
            method: "POST"
        },
        logout: {
            url: "/auth/logout",
            method: "POST"
        },
        me: {
            url: "/auth/me",
            method: "GET"
        }
    },
    "jobSources": {
        list: {
            url: "/job-sources",
            method: "GET"
        },
        addSources: {
            url: "/job-sources",
            method: "POST"
        },
        "telegram": {
            connectViaQR: {
                url: "/telegram/auth/qr",
                method: "GET"
            },
            availableSources: {
                url: "/telegram/sources/available",
                method: "GET"
            },
            logout: {
                url: "/telegram/",
                method: "DELETE"
            }
        }
    }
}

export default apiEndPoints;