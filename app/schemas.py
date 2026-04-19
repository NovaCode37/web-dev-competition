from datetime import datetime
from enum import Enum

from pydantic import BaseModel, EmailStr, Field


class Difficulty(str, Enum):
    beginner = "beginner"
    advanced = "advanced"
    expert = "expert"


class BookingStatus(str, Enum):
    pending_confirmation = "pending_confirmation"
    confirmed = "confirmed"
    canceled = "canceled"


class Tour(BaseModel):
    id: str
    title: str
    destination: str
    duration_days: int = Field(ge=1)
    price_mln: float = Field(gt=0)
    seats_left: int = Field(ge=0)
    difficulty: Difficulty
    highlights: list[str]
    description: str


class RouteModule(BaseModel):
    id: str
    title: str
    destination: str
    duration_days: int = Field(ge=1)
    price_mln: float = Field(gt=0)
    experience: str


class TourListResponse(BaseModel):
    items: list[Tour]
    total: int


class CustomRouteRequest(BaseModel):
    traveler_name: str = Field(min_length=2, max_length=60)
    age: int = Field(ge=13, le=99)
    preferred_destinations: list[str] = Field(default_factory=list, max_length=5)
    flight_days: int = Field(ge=3, le=30)
    budget_mln: float = Field(gt=0)
    intensity: str = Field(default="balanced", pattern="^(calm|balanced|intense)$")


class CustomRouteResponse(BaseModel):
    traveler_name: str
    route_modules: list[RouteModule]
    total_days: int
    total_price_mln: float
    recommendation: str


class BookingRequest(BaseModel):
    tour_id: str
    full_name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    travelers_count: int = Field(ge=1, le=6)
    special_request: str | None = Field(default=None, max_length=300)


class Booking(BaseModel):
    id: str
    tour_id: str
    full_name: str
    email: EmailStr
    travelers_count: int
    total_price_mln: float
    status: BookingStatus
    created_at: datetime
    special_request: str | None


class BookingStatusUpdateRequest(BaseModel):
    status: BookingStatus


class BookingListResponse(BaseModel):
    items: list[Booking]
    total: int


class AgencyStats(BaseModel):
    tours_total: int
    active_bookings: int
    available_seats: int
    destinations: list[str]


class ApiError(BaseModel):
    code: str
    message: str
    details: list[dict[str, str]] | None = None


class ApiErrorResponse(BaseModel):
    error: ApiError
