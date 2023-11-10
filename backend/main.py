from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Add your frontend's URL here
    "http://localhost:3001",  # Add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data for user authentication
dummy_users = {
    "john_doe": {"password": "secret123"},
    "alice_smith": {"password": "password123"},
}

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    # Check if the username exists in the dummy data
    if username not in dummy_users:
        raise HTTPException(
            status_code=401,
            detail="Invalid username",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Check if the provided password matches the stored password
    if password != dummy_users[username]["password"]:
        raise HTTPException(
            status_code=401,
            detail="Invalid password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Successful login
    return JSONResponse(content={"message": "Login successful"}, status_code=200)

