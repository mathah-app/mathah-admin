import { ReactNode } from "react";

export interface MainPageWrapperType {
  children: ReactNode;
  title?: string;
}
export interface carType {
    id?:string,
  make: ?string;
  model?: string;
  reg?: string;
  color?: string;
  dateAdded?:string,
  status:?string,
  userId:?string
}
export interface locationType {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
export interface riderType {
  id?: string;
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  dateJoined?: string;
  status?: string;
  profile?: string;
  rides?: {
    destination?: string;
    pickup?: string;
    fare?: string | number;
    distance?: Date | any;
    duration?: string | any;
  };
}

export interface driverType {
  id?: string;
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  dateJoined?: string;
  status?: string;
  profile?: string;
  license?: string;
  policeClearance?: string;
  verificationId?: string;
  ride?: {
    destination?: string;
    pickup?: string;
    fare?: string | number;
    distance?: Date | any;
    duration?: string | any;
  };
  car?: carType;
}

export interface tripTypes {
  id?: string;
  destinationTitle?: string;
  pickUpTitle?: string;
  fare?: string | number;
  distance?: Date | any;
  duration?: string | any;
  rider_name?: string;
  rider_surname?: string;
  rider_prof?: string;
  note?: string;
  seats?:number
  message: ?string;
  driver?: driverType;
  start_location?: locationType;
  end_location: ?locationType;
}


export interface AuthContextType {
  user: any | null; // you can make this stricter with Firebase User type
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}