import {useNavigate} from "react-router-dom";
import '../index.css'
import logo from "../assets/react.svg"
import {logout} from "../App.tsx"

type Image = {
  imageUrl : string; 
}

export const PageHeader = ({imageUrl} : Image) => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  }

  const onCLickPage1 = () => {
    navigate("/Page1");
  }

  const onClickPage2 = () => {
    navigate("/Page2");
  }


    return (
      <>
          <div className="relative mx-4 mb-6 flex items-center justify-between gap-6 pt-2 border-b-4 border-gray-200 pb-3">
            <img src={logo} className="absolute inset-0 flex justify-center md:static" alt="ロゴ"/>
              <p className="text-4xl font-bold font-sans" >GameLibrary</p>
              <div className="ml-auto flex gap-5">
                  <button onClick={onClickHome} className ="rounded-full bg-blue-500 transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white h-10 leading-1 mt-2">Home</button>
                  <button onClick={onCLickPage1} className ="rounded-full bg-blue-500 transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white h-10 leading-1 mt-2">About</button>
                  <button onClick={onClickPage2} className ="rounded-full bg-blue-500 transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white h-10 leading-1 mt-2">Intro</button>
                  <button onClick={logout} className="rounded-full bg-pink-500 hover:bg-red-700 text-white transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 h-10 leading-1 mt-2">ログアウト</button>
                  <img src={imageUrl} alt="avatar" width={50}  className="rounded-full shadow-md"/>
              </div>
              
          </div>
     </>

    )
}