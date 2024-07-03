import { useEffect } from 'react';
import { UseUser } from '../../hooks/useUser';
import TableStriped from '../../components/TableStriped';

const Instagram = ()=> {
    let {thisUser,user} = UseUser()

    useEffect(() => {
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