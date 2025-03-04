# from fastapi import FastAPI, HTTPException, status
# from pydantic import BaseModel, EmailStr
# from fastapi.middleware.cors import CORSMiddleware
# import motor.motor_asyncio
# import bcrypt
# import openai
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# if not OPENAI_API_KEY:
#     raise ValueError("❌ OpenAI API Key is missing! Set it in the .env file.")

# # Initialize FastAPI app
# app = FastAPI()

# # Enable CORS for React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Adjust for production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB Connection
# MONGO_DETAILS = "mongodb://localhost:27017"
# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
# db = client.ai_chatbot_db  # Database name
# users_collection = db.get_collection("users")

# # ---------------------- User Models ----------------------
# class RegisterRequest(BaseModel):
#     name: str
#     email: EmailStr
#     password: str

# class LoginRequest(BaseModel):
#     email: EmailStr
#     password: str

# class ChatRequest(BaseModel):
#     message: str
#     history: list = []  # New: Stores conversation history

# # ---------------------- Utility Functions ----------------------
# async def get_user_by_email(email: str):
#     """Fetch user from MongoDB by email."""
#     return await users_collection.find_one({"email": email})

# async def hash_password(password: str):
#     """Hash password using bcrypt."""
#     return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# async def verify_password(password: str, hashed_password: str):
#     """Verify provided password with stored hashed password."""
#     return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

# # ---------------------- Register API ----------------------
# @app.post("/api/register")
# async def register(request: RegisterRequest):
#     existing_user = await get_user_by_email(request.email)
#     if existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered"
#         )

#     hashed_password = await hash_password(request.password)

#     new_user = {
#         "name": request.name,
#         "email": request.email,
#         "password": hashed_password,
#     }

#     result = await users_collection.insert_one(new_user)
#     created_user = await users_collection.find_one({"_id": result.inserted_id})

#     return {
#         "message": "Registration successful",
#         "name": created_user.get("name"),
#         "email": created_user.get("email"),
#     }

