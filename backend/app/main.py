from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import instructions
from app.core.config import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)
print("✅ Database tables created (if not exist)")

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(instructions.router)
