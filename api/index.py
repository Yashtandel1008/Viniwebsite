from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/")
async def root():
    return {"message": "Studio Vini Backend is running"}

@app.post("/contact")
async def contact(form: ContactForm):
    # Here you would typically send an email or save to a database
    print(f"Received message from {form.name} ({form.email}): {form.message}")
    return {"status": "success", "message": "Thank you for reaching out. We will get back to you soon!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
