// Accessing the Connected User
export const useAuth = () => {
  const loggedInUser = ref({
    name: 'Mary Joy Daet', 
    email: 'mary_joy_daet@cuhvet.com', 
    loginTime: new Date(),
    shiftTimeFrom: new Date(),
    shiftTimeTo: new Date(),
    access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3OTBjZmU1NC1hODY3LTRiZmMtOTg2Yy1iM2FmNjRjODc1YzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MDI3ODIxLCJpYXQiOjE3NDYwMjQyMjEsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0NjAyNDIyMX1dLCJzZXNzaW9uX2lkIjoiMWY5NTQ5YTktNjczNi00YjY2LWIwMDItNTAwZGRiNGVlYjIwIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.7_YWl3OmPeSc-kYncomXHMHM3IiUePEJi94XqQnjeJg',
    refresh_token: 'etqsoxaodb5q'
  });

  return {
    loggedInUser
  }
}