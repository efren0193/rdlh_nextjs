import { db } from "@/lib/firebase-client";
import { collection, doc, getDocs, getDoc, query, limit, orderBy, startAfter, getCountFromServer } from "firebase/firestore";

const testimonialsRef = collection(db, "testimonios");
// QUERY FOR HOME PAGE SERVICES LISTING
export const getTestimonios = async () => {
    const q = query(testimonialsRef);
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

//QUERY FOR DASHBOARD SERVICES LISTING WITH PAGINATION
export const getTestimonials = async (limitAmount = 10, cursor=null) => {
    try {
        let q = query(
            testimonialsRef,
            orderBy('date', 'desc'),
            limit(limitAmount)
        );

        if (cursor) {
            q = query(q, startAfter(cursor));
        }
        const snapshot = await getDocs(q);

        const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;

        const totalSnap = await getCountFromServer(query(
            testimonialsRef
        ));
        
        return {
            newPosts,
            lastVisible,
            totalItems: totalSnap.data().count
        };

    } catch (error) {
        console.log(error)
        return { newPosts: [], lastVisible: null, totalItems: 0};
    }
};

export const getTestimonial = async(id) => {
    const q = doc(db, "testimonios", id);
    const docSnap = await getDoc(q);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
}