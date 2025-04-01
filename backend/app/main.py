from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import instructions

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(instructions.router)
