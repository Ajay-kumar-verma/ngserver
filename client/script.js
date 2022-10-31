console.log("script is running ");

const fetchUsers = () => {
    axios
      .get('https://reqres.in/api/users')
      .then(response => {
        const users = response.data.data
        console.log(`GET list users`, users)
      })
      .catch(error => console.error(error))
  }
  
//   fetchUsers();



const signUp = () => {
    axios
      .post('http://www.localhost:3001/user',{
        FirstName:"Ajay shanme ",
        LastName:"soni",
        Email:"gss.com",
        Password:"12345" 
    })
      .then(response => {
        console.log("response is :",response)
        // const users = response.data.data
        // console.log(`GET list users`, users)
      })
      .catch(error => console.error(error))
  }
  
// signUp()


const login = () => {
    axios
      .post('http://www.localhost:3001/login',{
        Email:"gss.com",
        Password:"12345" 
    })
      .then(response => {
        console.log("response is :",response)
        localStorage.setItem("Token",response.data);
         })
      .catch(error => console.error("Error is :",error))
  }


// login();



const user = () => {
   const Token =localStorage.getItem('Token');
    axios
      .post('http://www.localhost:3001/user/info',{ Token})
      .then(response => {
        console.log("response is :",response)
         })
      .catch(error => console.error("Error is :",error))
  }

user();