from fastapi import FastAPI, HTTPException, Form, Query
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
    "john_doe": {"password": "secret123", "friends": ["Alice", "Bob"]},
    "alice_smith": {"password": "password123", "friends": ["John", "Bob"]},
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

@app.post("/check_friend")
async def check_friend(username: str = Form(...), friend_name: str = Form(...)):
    # Check if the username exists in the dummy data
    if username not in dummy_users:
        raise HTTPException(
            status_code=401,
            detail="Invalid username",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Check if the friend_name exists in the user's friends array
    if friend_name not in dummy_users[username]["friends"]:
        raise HTTPException(
            status_code=404,
            detail="Friend not found",
        )

    # Friend found
    return {"friend_exists": True}

@app.get("/get_friends_list")
async def get_friends_list(username: str = Query(...)):
    if username not in dummy_users:
        raise HTTPException(
            status_code=401,
            detail="Invalid username",
            headers={"WWW-Authenticate": "Bearer"},
        )
    friends = dummy_users[username]["friends"]

    # Creating a list of dictionaries with unique keys for each friend
    friends_with_keys = [{"id": idx + 1, "name": friend} for idx, friend in enumerate(friends)]

    return {"friends": friends_with_keys}