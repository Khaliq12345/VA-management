// Accessing the Connected User

export const useAuth = () => {
  // const loggedInUser = ref();

  const loggedInUser = useState('loggedInUser', ()=> {return {
    name: 'Mary Joy Daet', 
    email: 'mary_joy_daet@cuhvet.com', 
    loginTime: new Date(),
    shiftTimeFrom: new Date(),
    shiftTimeTo: new Date(),
    access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3OTBjZmU1NC1hODY3LTRiZmMtOTg2Yy1iM2FmNjRjODc1YzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MjYzOTgyLCJpYXQiOjE3NDYyNjAzODIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0NjI2MDM4Mn1dLCJzZXNzaW9uX2lkIjoiMTBjNjNkNDctMTJlYi00YTk2LTk0NDQtMjczYmFkNjZiM2U3IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.TslxqlnYkhr4xvp7OIilzTbEpzsI-NMyUDeDBI4Zsu0',    
    refresh_token: 'ywaahhq7axre'
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