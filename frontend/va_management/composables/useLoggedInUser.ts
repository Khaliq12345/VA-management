// Accessing the Connected User
export const useAuth = () => {
  const loggedInUser = ref({
    name: 'Mary Joy Daet', 
    email: 'mary_joy_daet@cuhvet.com', 
    loginTime: new Date(),
    shiftTimeFrom: new Date(),
    shiftTimeTo: new Date(),
    access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3MWYzYmZhOS04Nzk0LTQxMWItYTFmMy00M2RiNWExNzRjYTEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MjE3MTgzLCJpYXQiOjE3NDYyMTM1ODMsImVtYWlsIjoibWFyeV9qb3lfZGFldEBjdWh2ZXQuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDYyMTM1ODN9XSwic2Vzc2lvbl9pZCI6IjQ4MGU4YzE1LWJmZWMtNDU3Yy04N2U3LTNlODMyZTlhOWNmOSIsImlzX2Fub255bW91cyI6ZmFsc2V9.-ST7VwwMJ0HFuV3-dJbirRfYDwjW0DMVJuQ3OfJAVEk',    
    refresh_token: 'rukqxeaxdgyx'
  });

  return {
    loggedInUser
  }
}