import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {client} from "../client";
import MasonryLayout from "./MansonryLayout";
import { searchQuery ,feedQuery} from '../utils/data';
import Spinner from "./Spinner"
function Feed() {
    const [loading,setLoading]=useState(false)
    const [pins,setPins]=useState(null)
    const {categoryId}=useParams();

    useEffect(() => {
        setLoading(true)

        if(categoryId){
            const query = searchQuery(categoryId);
            client.fetch(query)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })

        }
        else{
            client.fetch(feedQuery)
            .then((data)=>{
                console.log(data,"checking data")
                setPins(data)
                setLoading(false);

            })

        }
    }, [categoryId]);
    if(loading) return <Spinner message="We are adding new ideas to your feed" />
    if(!pins?.length) return <h2>No pins available</h2>
  return (
    <div>
    {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed