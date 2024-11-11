import { useEffect } from 'react';
import { UseUser } from '../../hooks/useUser';
import TableStriped from '../../components/TableStriped';
import axios from 'axios';
export const getUsuario = async () =>{
    let res = await axios.post('https://api.instagram.com/oauth/authorize?client_id=997693215052207&redirect_uri=https://jaycejoyce.github.io/JayceJoycePage/&scope=user_profile,user_media&response_type=code');
    let data = res
    return data
}

const Instagram = ()=> {
    let {thisUser,user} = UseUser()

    useEffect(() => {
        getUsuario()
        thisUser()
      }, [])


    return(
        <>
            <TableStriped userInfo={{userInfo:user}} />
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-5">
                <div className="row">
                    <div className="col-4">
                        {/*  */}
                    </div>
                    <div className="col-8">
                        {/*  */}
                    </div>
                </div>
                </div>
            </div>
          
        </>
    )
}

export default Instagram;