# # ---------------------- Login API ----------------------
# @app.post("/api/login")
# async def login(request: LoginRequest):
#     user = await get_user_by_email(request.email)
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     if not await verify_password(request.password, user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     return {
#         "message": "Login successful",
#         "name": user.get("name"),
#         "email": user.get("email"),
#     }
# # Chatbot endpoint
# @app.post("/api/chat")
# async def chat_with_ai(request: ChatRequest):
#     try:
#         client = openai.OpenAI(api_key=OPENAI_API_KEY)  # Initialize OpenAI client

#         messages = [{"role": "system", "content": "You are a helpful AI assistant that gives detailed and human-like responses."}]
#         messages.extend(request.history)  # Add conversation history
#         messages.append({"role": "user", "content": request.message})  # Add new user input

#         response = client.chat.completions.create(
#             model="gpt-4",  # Use GPT-4 or GPT-3.5-turbo
#             messages=messages,
#             temperature=0.7,  # Adjust creativity
#             top_p=0.9,
#             max_tokens=500,  # Adjust max response length
#             frequency_penalty=0.2,
#             presence_penalty=0.3,
#         )

#         ai_response = response.choices[0].message.content
#         return {"response": ai_response}

#     except openai.OpenAIError as e:
#         raise HTTPException(status_code=500, detail=f"OpenAI API Error: {str(e)}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

# # ---------------------- Test Endpoints ----------------------
# @app.get("/api/hello")
# async def hello():
#     return {"message": "Hello from FastAPI"}

# @app.get("/api/status")
# async def get_status():
#     return {"status": "Server is up and running"}


##2

# from fastapi import FastAPI, HTTPException, status
# from pydantic import BaseModel, EmailStr
# from fastapi.middleware.cors import CORSMiddleware
# import motor.motor_asyncio
# import bcrypt  # <-- Import bcrypt
# from dotenv import load_dotenv
# import os
# from pymongo import MongoClient
# from langchain_community.llms import OpenAI
# from langchain_community.vectorstores import Chroma
# from langchain_community.embeddings import OpenAIEmbeddings
# from langchain.chains import ConversationalRetrievalChain
# from langchain_community.chat_message_histories import MongoDBChatMessageHistory
# from langchain_community.document_loaders import TextLoader
# from langchain.memory import ConversationBufferMemory
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# import uuid

# # from langchain_community.llms import OpenAI  # REMOVE THIS
# from transformers import pipeline

# app = FastAPI()

# # Load environment variables from .env file
# load_dotenv()

# # TODO: uncomment for the openAI Version
# # # Access the OpenAI API key
# # openai_api_key = os.getenv("OPENAI_API_KEY")

# # # Print to verify (for debugging, remove in production)
# # print(f"OpenAI API Key: {openai_api_key[:5]}... (loaded successfully)")

# # # Vector Store (ChromaDB for embedding retrieval)
# # embedding_model = OpenAIEmbeddings()
# # vector_store = Chroma(persist_directory="chroma_db", embedding_function=embedding_model)

# # # LangChain LLM
# # llm = OpenAI(temperature=0.7)

# # Load a local LLM from Hugging Face (Google's flan-t5-large)
# llm_pipeline = pipeline("text2text-generation", model="google/flan-t5-large")

# class LocalLLM:
#     def __init__(self, pipeline):
#         self.pipeline = pipeline

#     def generate(self, prompt):
#         response = self.pipeline(prompt, max_length=200, truncation=True)
#         return response[0]["generated_text"]

# # Create an instance of the Local LLM
# llm = LocalLLM(llm_pipeline)

# session_id = str(uuid.uuid4())  # Generates a unique session ID
# print(session_id)

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


# # Chat Memory (MongoDB)
# # chat_memory = MongoDBChatMessageHistory(connection_string=MONGO_DETAILS, database_name="chatbot_db", collection_name="chat_history", session_id=session_id)
# mongo_chat_history = MongoDBChatMessageHistory(
#     connection_string=MONGO_DETAILS,
#     database_name="chatbot_db",
#     collection_name="chat_history",
#     session_id=session_id
# )

# chat_memory = ConversationBufferMemory(
#     memory_key="chat_history",
#     chat_memory=mongo_chat_history,
#     return_messages=True
# )

# # TODO: uncomment for the openAI Version
# # # Conversational RAG Chain
# # retriever = vector_store.as_retriever()
# # qa_chain = ConversationalRetrievalChain.from_llm(
# #     llm=llm,
# #     retriever=retriever,
# #     memory=chat_memory
# # )
# # Conversational RAG Chain (Updated for Local LLM)
# # retriever = vector_store.as_retriever()

# # Define a custom function for local inference instead of OpenAI API call
# def local_qa_chain(inputs):
#     question = inputs["question"]
#     chat_history = inputs.get("chat_history", [])
    
#     # Format the history into a prompt
#     context = " ".join([msg for msg in chat_history]) if chat_history else "No context available."
#     prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"
    
#     # Generate response using local LLM
#     answer = llm.generate(prompt)
    
#     return {"answer": answer}

# # Use this function instead of OpenAI's ConversationalRetrievalChain
# qa_chain = local_qa_chain

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

# # Define request model
# class ChatRequest(BaseModel):
#     query: str
#     session_id: str

# @app.post("/api/chat/")
# async def chat(request: ChatRequest):
#     try:
#         # Load chat history correctly
#         chat_history = chat_memory.load_memory_variables({}).get("chat_history", [])

#         # Call the Local LLM for response
#         response = qa_chain({"question": request.query, "chat_history": chat_history})

#         return {"response": response["answer"]}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # TODO: uncomment for the openAI Version
# # @app.post("/api/chat/")
# # async def chat(request: ChatRequest):
# #     try:
# #         # Load chat history correctly
# #         chat_history = chat_memory.load_memory_variables({})["chat_history"]
        
# #         # Call the LangChain QA chain
# #         response = qa_chain({"question": request.query, "chat_history": chat_history})
        
# #         return {"response": response["answer"]}
    
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=str(e))

# # # Define request model
# # class ChatRequest(BaseModel):
# #     query: str
# #     session_id: str

# # @app.post("/api/chat/")
# # async def chat(request: ChatRequest):
# #     try:
# #         response = qa_chain({"question": request.query, "chat_history": chat_memory.messages})
# #         return {"response": response["answer"]}
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=str(e))
    
# # # Endpoint for Chatbot
# # @app.post("/api/chat/")
# # async def chat(query: str, session_id: str):
# #     try:
# #         response = qa_chain({"question": query, "chat_history": chat_memory.messages})
# #         return {"response": response["answer"]}
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=str(e))

# # Endpoint to Embed New Data
# @app.post("/api/embed/")
# async def embed_data():
#     try:
#         load_and_store_documents()
#         return {"message": "Documents embedded successfully!"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Registration endpoint
# @app.post("/api/register")
# async def register(request: RegisterRequest):
#     # Check if user already exists
#     user = await get_user_by_email(request.email)
#     if user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST, 
#             detail="Email already registered"
#         )
    
