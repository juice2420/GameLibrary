import {useNavigate} from "react-router-dom";
import '../index.css'

export const PageHeader = () => {
  const navigate = useNavigate();
  const onCLickPage1 = () => {
    navigate("/Page1");
  }
    return (
      <>
          <div className="relative mx-4 mb-6 flex items-center justify-between gap-6 pt-2">
              <div className="absolute inset-0 flex justify-center md:static">ロゴ</div>
              <div className="ml-auto flex gap-2">
                  <button onClick={onCLickPage1}>Page1へ</button>
                  <button onClick={onCLickPage1}>Page2へ</button>
                  <button onClick={onCLickPage1}>Page3へ</button>
                  <button onClick={onCLickPage1} className="bg-pink-500">ログアウト</button>
              </div>
              
          </div>
     </>

    )
}