from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user
from app.database.db import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Request
from fastapi.responses import RedirectResponse
from app.core.oauth import oauth

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(form_data.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@router.get("/google/login")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(
        request,
        redirect_uri
    )

@router.get("/google/callback", name="google_callback")
async def google_callback(
    request: Request,
    db: Session = Depends(get_db)
):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    email = user_info["email"]
    username = user_info.get("name")

    # Check if user already exists
    user = db.query(User).filter(User.email == email).first()

    # If not, create one
    if not user:
        user = User(
            username=username,
            email=email,
            # Random placeholder password since Google users don't use it
            password=hash_password("GOOGLE_AUTH_USER")
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    # Generate JWT
    access_token = create_access_token(
        {
            "sub": user.email,
            "role": user.role
        }
    )

    # Redirect to landing page
    response = RedirectResponse(
        url="http://127.0.0.1:5500/weather-app-ui/frontend/landing-Page/index.html"
    )

    # Store JWT in cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="lax"
    )

    return response