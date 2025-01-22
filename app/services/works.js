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
    addDoc, 
    updateDoc
} from "firebase/firestore";


export const getTrabajos = async (limitAmount = 3, lastVisibleDoc = null) => {
    try {
        let q = query(
            collection(db, "trabajos"),
            where('type', '==', 'work'),
            orderBy('date', 'desc'),
            limit(limitAmount)
        );
    
        if (lastVisibleDoc) {
            q = query(q, startAfter(lastVisibleDoc));
        }
    
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return { newPosts: [], lastVisible: null, totalItems: 0 };
        }
        
        const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
        const totalQuery = query(
            collection(db, "trabajos"),
            where('type', '==', 'work')
        );
    
        const totalSnap = await getCountFromServer(totalQuery);
        const totalItems = totalSnap.data().count;
    
        return { newPosts, lastVisible, totalItems};
    } catch (error) {
        console.log(error)
        return { newPosts: [], lastVisible: null, totalItems: 0};
    }
};

export const offsetWorks = async(pageNumber, limit, lastVisibleDoc=null) => {
    try {
        const offset = (pageNumber - 1) * limit;
        let tempVisibleDocs = lastVisibleDoc;
        if(offset > 0) {
            const initialQuery = query(
                collection(db, "trabajos"),
                where('type', '==', 'work'),
                orderBy('date', 'desc'),
                limit(offset)
            );
            const snapshot = await getDocs(initialQuery);
            console.log('snapshot', snapshot)
            tempVisibleDocs = snapshot.docs[snapshot.docs.length - 1];
        }
        return tempVisibleDocs;
    } catch (error) {
        console.log(error)
        return { newPosts: [], lastVisible: null, totalItems: 0};
    }
}

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