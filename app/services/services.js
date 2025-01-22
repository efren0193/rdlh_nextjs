import { db } from "@/lib/firebase-client";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

export const getServicios = async(main) =>{
    const q = main ? query(collection(db, "servicios"), limit(3)) : query(collection(db, "servicios"));
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

export const getServicio = async (params) => {
    const q = query(collection(db, 'servicios'), where('slug','==', params));
    const snapshot = await getDocs(q);
    const servicios = snapshot.docs.map(doc => doc.data()); 

    return servicios.length ? servicios[0] : null;
}