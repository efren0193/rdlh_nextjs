import { db } from "@/lib/firebase-client";
import { 
    collection, 
    getDocs, 
    query, 
    where, 
    limit, 
    orderBy, 
    startAfter, 
    getDoc, 
    doc, 
    getCountFromServer,
    updateDoc
} from "firebase/firestore";

const trabajosCollection = collection(db, "trabajos");

export const getTrabajos = async (limitAmount = 10, cursor=null) => {
    try {
        let q = query(
            trabajosCollection,
            where('type', '==', 'work'),
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
            trabajosCollection,
            where('type', '==', 'work')
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
    try {
        
    } catch (error) {
        
    }
}

export const updateWork = async(payload, id) => {
    try {
        const workDoc = doc(db, "trabajos", id);
        await updateDoc(workDoc, {
            ...payload
        })
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// Get trabajo by slug
export const getTrabajoBySlug = async (slug) => {
    try {
        const q = query(trabajosCollection, where('slug','==', slug));
        const snapshot = await getDocs(q);

        if(snapshot.empty) {
            return null;
        }
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } catch (error) {
        console.log(error);
        return null;
    }
}