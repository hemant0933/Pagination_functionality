// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // https://dummyjson.com/products
  const [product , setProduct] = useState([]);
  const [page,setPage] = useState(1);

  ///solution 2

  const [totalpage,setTotalPages] = useState(0);

  const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    //https://dummyjson.com/products?limit=10&skip=$(page*10-10)"
    const data = await res.json();
    if(data && data.products){
      setProduct(data.products);
      setTotalPages(data.total/10);

    }
      //  console.log(data.products);
  }
  useEffect(()=> {
    fetchData()
  },[])  //[page]

  const selectPageHandler= (selectedPage) =>{
    if(selectedPage >= 1 && selectedPage <= 10 && selectedPage !== page){
      setPage(selectedPage);
    }
   
  }

  return (
    <div className='main'>
      <h1 style={{textAlign:'center'}}>Product List</h1><br/>
      {
        product.length>0 && 
        <div className='pagination'>
        <span 
        onClick={() => selectPageHandler(page-1)}
        className={page > 1 ? "":"pagination__disable"}
        ><big>⬅️</big></span>
        {
          [...Array(product.length/10)].map((_,i)=>(
            <span 
            className={page === i+1 ? "activePage":""}
            onClick={()=>selectPageHandler(i+1)} 
            key={i}> {i+1} </span>
          ))
        } 
        <span 
        onClick={() => selectPageHandler(page+1)}
        className={page < product.length/10 ? "":"pagination__disable"}
        ><big>➡️</big></span>
      </div>
      }
      {
        product.length > 0 && <div className='product'>
         {
           product.slice(page * 10 - 10 ,page * 10).map((prod)=>(
            <div className='card' key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title}/>
              <p>{prod.title}</p>
            </div>
          ))
         }
        </div>
      }
    </div>
  );
}

export default App;
