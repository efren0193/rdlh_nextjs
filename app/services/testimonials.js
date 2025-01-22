import { db } from "@/lib/firebase-client";
import { collection, getDocs, query, limit, orderBy, startAfter, getCountFromServer } from "firebase/firestore";

export const getTestimonios = async () => {
    const q = query(collection(db, "testimonios"));
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

export const getTestimonials = async (limitAmount = 3, lastVisibleDoc = null) => {
    let q;
    if (lastVisibleDoc) {
        q = query(
            collection(db, "testimonios"),
            orderBy('date', 'desc'),
            limit(limitAmount),
            startAfter(lastVisibleDoc)
        );
    } else {
        q = query(
            collection(db, "testimonios"),
            orderBy('date', 'desc'),
            limit(limitAmount)
        );
    }

    const servRef = await getDocs(q);
    const newPosts = [];
    servRef.forEach((doc) => newPosts.push({ id: doc.id, ...doc.data() }));

    const lastVisible = servRef.docs[servRef.docs.length - 1]; 

    const totalQuery = query(
        collection(db, "testimonios"),
        orderBy('date', 'desc')
    );

    const totalSnap = await getCountFromServer(totalQuery);
    const totalItems = totalSnap.data().count;

    return { newPosts, lastVisible, totalItems};
};