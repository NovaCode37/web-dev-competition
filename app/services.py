from datetime import UTC, datetime
from uuid import uuid4

from fastapi import HTTPException

from app.schemas import AgencyStats, Booking, BookingListResponse, BookingRequest, BookingStatus, CustomRouteRequest, CustomRouteResponse, Difficulty, Tour, TourListResponse
from app.storage import BOOKINGS, ROUTE_MODULES, TOURS


def list_tours(
    max_price_mln: float | None,
    max_duration_days: int | None,
    difficulty: Difficulty | None,
    search: str | None
) -> TourListResponse:
    tours = list(TOURS.values())
    if max_price_mln is not None:
        tours = [tour for tour in tours if tour.price_mln <= max_price_mln]
    if max_duration_days is not None:
        tours = [tour for tour in tours if tour.duration_days <= max_duration_days]
    if difficulty is not None:
        tours = [tour for tour in tours if tour.difficulty == difficulty]
    if search:
        query = search.lower().strip()
        tours = [
            tour for tour in tours
            if query in tour.title.lower() or query in tour.destination.lower() or query in tour.description.lower()
        ]
    return TourListResponse(items=tours, total=len(tours))


def get_tour(tour_id: str) -> Tour:
    tour = TOURS.get(tour_id)
    if not tour:
        raise HTTPException(status_code=404, detail="Тур не найден")
    return tour


def build_custom_route(request: CustomRouteRequest) -> CustomRouteResponse:
    preferred_set = {value.strip().lower() for value in request.preferred_destinations if value.strip()}

    def rank(module_destination: str) -> int:
        if module_destination.lower() in preferred_set:
            return 0
        return 1

    modules = sorted(ROUTE_MODULES, key=lambda module: (rank(module.destination), module.price_mln, module.duration_days))

    selected_modules = []
    total_days = 0
    total_price = 0.0
    target_fill = {"calm": 0.6, "balanced": 0.8, "intense": 1.0}[request.intensity]

    for module in modules:
        next_days = total_days + module.duration_days
        next_price = total_price + module.price_mln
        if next_days > request.flight_days:
            continue
        if next_price > request.budget_mln:
            continue
        selected_modules.append(module)
        total_days = next_days
        total_price = next_price
        if total_days >= request.flight_days * target_fill:
            break

    if not selected_modules:
        raise HTTPException(status_code=400, detail="Не удалось подобрать маршрут под бюджет и длительность полёта")

    recommendation = (
        f"{request.traveler_name}, маршрут включает {len(selected_modules)} модулей "
        f"на {total_days} дней с бюджетом {total_price:.2f} млн USD."
    )

    return CustomRouteResponse(
        traveler_name=request.traveler_name,
        route_modules=selected_modules,
        total_days=total_days,
        total_price_mln=round(total_price, 2),
        recommendation=recommendation
    )


def create_booking(request: BookingRequest) -> Booking:
    tour = get_tour(request.tour_id)
    if request.travelers_count > tour.seats_left:
        raise HTTPException(status_code=409, detail="Недостаточно свободных мест")

    tour.seats_left -= request.travelers_count
    booking = Booking(
        id=uuid4().hex[:12],
        tour_id=request.tour_id,
        full_name=request.full_name,
        email=request.email,
        travelers_count=request.travelers_count,
        total_price_mln=round(tour.price_mln * request.travelers_count, 2),
        status=BookingStatus.pending_confirmation,
        created_at=datetime.now(UTC),
        special_request=request.special_request
    )
    BOOKINGS[booking.id] = booking
    return booking


def get_booking(booking_id: str) -> Booking:
    booking = BOOKINGS.get(booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    return booking


def list_bookings(status: BookingStatus | None) -> BookingListResponse:
    items = list(BOOKINGS.values())
    if status is not None:
        items = [booking for booking in items if booking.status == status]
    return BookingListResponse(items=items, total=len(items))


def update_booking_status(booking_id: str, status: BookingStatus) -> Booking:
    booking = get_booking(booking_id)
    if booking.status == status:
        return booking
    if booking.status == BookingStatus.canceled:
        raise HTTPException(status_code=409, detail="Отменённое бронирование нельзя изменить")

    tour = get_tour(booking.tour_id)
    if status == BookingStatus.canceled:
        tour.seats_left += booking.travelers_count
    booking.status = status
    return booking


def cancel_booking(booking_id: str) -> Booking:
    booking = get_booking(booking_id)
    if booking.status == BookingStatus.canceled:
        return booking

    tour = get_tour(booking.tour_id)
    tour.seats_left += booking.travelers_count
    booking.status = BookingStatus.canceled
    return booking


def get_stats() -> AgencyStats:
    destinations = sorted({tour.destination for tour in TOURS.values()})
    available_seats = sum(tour.seats_left for tour in TOURS.values())
    return AgencyStats(
        tours_total=len(TOURS),
        active_bookings=sum(1 for booking in BOOKINGS.values() if booking.status != BookingStatus.canceled),
        available_seats=available_seats,
        destinations=destinations
    )
