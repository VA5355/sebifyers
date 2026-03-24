class Logger {
    constructor(apiEndpoint, tokenEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.tokenEndpoint = tokenEndpoint;
        this.timeoutId = null;
        this.isOnline = navigator.onLine;
        this.setupNetworkListeners();
        this.checkStoredTokenExpiration();
    }

    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    checkStoredTokenExpiration() {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const tokenParts = token.split('.');
                const payload = JSON.parse(atob(tokenParts[1]));
                const expirationTime = payload.exp * 1000;
                const currentTime = Date.now();

                if (currentTime >= expirationTime) {
                    this.resetAccessToken();
                } else {
                    const timeUntilExpiration = expirationTime - currentTime;
                    this.setExpirationTimeout(timeUntilExpiration);
                }
            } catch (error) {
                this.resetAccessToken();
            }
        }
    }

    setExpirationTimeout(timeUntilExpiration) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            this.resetAccessToken();
        }, timeUntilExpiration);
    }

    async resetAccessToken() {
        localStorage.removeItem('access_token');
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    async getAccessToken() {
        try {
            let token = localStorage.getItem('access_token');
            if (token) {
                // Verify token hasn't expired
                const tokenParts = token.split('.');
                const payload = JSON.parse(atob(tokenParts[1]));
                const expirationTime = payload.exp * 1000;

                if (Date.now() >= expirationTime) {
                    await this.resetAccessToken();
                    return await this.generateToken();
                }
                return token;
            } else {
                return await this.generateToken();
            }
        } catch (error) {
            console.error('Error retrieving access token:', error);
            throw error;
        }
    }

    async generateToken() {
        if (!this.isOnline) {
            return;
        }

        try {
            const response = await fetch(this.tokenEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Token generation error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem('access_token', token);

            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const expirationTime = payload.exp * 1000;
            const timeUntilExpiration = expirationTime - Date.now();

            this.setExpirationTimeout(timeUntilExpiration);

            return token;
        } catch (error) {
            console.error('Failed to generate token:', error);
            throw error;
        }
    }

    async sendLog(logType, msg, fyId) {
        if (!this.isOnline) {
            return;
        }

        const logPayload = this.createLogPayload(logType, msg, fyId);
        let token;

        try {
            token = await this.getAccessToken();
        } catch (error) {
            console.error('Failed to get access token:', error);
            return;
        }

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(logPayload),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    await this.resetAccessToken();
                    if (this.isOnline) {
                        try {
                            token = await this.generateToken();
                            return await this.sendLog(logType, msg, fyId);
                        } catch (tokenError) {
                            console.error('Failed to regenerate token:', tokenError);
                            return;
                        }
                    }
                }
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            if (!this.isOnline) {
                return;
            }
            console.error('Failed to send log:', error);
        }
    }

    async logError(msg, fyId) {
        await this.sendLog('ERROR', msg, fyId).catch(err => console.error('Error while sending log:', err));
    }
    async logDebug(msg, fyId) {
        await this.sendLog('DEBUG', msg, fyId).catch(err => console.error('Error while sending log:', err));
    }
    async logFatal(msg, fyId) {
        await this.sendLog('FATAL', msg, fyId).catch(err => console.error('Error while sending log:', err));
    }
    async logWarn(msg, fyId) {
        await this.sendLog('WARN', msg, fyId).catch(err => console.error('Error while sending log:', err));
    }
    async logInfo(msg, fyId) {
        await this.sendLog('INFO', msg, fyId).catch(err => console.error('Error while sending log:', err));
    }

    createLogPayload(logType, msg, fyId) {
        const payload = {
            log: {
                msg
            },
            logType,
            fyId: fyId || "",
        };
        return payload;
    }
}

const logApiEndpoint = 'https://api-t1.fyers.in/fe_hwk_logs/log';
const tokenApiEndpoint = 'https://api-t1.fyers.in/fe_hwk_logs/generate-token';

const logger = new Logger(logApiEndpoint, tokenApiEndpoint);