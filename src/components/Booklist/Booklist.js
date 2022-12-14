import "./booklist.css";
import React,{useState, useEffect} from 'react'
import { useLocation, useParams, Link } from "react-router-dom";

const Booklist = () => {
    // Const[list, setList] = useState([]); 
    const [list,  setList] = useState([]);
    // const {name} = useParams();

    const callapi = async () => {
    
        const res = await fetch(`http://localhost:8003/getbooks/`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(res)
    
        const data = await res.json();
        console.log(data);
    
        if (res.status === 422 || !data) {
            console.log("error ");
    
        } else {
            setList(data)
            console.log("get data");
            console.log(setList(data))
    
        }
    
    }

    const searchHandle = async(event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:8003/search/${key}`);
            result = await result.json();
            if(result){
                setList(result) 
            }

        }
        else{
            callapi();
        }
       

    }
    useEffect(() => {
        callapi();
        
    }, [])
  return (
    <div>
          <>
        <div className='bg-light'>
        <div className='search-box'>
            <input type="text" placeholder="Search Books" onChange ={searchHandle}/>
            </div>
        <div className="flex-box" data-aos="fade-up">
            <div className="row">
            <div class="row gy-5">
        {
        //  list && 
        list.length>0 ? list.map((item) => {
            return(
                <div className="col-3">
                <Link to={`/book/${item.book_id}`} class="glightbox">
                <img src={item.image} class="menu-img img-fluid image-max-height" alt=""/>
                <h4>{item.book_name}</h4>
                <h5>&#8377;{item.book_price}</h5>
                <h6> discountedprice &#8377;{item.discountedprice}</h6>
                </Link>
                    
                    </div>
                )
            }):<h1>No result found</h1>
        }
        </div>
        </div>
        
            </div>
            </div>
        </>
      
    </div>
  )
}

export default Booklist;
