from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.schemas import AgencyStats, Booking, BookingListResponse, BookingRequest, BookingStatus, BookingStatusUpdateRequest, CustomRouteRequest, CustomRouteResponse, Difficulty, Tour, TourListResponse
from app.services import build_custom_route, cancel_booking, create_booking, get_booking, get_stats, get_tour, list_bookings, list_tours, update_booking_status


app = FastAPI(
    title="Space Tourism Agency API",
    version="1.0.0",
    description="Backend for cosmic travel packages, custom routes and bookings"
)


def error_response(status_code: int, code: str, message: str, details: list[dict[str, str]] | None = None) -> JSONResponse:
    payload = {
        "error": {
            "code": code,
            "message": message,
            "details": details
        }
    }
    return JSONResponse(status_code=status_code, content=payload)


@app.exception_handler(HTTPException)
async def handle_http_exception(request: Request, exc: HTTPException) -> JSONResponse:
    request_path = str(request.url.path)
    if isinstance(exc.detail, str):
        return error_response(exc.status_code, "http_error", exc.detail, [{"field": "path", "message": request_path}])
    return error_response(exc.status_code, "http_error", "Request failed", [{"field": "path", "message": request_path}])


@app.exception_handler(RequestValidationError)
async def handle_validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
    request_path = str(request.url.path)
    details = [
        {
            "field": ".".join(str(value) for value in error.get("loc", [])),
            "message": error.get("msg", "Invalid value")
        }
        for error in exc.errors()
    ]
    details.append({"field": "path", "message": request_path})
    return error_response(422, "validation_error", "Invalid request data", details)


@app.exception_handler(Exception)
async def handle_unexpected_error(request: Request, exc: Exception) -> JSONResponse:
    request_path = str(request.url.path)
    return error_response(500, "internal_error", "Internal server error", [{"field": "path", "message": request_path}])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/api/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/v1/tours", response_model=TourListResponse)
def read_tours(
    max_price_mln: float | None = Query(default=None, gt=0),
    max_duration_days: int | None = Query(default=None, ge=1),
    difficulty: Difficulty | None = Query(default=None),
    search: str | None = Query(default=None, min_length=1, max_length=80)
) -> TourListResponse:
    return list_tours(max_price_mln, max_duration_days, difficulty, search)


@app.get("/api/v1/tours/{tour_id}", response_model=Tour)
def read_tour(tour_id: str) -> Tour:
    return get_tour(tour_id)


@app.post("/api/v1/routes/custom", response_model=CustomRouteResponse)
def create_custom_route(request: CustomRouteRequest) -> CustomRouteResponse:
    return build_custom_route(request)


@app.post("/api/v1/bookings", response_model=Booking)
def create_booking_request(request: BookingRequest) -> Booking:
    return create_booking(request)


@app.get("/api/v1/bookings", response_model=BookingListResponse)
def read_bookings(status: BookingStatus | None = Query(default=None)) -> BookingListResponse:
    return list_bookings(status)


@app.get("/api/v1/bookings/{booking_id}", response_model=Booking)
def read_booking(booking_id: str) -> Booking:
    return get_booking(booking_id)


@app.patch("/api/v1/bookings/{booking_id}/status", response_model=Booking)
def patch_booking_status(booking_id: str, request: BookingStatusUpdateRequest) -> Booking:
    return update_booking_status(booking_id, request.status)


@app.post("/api/v1/bookings/{booking_id}/cancel", response_model=Booking)
def cancel_booking_request(booking_id: str) -> Booking:
    return cancel_booking(booking_id)


@app.get("/api/v1/stats", response_model=AgencyStats)
def read_stats() -> AgencyStats:
    return get_stats()
