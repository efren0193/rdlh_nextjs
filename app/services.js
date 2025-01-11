import { db } from "@/lib/firebase-client";
import { collection, getDocs, query, where, limit, orderBy, startAfter, getDoc, doc, getCountFromServer } from "firebase/firestore";

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

export const getTestimonials = async () => {
    const q = query(collection(db, "testimonios"));
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
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

    const totalQuery = query(
        collection(db, "trabajos"),
        where('type', '==', 'work'),
        orderBy('date', 'desc')
    );

    const totalSnap = await getCountFromServer(totalQuery);
    const totalItems = totalSnap.data().count;

    return { newPosts, lastVisible, totalItems};
};

export const getWork = async(id) => {
    const q = doc(db, "trabajos", id);
    const docSnap = await getDoc(q);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
}

export const saveWork = async(payload, id) => {
    
}