import envconf from '@/envconf';
import { Client, Account, ID } from 'appwrite';


export class AuthService {
    client = new Client();
    account;

    constructor() {

        this.client
            .setEndpoint(envconf.appwriteUrl)
            .setProject(envconf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // return this.login({ email, password });
                const session = await this.account.createEmailSession(email, password);
                const url = envconf.appURL;
                const result = await this.account.createVerification(url);
                if (result) {
                    console.log(result)
                    return session;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
 
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async getUser(id) {
        try {
            const user = await this.account.get(id);
            return user
        } catch (error) {
            throw error;
        }
        return null;
    }

    async createEmailVarification() {
        try {
            const url = envconf.appURL;
            return await this.account.createVerification(url);
        } catch (error) {
            throw error;
        }
        return null;
    }
    async confirmEmailVerification(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            throw error;
        }
        return null;
    }

    async passwordRecovery(email, url){
        try {
            return await this.account.createRecovery(email, url);
        } catch (error) {
            throw error;
        }
        return null;
    }

    async passwordReset(userId, secret, password, passwordAgain){
        try {
            return await this.account.updateRecovery(userId, secret, password, passwordAgain);
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;
