import swal from 'sweetalert2';

const alert_simple = (texto:string) => {
   swal.fire(
            {
                position: 'center',
                icon: 'success',
                title: texto,
                showConfirmButton: false,
                timer: 1500
            }
        )
}

export const ventana = (titulo:string,mensaje:string,tipo:any,reload:boolean = false) => {
    swal.fire(
        titulo,
        mensaje,
        tipo,
    ).then((res)=>{
        if(reload) window.location.reload()
     })
 }

 export const askUserWindow = async (question:string) =>{
    let isConfirmed = await swal.fire({
        title: question,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar"
    }).then((res)=>{
       return  res.isConfirmed
    })

    return isConfirmed

 }

export default alert_simple;