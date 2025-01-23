import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";

const chatData: Chat[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Sala de Jantar",
    text: "Rafaela Souza",
    time: 12,
    textCount: 3,
    dot: 3,
    last: '7 dias',
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Escritório de Advocacia",
    text: "Julia Zabava",
    time: 12,
    textCount: 0,
    dot: 1,
    last: '13 dias'
  }
];

const NextDeliver = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Próximas Entregas:
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white decoration-solid">
                  {chat.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {chat.text}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-black text-danger">
                  {" Vence em "}
                  {chat.last}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NextDeliver;