#     # Hash the user's password with bcrypt
#     # Note: bcrypt.hashpw() returns a bytes object, so we decode it to store in MongoDB
#     hashed_password = bcrypt.hashpw(request.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

#     new_user = {
#         "name": request.name,
#         "email": request.email,
#         "password": hashed_password,  # Store hashed password
#     }

#     result = await users_collection.insert_one(new_user)
#     created_user = await users_collection.find_one({"_id": result.inserted_id})

#     return {
#         "message": "Registration successful",
#         "name": created_user.get("name"),
#         "email": created_user.get("email"),
#     }

# # Login endpoint
# @app.post("/api/login")
# async def login(request: LoginRequest):
#     user = await get_user_by_email(request.email)
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     # Compare the provided password with the hashed password in the DB
#     # The user.get("password") is the stored hash (string), so we need to encode it before comparing
#     if not bcrypt.checkpw(request.password.encode("utf-8"), user["password"].encode("utf-8")):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     return {
#         "message": "Login successful",
#         "name": user.get("name"),
#         "email": user.get("email"),
#     }

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
import bcrypt
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from transformers import pipeline
import uuid

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.chat_message_histories import MongoDBChatMessageHistory
from langchain.memory import ConversationBufferMemory

# Initialize FastAPI app
app = FastAPI()

# Load environment variables from .env file
load_dotenv()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_DETAILS = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
db = client.ai_chatbot_db  # Database name
users_collection = db.get_collection("users")

# Load a Local LLM from Hugging Face (Google's flan-t5-large)
llm_pipeline = pipeline("text2text-generation", model="google/flan-t5-large")

class LocalLLM:
    def __init__(self, pipeline):
        self.pipeline = pipeline

    def generate(self, prompt):
        response = self.pipeline(prompt, max_length=200, truncation=True)
        return response[0]["generated_text"]

# Create an instance of the Local LLM
llm = LocalLLM(llm_pipeline)

# Chat Memory (MongoDB)
session_id = str(uuid.uuid4())  # Generate a unique session ID
mongo_chat_history = MongoDBChatMessageHistory(
    connection_string=MONGO_DETAILS,
    database_name="chatbot_db",
    collection_name="chat_history",
    session_id=session_id
)

chat_memory = ConversationBufferMemory(
    memory_key="chat_history",
    chat_memory=mongo_chat_history,
    return_messages=True
)

# Define a custom function for local inference
def local_qa_chain(inputs):
    question = inputs["question"]
    chat_history = inputs.get("chat_history", [])

    # Format chat history for context
    context = " ".join([msg for msg in chat_history]) if chat_history else "No context available."
    prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"

    # Generate response using local LLM
    answer = llm.generate(prompt)
    return {"answer": answer}

qa_chain = local_qa_chain  # Assign local inference function

# Pydantic Models for API Requests
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    query: str
    session_id: str

# Utility function to get user by email
async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

# ✅ Chatbot API Endpoint (Uses Local LLM)
@app.post("/api/chat/")
async def chat(request: ChatRequest):
    try:
        # Load chat history from MongoDB
        chat_history = chat_memory.load_memory_variables({}).get("chat_history", [])

        # Generate response using local LLM
        response = qa_chain({"question": request.query, "chat_history": chat_history})

        return {"response": response["answer"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Register User API
@app.post("/api/register")
async def register(request: RegisterRequest):
    # Check if user already exists
    user = await get_user_by_email(request.email)
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Hash password using bcrypt
    hashed_password = bcrypt.hashpw(request.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = {
        "name": request.name,
        "email": request.email,
        "password": hashed_password,
    }

    result = await users_collection.insert_one(new_user)
    created_user = await users_collection.find_one({"_id": result.inserted_id})

    return {
        "message": "Registration successful",
        "name": created_user.get("name"),
        "email": created_user.get("email"),
    }

# ✅ Login User API
@app.post("/api/login")
async def login(request: LoginRequest):
    user = await get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Compare provided password with hashed password in DB
    if not bcrypt.checkpw(request.password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "name": user.get("name"),
        "email": user.get("email"),
    }

# ✅ Health Check Endpoints
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI using MongoDB"}

@app.get("/api/status")
async def get_status():
    return {"status": "Server is up and running"}
