from fastapi import FastAPI, HTTPException, Form, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

app = FastAPI()

origins = [
    "http://localhost:3000",  # Add your frontend's URL here
    "http://localhost:3001",  # Add more origins if needed
    "https://verdant-flan-0f6f3e.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data for user authentication
college_checkpoints = [
    "Create a resume",
    "Fill out FAFSA",
    "Prepare for standardized tests",
    "Research colleges",
    "Request letters of recommendation",
    "Write college essays",
    "Submit college applications",
    "Apply for scholarships",
    "Plan college visits",
    "Finalize college decision"
]

dummy_users = {
    "john_doe": {
        "password": "secret123",
        "friends": [
            {
                "name": 'Jim',
                "progress": '20%'
            },
            {
                "name": 'Bob',
                "progress": '10%'
            }
        ],
        "checkpoints": college_checkpoints
    },
    "test_new_user" : {
        "checkpoints" : college_checkpoints
    },
    "alice_smith": {"password": "password123", "friends": ["John", "Bob"]},
    "Manav": {"progress": "20%"}
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
    if friend_name not in dummy_users:
        raise HTTPException(
            status_code=401,
            detail="Invalid username",
            headers={"WWW-Authenticate": "Bearer"},
        )

    dummy_users[username]["friends"].append({
        "name": friend_name,
        "progress": dummy_users[friend_name]["progress"],
    })
    # Friend found
    return {"userName": friend_name, "progress": dummy_users[friend_name]["progress"]}

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

@app.get("/get_checkpoints")
async def get_checkpoints(username: str = Query(...)):
    if username not in dummy_users:
        raise HTTPException(
            status_code=401,
            detail="Invalid username",
            headers={"WWW-Authenticate": "Bearer"},
        )
    checkpoints = dummy_users[username].get("checkpoints", [])
    return {"checkpoints": checkpoints}

@app.post("/add_checkpoint")
async def add_checkpoint(username: str = Form(...), new_checkpoint: str = Form(...)):
    # Check if the username exists in the dummy data
    if username not in dummy_users:
        raise HTTPException(
            status_code=401,
            detail="Invalid username",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Add the new checkpoint to the user's checkpoints
    dummy_users[username]["checkpoints"].append(new_checkpoint)

    # Return the updated checkpoints list
    return {"checkpoints": dummy_users[username]["checkpoints"]}

@app.post("/complete_checkpoint")
async def complete_checkpoint(username: str = Form(...), checkpoint: str = Form(...)):
    try:
        # Check if the username exists in the dummy data
        if username not in dummy_users:
            raise HTTPException(
                status_code=401,
                detail="Invalid username",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Check if the provided checkpoint exists in the user's checkpoints array
        if checkpoint not in dummy_users[username]["checkpoints"]:
            raise HTTPException(
                status_code=404,
                detail="Checkpoint not found",
            )

        # Remove the checkpoint from the user's checkpoints array
        dummy_users[username]["checkpoints"].remove(checkpoint)

        # Return success response
        return {"message": "Checkpoint completed successfully"}

    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/complete_checkpoint")
async def complete_checkpoint(data: Dict[str, str]):
    try:
        # Extract username and checkpoint from the request data
        username = data.get("username")
        checkpoint = data.get("checkpoint")

        # Check if the username exists in the dummy data
        if username not in dummy_users:
            raise HTTPException(
                status_code=401,
                detail="Invalid username",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Check if the provided checkpoint exists in the user's checkpoints array
        if checkpoint not in dummy_users[username]["checkpoints"]:
            raise HTTPException(
                status_code=404,
                detail="Checkpoint not found",
            )

        # Remove the checkpoint from the user's checkpoints array
        dummy_users[username]["checkpoints"].remove(checkpoint)

        # Return success response
        return {"message": "Checkpoint completed successfully"}

    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(status_code=500, detail=str(e))