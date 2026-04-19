from app.schemas import Booking, Difficulty, RouteModule, Tour

TOURS: dict[str, Tour] = {
    "orbital": Tour(
        id="orbital",
        title="Орбитальная станция",
        destination="Низкая околоземная орбита",
        duration_days=7,
        price_mln=28.0,
        seats_left=4,
        difficulty=Difficulty.beginner,
        highlights=[
            "Стыковка с Nova-Station LEO",
            "7 суток на борту орбитального сегмента",
            "Панорамный обзор Земли из купола станции"
        ],
        description="Базовая туристическая миссия с подготовкой, выходом на орбиту и жизнью на станции в составе смешанного экипажа."
    ),
    "moon": Tour(
        id="moon",
        title="Облёт Moon",
        destination="Лунная траектория свободного возврата",
        duration_days=11,
        price_mln=78.5,
        seats_left=2,
        difficulty=Difficulty.advanced,
        highlights=[
            "Траектория фон Брауна с возвратом к Земле",
            "Прохождение периселения 110 км",
            "Наблюдение обратной стороны Луны"
        ],
        description="Продвинутая миссия облёта Луны для участников после медицинского и центрифужного отбора."
    ),
    "mars": Tour(
        id="mars",
        title="Марсианский цикл",
        destination="Орбита Марса",
        duration_days=510,
        price_mln=310.0,
        seats_left=0,
        difficulty=Difficulty.expert,
        highlights=[
            "Флайбай и 14 суток на орбите Марса",
            "Трансфер по окну 2028 года",
            "Полный цикл длительной межпланетной миссии"
        ],
        description="Экспедиционный продукт селективного уровня с длительной подготовкой, многоэтапным отбором и ограниченным числом участников."
    )
}

ROUTE_MODULES: list[RouteModule] = [
    RouteModule(
        id="prep-sim",
        title="Тренировочный комплекс",
        destination="Центр подготовки экипажей",
        duration_days=1,
        price_mln=0.3,
        experience="Адаптационные тренировки, скафандры и предполётный брифинг"
    ),
    RouteModule(
        id="orbit-panorama",
        title="Орбитальный сегмент",
        destination="Низкая околоземная орбита",
        duration_days=2,
        price_mln=1.4,
        experience="Обзор Земли, смены в куполе и работа с бортовой камерой"
    ),
    RouteModule(
        id="station-visit",
        title="Стыковка со станцией",
        destination="Орбитальная станция",
        duration_days=2,
        price_mln=1.9,
        experience="Стыковка, экскурсия по модулям и научный блок"
    ),
    RouteModule(
        id="lunar-transfer",
        title="Лунный трансфер",
        destination="Цислунарное пространство",
        duration_days=3,
        price_mln=2.8,
        experience="Импульсный разгон, навигация дальнего участка и ночная вахта"
    ),
    RouteModule(
        id="moon-walk",
        title="Лунный модуль",
        destination="Луна",
        duration_days=2,
        price_mln=3.5,
        experience="Сценарий высадки, маршрут по кратеру и лунный лагерь"
    ),
    RouteModule(
        id="mars-orbit",
        title="Марсианская орбита",
        destination="Орбита Марса",
        duration_days=4,
        price_mln=6.2,
        experience="Орбитальные манёвры, дистанционные операции и научные сессии"
    )
]

BOOKINGS: dict[str, Booking] = {}
