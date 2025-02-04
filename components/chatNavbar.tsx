'use client'
import Image from "next/image";
type User = {
  user?: string; 
  avatar?: string;
};

export default function ChatNavbar(props: User) {
  return (
    <div className="navbar py-2 border-b bg-transparent border-gray-600">
      <div className="flex items-center">
      <div className="px-1">
                    <Image
                      src={props.avatar || "/image/user.png"}
                      alt={`Profile picture of ${props.user}`}
                      width={40}
                      height={40}
                      className="object-cover w-12 h-12 rounded-full overflow-hidden"
                    />
                  </div>
        <a className="btn btn-ghost text-xl">{props.user}</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost"></button>
      </div>
    </div>
  );
}
