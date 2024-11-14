```

const [ data, setData] =useState([])
const [ loading, setLoading] =useState(false)

useEffect(()=>{
  fetchData()
  window.addEventListener("scroll", handleScroll);
  return ()=> window.removeEventListener("scroll", handleScroll);
},[])

function handleScroll(){
  if(window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    fetchData();
  }
} 

const fetchData= async ()=>{
   setLoading(false)
   const res = await fetch("url")
   const data = await res.json()
   setLoading(false)
   setdata( prevState => [...preState, ...data])
}

```