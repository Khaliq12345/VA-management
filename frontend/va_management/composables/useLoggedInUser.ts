// Accessing the Connected User
export const useAuth = () => {
  const loggedInUser = ref({
    name: 'Mary Joy Daet', 
    email: 'mary_joy_daet@cuhvet.com', 
    loginTime: new Date(),
    shiftTimeFrom: new Date(),
    shiftTimeTo: new Date(),
    access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3OTBjZmU1NC1hODY3LTRiZmMtOTg2Yy1iM2FmNjRjODc1YzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MDg4NTk4LCJpYXQiOjE3NDYwODQ5OTgsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0NjA4NDk5OH1dLCJzZXNzaW9uX2lkIjoiNzk3ZjNhNjItMTE0Ny00MGQ5LTk3YzQtMjYxOTcxNjBmZjkwIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.WetMufG0-BPsWnLl0uJ4QOsq-U-7_uvTdwJJD0LTOcY',    
    refresh_token: 'eecwpt66ewhy'
  });

  return {
    loggedInUser
  }
}