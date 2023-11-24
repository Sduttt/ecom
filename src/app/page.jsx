// "use client";
import envconf from "../envconf"

import ShowUser from "./ShowUser"
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        {envconf.appwriteUrl}
        <ShowUser />
      </h1>
    </main>
  )
}
