/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import authService from "@/appwrite/auth"
import envconf from "../envconf"
import { useRouter } from "next/navigation"
import ShowUser from "./ShowUser"
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [userId, setUserId] = useState(null)
  const [secret, setSecret] = useState(null)

  useEffect(() => {
    const URLparams = new URLSearchParams(window.location.search);
    setUserId(URLparams.get("userId"));
    setSecret(URLparams.get("secret"));
  }, [router])

  useEffect(() => {
    if (userId && secret) {
      const userVarify = async () => {
        await authService.confirmEmailVerification(userId, secret);
        console.log("varified");
        router.push("/");
      };
      userVarify();
    }
  }, [userId, secret]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        {envconf.appwriteUrl}
        <ShowUser />
      </h1>
    </main>
  )
}
