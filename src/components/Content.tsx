import { loginWithDiscord } from "../App";


export const Content = () => {
    return (
      <div className="relative flex flex-col lg:flex-row min-h-screen w-full">
        {/* 左カラム（テキスト部分） */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-16 lg:py-0">
          <div className="max-w-lg">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              ゲームをプレイするすべてのユーザーへ
              <br className="hidden md:block" />
              To all users playing the game
            </h2>
            <p className="mb-5 text-base text-gray-700 md:text-lg">
              This is a web service that retrieves game play history from Discord activity and displays it.
            </p>
            <div className="mb-10 text-center md:mb-16 lg:mb-20">
                <button onClick={loginWithDiscord} className="rounded-full bg-blue-500 transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white h-10 leading-1 mt-2">ログインはこちら</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-sm text-gray-600 md:mb-2">Follow us</div>
              <div className="flex items-center space-x-4">
                {/* SNS アイコン略 */}
              </div>
            </div>
          </div>
        </div>
  
        {/* 右カラム（画像部分） */}
        <div className="w-full lg:w-1/2">
          <img
            className="object-cover w-full h-56 md:h-96 lg:h-full"
            src="./title.webp"
            alt=""
          />
        </div>
      </div>
    );
  };
  