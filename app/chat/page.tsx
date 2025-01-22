import Image from "next/image"

export default function Chat(){
    return (
      <div className="text-lg flex flex-col items-center justify-center h-screen font-bold  text-text">
      <h2 className="text-left text-4xl my-4">Add a Firend </h2>
      <p className="text-base text-gray-400 mb-4">To have a converstion / chat with the friend</p>
      <button className="bg-primary hover:bg-accent font-medium text-base text-text rounded-full px-6 py-2">Add friend</button>
    </div>
    )
}