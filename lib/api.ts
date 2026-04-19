const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body !== undefined) {
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message ?? data?.detail ?? "Ошибка запроса";
    throw new Error(msg);
  }
  return data as T;
}

export interface Tour {
  id: string;
  title: string;
  destination: string;
  duration_days: number;
  price_mln: number;
  seats_left: number;
  difficulty: string;
  highlights: string[];
  description: string;
}

export interface TourListResponse {
  items: Tour[];
  total: number;
}

export interface BookingPayload {
  tour_id: string;
  full_name: string;
  email: string;
  travelers_count: number;
  special_request?: string;
}

export interface Booking {
  id: string;
  tour_id: string;
  full_name: string;
  email: string;
  travelers_count: number;
  total_price_mln: number;
  status: string;
  created_at: string;
  special_request: string | null;
}

export interface AgencyStats {
  tours_total: number;
  active_bookings: number;
  available_seats: number;
  destinations: string[];
}

export function fetchTours(): Promise<TourListResponse> {
  return request<TourListResponse>("GET", "/api/v1/tours");
}

export function fetchStats(): Promise<AgencyStats> {
  return request<AgencyStats>("GET", "/api/v1/stats");
}

export function createBooking(payload: BookingPayload): Promise<Booking> {
  return request<Booking>("POST", "/api/v1/bookings", payload);
}
