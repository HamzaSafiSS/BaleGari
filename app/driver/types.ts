export type DriverStatus = "ONLINE" | "OFFLINE" | "ON_RIDE";

export interface IncomingRide {
  id: string;
  pickup: string;
  destination: string;
  passengerName: string;
}

export interface DriverEarning {
  rideId: string;
  amount: number;
  date: string;
}
