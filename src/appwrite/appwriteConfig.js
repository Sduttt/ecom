import envconf from '@/envconf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(envconf.appwriteUrl)
            .setProject(envconf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // USER FUNCTIONS

    // create user profile

    async createUser({ userId, name, email, address, pinCode, phoneNo, isAdmin }) {
        try {
            return await this.databases.createDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteUsersCollectionId,
                userId,
                {
                    name,
                    email,
                    address,
                    pinCode,
                    phoneNo,
                    isAdmin
                }
            )
        } catch (error) {
            throw error;
        }

    }

    // update user profile

    async updateUser(userId,
        {
            name,
            email,
            address,
            pinCode,
            phoneNo,
            isAdmin
        }) {
        try {
            return this.databases.updateDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteUsersCollectionId,
                userId,
                {
                    name,
                    email,
                    address,
                    pinCode,
                    phoneNo,
                    isAdmin
                }
            )
        } catch (error) {
            throw error;
        }


    }

    // delete user profile

    async deleteUser(userId, isDeleted) {
        try {
            await this.databases.updateDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteUsersCollectionId,
                userId,
                isDeleted
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    // get user profile

    async getUser(userId, isDeleted) {
        try {
            return await this.databases.getDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteUsersCollectionId,
                userId, isDeleted
            )
        } catch (error) {
            throw error;
        }
    }

    // BOOK FUNCTONS


    // create book

    async createBook(data) {
        try {
            console.log("Creating book with data: ", data);
            const result = await this.databases.createDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteBooksCollectionId,
                ID.unique(),
                data
            );
            console.log("Book created with result: ", result);
            return result;
        } catch (error) {
            console.error("Error in createBook: ", error);
            throw error;
        }
    }
    // update book

    async updateBook(bookId,
        {
            Title,
            author,
            publisher,
            stock,
            mrp,
            price,
            isUsed,
            isHardcover,
            language,
            gener,
            description,
            img1,
            img2,
            img3,
            timeStamp,
            adminId
        }) {
        try {
            return await this.databases.createDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteBooksCollectionId,
                bookId,
                {
                    Title,
                    author,
                    publisher,
                    stock,
                    mrp,
                    price,
                    isUsed,
                    isHardcover,
                    language,
                    gener,
                    description,
                    img1,
                    img2,
                    img3,
                    timeStamp,
                    adminId

                }
            )
        } catch (error) {
            throw error;
        }

    }


    // get book

    async getBook(bookId) {
        try {
            return await this.databases.getDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteBooksCollectionId,
                bookId
            )
        } catch (error) {
            throw error;
        }
    }

    // delete book

    async deleteBook(bookId) {
        try {
            await this.databases.deleteDocument(
                envconf.appwriteDatabaseId,
                envconf.appwriteBooksCollectionId,
                bookId
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    // async getBooks(queries = [Query.equal('status', 'active')]) {
    //     try {
    //         return await this.databases.listDocuments(
    //             envconf.appwriteDatabaseId,
    //             envconf.appwriteUsersCollectionId,
    //             queries
    //         )
    //     } catch (error) {
    //         throw error;
    //     }
    // }


    // get books
    // TODO: THIS WAS GENERATED BY AI, SO VARIFY IT

    async getBooks({ gener, language, stock }) {
        try {
            const query = {
                $and: []
            };

            if (gener) {
                query.$and.push({ gener });
            }

            if (language) {
                query.$and.push({ language });
            }

            if (stock) {
                query.$and.push({ stock });
            }

            return await this.databases.listDocuments(
                envconf.appwriteDatabaseId,
                envconf.appwriteBooksCollectionId,
                query
            );
        } catch (error) {
            throw error;
        }
    }


    // file upload services


    async uploadFile(file) {
        try {
            console.log("Uploading file: ", file);
            const result = await this.bucket.createFile(
                envconf.appwriteBucketID,
                ID.unique(),
                file,
            );
            console.log("File uploaded with result: ", result);
            return result;
        } catch (error) {
            console.error("Error in uploadFile: ", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                envconf.appwriteBucketID,
                fileId
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    getFile(fileId) {
        try {
            return this.bucket.getFilePreview(
                envconf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            throw error;
        }

    }

}

const service = new Service();
export default service;