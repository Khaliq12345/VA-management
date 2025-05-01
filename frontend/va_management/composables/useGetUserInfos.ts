// Accessing the Connected User
export const useUserInfos = () => {
    const userInfos = useState('userInfos', ()=> {return {}});

  // Function to update the state
  const updateUserInfos = (newValue: Object) => {
    userInfos.value = newValue;
  };

  // Return the reactive state and the update function
  return {
    userInfos,
    updateUserInfos,
  };
  
  }