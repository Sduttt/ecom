const envconf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID),
    appwriteBooksCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_BOOKS_COLLECTION_ID),
    appwriteBucketID: String(process.env.NEXT_PUBLIC_APPWRITE_BOOKIMG_BUCKET_ID),
    appURL: String(process.env.NEXT_PUBLIC_APP_URL),
}    

export default envconf;