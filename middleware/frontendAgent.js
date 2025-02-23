// const axios = require('axios');

// class FrontendAgent {
//     constructor(baseURL) {
//         this.api = axios.create({ baseURL });
//         this.generatedAPIs = {};
//     }

//     async discoverAPIs() {
//         try {
//             const response = await this.api.get('/api/discover');
//             this.generatedAPIs = response.data.routes.reduce((acc, route) => {
//                 acc[route.name] = async (data = {}) => {
//                     return this.api.post(route.path, data);
//                 };
//                 return acc;
//             }, {});

//             console.log("✅ Discovered APIs:", this.generatedAPIs);
//         } catch (error) {
//             console.error("❌ Error discovering APIs:", error.message);
//         }
//     }

//     async callAPI(apiName, data = {}) {
//         if (!this.generatedAPIs[apiName]) {
//             throw new Error(`API '${apiName}' not found. Please call discoverAPIs() first.`);
//         }
//         try {
//             const response = await this.generatedAPIs[apiName](data);
//             return response.data;
//         } catch (error) {
//             return { error: error.response?.data || "API request failed" };
//         }
//     }
// }

// // ✅ Initialize Agent & Discover APIs
// const frontendAgent = new FrontendAgent("http://localhost:5001");

// // Ensure discovery happens before API calls
// frontendAgent.discoverAPIs().then(() => {
//     console.log("✅ API discovery completed.");
// }).catch(err => console.error("❌ API discovery failed:", err));

// const sendRequestToMiddleware = async (apiName, data) => {
//     return frontendAgent.callAPI(apiName, data);
// };

// module.exports = { frontendAgent, sendRequestToMiddleware };

import axios from 'axios';

class FrontendAgent {
    constructor(baseURL) {
        this.api = axios.create({ baseURL });
        this.generatedAPIs = {};
    }

    async discoverAPIs() {
        try {
            const response = await this.api.get('/api/discover');
            this.generatedAPIs = response.data.routes.reduce((acc, route) => {
                acc[route.name] = async (data = {}) => {
                    return this.api.post(route.path, data);
                };
                return acc;
            }, {});

            console.log("✅ Discovered APIs:", this.generatedAPIs);
        } catch (error) {
            console.error("❌ Error discovering APIs:", error.message);
        }
    }

    async callAPI(apiName, data = {}) {
        if (!this.generatedAPIs[apiName]) {
            throw new Error(`API '${apiName}' not found. Please call discoverAPIs() first.`);
        }
        try {
            const response = await this.generatedAPIs[apiName](data);
            return response.data;
        } catch (error) {
            return { error: error.response?.data || "API request failed" };
        }
    }
}

// ✅ Initialize Agent & Discover APIs
const frontendAgent = new FrontendAgent("http://localhost:5001");

// Ensure discovery happens before API calls
frontendAgent.discoverAPIs()
    .then(() => console.log("✅ API discovery completed."))
    .catch(err => console.error("❌ API discovery failed:", err));

const sendRequestToMiddleware = async (apiName, data) => {
    return frontendAgent.callAPI(apiName, data);
};

// 🔹 Use ES Module Export
export { frontendAgent, sendRequestToMiddleware };

