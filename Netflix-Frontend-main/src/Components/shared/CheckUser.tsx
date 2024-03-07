import { useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../Context/user';
import Cookies from 'js-cookie';
import { USER_SIGNOUT } from '@/Helpers/Actions';


const CheckUser=()=> {
    const { state:{userInfo} ,dispatch:ctxDispatch} = useContext(User);
    const token: string | undefined = Cookies.get('token');
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectURL=new URLSearchParams(search);
    const redirectValue=redirectURL.get("redirect");
    const redirect = redirectValue ?redirectValue:"/signin";
    useEffect(() => {
        if(!userInfo||!token){
          ctxDispatch({ type: USER_SIGNOUT })
          navigate(redirect)
        }
        }, [navigate,redirect,userInfo]);
  return (
    <></>
  )
}

export default CheckUser