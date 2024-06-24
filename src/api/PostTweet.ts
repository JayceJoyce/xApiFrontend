import axios from 'axios' 
    export const setNewTweet = async (tweet:string) =>{
        let res = await axios.post('http://localhost:8080/tweet',{'tweet':tweet});
        let data = res
        return data
    }