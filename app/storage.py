from app.schemas import Difficulty, RouteModule, Tour, Booking


TOURS: dict[str, Tour] = {
    "orbital-weekend": Tour(
        id="orbital-weekend",
        title="Orbital Weekend",
        destination="Low Earth Orbit",
        duration_days=3,
        price_mln=1.8,
        seats_left=12,
        difficulty=Difficulty.beginner,
        highlights=[
            "Sunrise every 90 minutes",
            "Zero-gravity photo session",
            "Docked dinner at orbital station"
        ],
        description="Short mission for first-time space tourists with a training day and two days in orbit."
    ),
    "lunar-footsteps": Tour(
        id="lunar-footsteps",
        title="Lunar Footsteps",
        destination="Moon Surface",
        duration_days=8,
        price_mln=5.9,
        seats_left=6,
        difficulty=Difficulty.advanced,
        highlights=[
            "Guided rover expedition",
            "Walk at Shackleton rim",
            "Night stay in lunar dome"
        ],
        description="A focused Moon mission with astronaut mentors, surface trekking and scientific mini quests."
    ),
    "station-scholar": Tour(
        id="station-scholar",
        title="Station Scholar",
        destination="Orbital Research Station",
        duration_days=6,
        price_mln=3.7,
        seats_left=9,
        difficulty=Difficulty.advanced,
        highlights=[
            "Lab workshop with crew",
            "Earth observation challenge",
            "Robotics practice session"
        ],
        description="Educational route for curious travelers with station modules, experiments and group missions."
    ),
    "deep-space-signature": Tour(
        id="deep-space-signature",
        title="Deep Space Signature",
        destination="Cislunar Space",
        duration_days=12,
        price_mln=9.4,
        seats_left=4,
        difficulty=Difficulty.expert,
        highlights=[
            "Far-side Moon flyby",
            "Private command deck shift",
            "Advanced navigation immersion"
        ],
        description="Premium expedition for prepared travelers with long-duration transfer and elite onboard program."
    )
}

ROUTE_MODULES: list[RouteModule] = [
    RouteModule(
        id="prep-sim",
        title="Simulation Hangar",
        destination="Ground Training Complex",
        duration_days=1,
        price_mln=0.2,
        experience="Adaptation drills, suit fitting and mission briefing"
    ),
    RouteModule(
        id="orbit-panorama",
        title="Orbit Panorama",
        destination="Low Earth Orbit",
        duration_days=2,
        price_mln=1.1,
        experience="Cupola observation and camera route above continents"
    ),
    RouteModule(
        id="station-visit",
        title="Station Visit",
        destination="Orbital Research Station",
        duration_days=2,
        price_mln=1.4,
        experience="Team docking, station tour and experiment block"
    ),
    RouteModule(
        id="lunar-transfer",
        title="Lunar Transfer",
        destination="Cislunar Space",
        duration_days=3,
        price_mln=2.1,
        experience="Engine burn sequence and deep-space navigation night"
    ),
    RouteModule(
        id="moon-walk",
        title="Moon Walk",
        destination="Moon Surface",
        duration_days=2,
        price_mln=2.6,
        experience="Guided EVA, crater route and lunar horizon camp"
    )
]

BOOKINGS: dict[str, Booking] = {}
