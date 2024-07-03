import Table from 'react-bootstrap/Table';

const TableStriped = (info:any) => {
    
    let {userInfo} =info['userInfo']

    return(
    <>
        {
            userInfo?.map((e:any)=>{
                let {id,name,username} = e
                return(
                    <div className="row d-flex justify-content-center">
                        <div className="col-10 mt-5">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>id usuario</th>
                                        <th>Nombre</th>
                                        <th>Nombre de usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{username}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                )
            })
        }
    </>
    )
  }
  export default TableStriped;