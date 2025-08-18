import { db } from "@/utils/firebase.config";
import { driverType, riderType, tripTypes } from "@/utils/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
// drivers things////
export const getAllDrivers = async () => {
  try {
    const dSnap = await getDocs(collection(db, "drivers"));
    const data = dSnap.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as driverType)
    );
    return data;
  } catch (e) {
    throw e;
  }
};
export const getRecentDrivers = async () => {
  try {
    const dSnap = await getDocs(query(collection(db, "drivers"), limit(5)));

    const data = dSnap.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as driverType)
    );

    return data;
  } catch (e) {
    console.error("Error fetching recent drivers:", e);
    throw e;
  }
};
export const getDriverDetails = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, "drivers", id));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as driverType;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};
export const updateDriver= async(id:string, data:any)=>{
  try {
     await updateDoc(doc(db, 'drivers', id),data )
  } catch (error) {
    throw error
  }
}
// ////riders stuff

export const getAllRiders = async () => {
  try {
    const dSnap = await getDocs(collection(db, "riders"));
    const data = dSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data as riderType[];
  } catch (e) {
    throw e;
  }
};
export const getRecentRiders = async () => {
  try {
    const dSnap = await getDocs(query(collection(db, "riders"), limit(5)));

    const data = dSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (e) {
    console.error("Error fetching recent drivers:", e);
    throw e;
  }
};
export const getRiderDetails = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, "riders", id));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as riderType;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};


const isDateInCurrentWeek = (date: any) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
};
export const getRiderTransactions = async (riderId: string) => {
  try {
    const tripsRef = collection(db, "trips");
    const q = query(tripsRef, where("rider_id", "==", riderId));
    const querySnapshot = await getDocs(q);

    let totalEarnings = 0;
    let weeklyEarnings = 0;
    let totalTrips = 0;
    let weeklyTrips = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.ride_status === "completed") {
        const fare = data.fare || 0;
        const tripDate = data.timestamp?.toDate();
        totalEarnings += fare;
        totalTrips++;

        if (tripDate && isDateInCurrentWeek(tripDate)) {
          weeklyEarnings += fare;
          weeklyTrips++;
        }
      }
    });

    return {
      totalEarnings,
      weeklyEarnings,
      totalTrips,
      weeklyTrips,
    };
  } catch (e) {
    console.log(e);
  }
};
export const getDriverTransactions = async (driverId: string) => {
  try {
    const tripsRef = collection(db, "trips");
    const q = query(tripsRef, where("driver.id", "==", driverId));
    const querySnapshot = await getDocs(q);

    let totalEarnings = 0;
    let weeklyEarnings = 0;
    let totalTrips = 0;
    let weeklyTrips = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.ride_status === "completed") {
        const fare = data.fare || 0;
        const tripDate = data.timestamp?.toDate();
        totalEarnings += fare;
        totalTrips++;

        if (tripDate && isDateInCurrentWeek(tripDate)) {
          weeklyEarnings += fare;
          weeklyTrips++;
        }
      }
    });

    return {
      totalEarnings,
      weeklyEarnings,
      totalTrips,
      weeklyTrips,
    };
  } catch (e) {
    console.log(e);
  }
};

export const listenToLiveTrips = (onData: (trips: any[]) => void) => {
  const tripsRef = collection(db, "trips");

  // Only include trips that are not 'completed' or 'cancelled'
  const tripsQuery = query(
    tripsRef,
    where("ride_status", "in", ["requesting", "enroute", "awaiting", "onTrip"])
  );

  const unsubscribe = onSnapshot(tripsQuery, (querySnapshot) => {
    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onData(trips); // return all active trips
  });

  return unsubscribe;
};

export const getAllTrips = async () => {
  const tripsRef = collection(db, "trips");

  // Only include trips that are not 'completed' or 'cancelled'
  const tripsQuery = query(tripsRef, where("ride_status", "==", "completed"));

  const tripsSnap = await getDocs(tripsQuery);

  const data = tripsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as tripTypes));
  return data;
};

export const getTripDetails = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, "trips", id));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as tripTypes;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};