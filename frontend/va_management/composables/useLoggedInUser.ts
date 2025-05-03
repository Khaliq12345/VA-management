// Accessing the Connected User

export const useAuth = () => {
  // const loggedInUser = ref();

  const loggedInUser = useState('loggedInUser', ()=> {return {
    name: '', 
    email: '', 
    loginTime: '',
    shiftTimeFrom: "",
    shiftTimeTo: "",
    access_token: '',    
    refresh_token: ''
  }});

  // Function to update the state
  const updateLoggedInUserInfos = (newValue: any) => {
    loggedInUser.value = newValue;
  };

  // Return the reactive state and the update function
  return {
    loggedInUser,
    updateLoggedInUserInfos,
  };
}