# # # from fastapi import FastAPI
# # # from fastapi.middleware.cors import CORSMiddleware

# # # app = FastAPI()

# # # # Allow your React app's origin (e.g., http://localhost:3000)
# # # origins = [
# # #     "http://localhost:3000",
# # # ]

# # # app.add_middleware(
# # #     CORSMiddleware,
# # #     allow_origins=origins,       # List your allowed origins here
# # #     allow_credentials=True,
# # #     allow_methods=["*"],         # Allows all HTTP methods
# # #     allow_headers=["*"],         # Allows all headers
# # # )

# # # @app.get("/api/hello")
# # # async def hello():
# # #     return {"message": "Hello from FastAPI"}
# # # @app.get("/api/status")
# # # async def get_status():
# # #     return {"status": "Server is up and running"}
# # from fastapi import FastAPI, HTTPException # type: ignore
# # from pydantic import BaseModel # type: ignore
# # from fastapi.middleware.cors import CORSMiddleware # type: ignore
# # from fastapi import FastAPI, HTTPException, Depends, status
# # from pydantic import BaseModel
# # from fastapi.middleware.cors import CORSMiddleware
# # from sqlalchemy import create_engine, Column, Integer, String
# # from sqlalchemy.orm import sessionmaker, declarative_base, Session


# # app = FastAPI()

# # # Allow requests from your React app (running on http://localhost:3000)
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:3000"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # Hardcoded user credentials (for demo purposes)
# # hardcoded_users = {
# #     "op": "op",
# #     "alice": "mypassword"
# # }

# # # Pydantic model for the login request
# # class LoginRequest(BaseModel):
# #     username: str
# #     password: str

# # @app.post("/api/login")
# # async def login(request: LoginRequest):
# #     if request.username in hardcoded_users and hardcoded_users[request.username] == request.password:
# #         return {"message": "Login successful"}
# #     else:
# #         raise HTTPException(status_code=401, detail="Invalid credentials")
# # @app.get("/api/hello")
# # async def hello():
# #     return {"message": "Hello from FastAPI"}
# # @app.get("/api/status")
# # async def get_status():
# #     return {"status": "Server is up and running"}
# # @app.post("/api/register")
# # async def register(request: RegisterRequest, db: Session = Depends(get_db)):
# #     existing_user = db.query(User).filter(User.email == request.email).first()
# #     if existing_user:
# #         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
# #     new_user = User(name=request.name, email=request.email, password=request.password)
# #     db.add(new_user)
# #     db.commit()
# #     db.refresh(new_user)
# #     return {"message": "Registration successful", "name": new_user.name, "email": new_user.email}


# from fastapi import FastAPI, HTTPException, status
# from pydantic import BaseModel, EmailStr
# from fastapi.middleware.cors import CORSMiddleware
# import motor.motor_asyncio

# app = FastAPI()

# # Enable CORS for your React app
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Adjust if needed
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB connection settings using Motor
# MONGO_DETAILS = "mongodb://localhost:27017"
# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
# db = client.ai_chatbot_db  # Database name
# users_collection = db.get_collection("users")

# # Pydantic models for requests
# class LoginRequest(BaseModel):
#     email: EmailStr
#     password: str

# class RegisterRequest(BaseModel):
#     name: str
#     email: EmailStr
#     password: str

# # Utility function to get user by email
# async def get_user_by_email(email: str):
#     return await users_collection.find_one({"email": email})

# # Login endpoint
# @app.post("/api/login")
# async def login(request: LoginRequest):
#     user = await get_user_by_email(request.email)
#     if not user or user.get("password") != request.password:
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     return {"message": "Login successful", "name": user.get("name"), "email": user.get("email")}

# # Registration endpoint
# @app.post("/api/register")
# async def register(request: RegisterRequest):
#     user = await get_user_by_email(request.email)
#     if user:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
#     new_user = {
#         "name": request.name,
#         "email": request.email,
#         "password": request.password,  # For demo purposes; use hashed passwords in production.
#     }
#     result = await users_collection.insert_one(new_user)
#     created_user = await users_collection.find_one({"_id": result.inserted_id})
#     return {"message": "Registration successful", "name": created_user.get("name"), "email": created_user.get("email")}

# # Test endpoints
# @app.get("/api/hello")
# async def hello():
#     return {"message": "Hello from FastAPI using MongoDB"}

# @app.get("/api/status")
# async def get_status():
#     return {"status": "Server is up and running"}


from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
import bcrypt  # <-- Import bcrypt

app = FastAPI()

# Enable CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection settings using Motor
MONGO_DETAILS = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
db = client.ai_chatbot_db  # Database name
users_collection = db.get_collection("users")

# Pydantic models for requests
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

# Utility function to get user by email
async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

# Registration endpoint
@app.post("/api/register")
async def register(request: RegisterRequest):
    # Check if user already exists
    user = await get_user_by_email(request.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )
    
    # Hash the user's password with bcrypt
    # Note: bcrypt.hashpw() returns a bytes object, so we decode it to store in MongoDB
    hashed_password = bcrypt.hashpw(request.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = {
        "name": request.name,
        "email": request.email,
        "password": hashed_password,  # Store hashed password
    }

    result = await users_collection.insert_one(new_user)
    created_user = await users_collection.find_one({"_id": result.inserted_id})

    return {
        "message": "Registration successful",
        "name": created_user.get("name"),
        "email": created_user.get("email"),
    }

# Login endpoint
@app.post("/api/login")
async def login(request: LoginRequest):
    user = await get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Compare the provided password with the hashed password in the DB
    # The user.get("password") is the stored hash (string), so we need to encode it before comparing
    if not bcrypt.checkpw(request.password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "name": user.get("name"),
        "email": user.get("email"),
    }

# Test endpoints
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI using MongoDB"}

@app.get("/api/status")
async def get_status():
    return {"status": "Server is up and running"}
