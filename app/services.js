import { db } from "@/app/firebase-config";
import { collection, getDocs, query, where, limit, orderBy, startAfter } from "firebase/firestore";

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

export const getTrabajos = async (limitAmount = 3, lastVisibleDoc = null) => {
    let q;
    if (lastVisibleDoc) {
        q = query(
            collection(db, "trabajos"),
            where('type', '==', 'work'),
            orderBy('date', 'desc'),
            limit(limitAmount),
            startAfter(lastVisibleDoc)
        );
    } else {
        q = query(
            collection(db, "trabajos"),
            where('type', '==', 'work'),
            orderBy('date', 'desc'),
            limit(limitAmount)
        );
    }

    const servRef = await getDocs(q);
    const newPosts = [];
    servRef.forEach((doc) => newPosts.push({ id: doc.id, ...doc.data() }));

    const lastVisible = servRef.docs[servRef.docs.length - 1]; 
    return { newPosts, lastVisible };
};

