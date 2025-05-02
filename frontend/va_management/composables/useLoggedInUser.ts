// Accessing the Connected User
export const useAuth = () => {
  const loggedInUser = ref({
    name: 'Mary Joy Daet', 
    email: 'mary_joy_daet@cuhvet.com', 
    loginTime: new Date(),
    shiftTimeFrom: new Date(),
    shiftTimeTo: new Date(),
    access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3OTBjZmU1NC1hODY3LTRiZmMtOTg2Yy1iM2FmNjRjODc1YzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MTczNDQ2LCJpYXQiOjE3NDYxNjk4NDYsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0NjE2OTg0Nn1dLCJzZXNzaW9uX2lkIjoiNGM1MDUyODktMWQ5Ny00MWRmLTg3Y2QtNjAwNjYwNzFkMjAxIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.kSmR2x7W49h2P_amHzWWnvLt9h75SSC9dR9ozqFxTdg',    
    refresh_token: 'ixobgkjsyyaz'
  });

  return {
    loggedInUser
  }
}