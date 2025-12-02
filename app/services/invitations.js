import { db } from "@/lib/firebase-client";
import { 
    collection, 
    getDocs, 
    getDoc, 
    query, 
    where, 
    limit,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    orderBy,
    getCountFromServer
} from "firebase/firestore";


const invitationsRef = collection(db, "invitaciones");

/* ===========================================================
   READ ALL       
   =========================================================== */
export const getInvitations = async(limitAmount=10, cursor=null) =>{
    try {
            let q = query(
                invitationsRef,
                orderBy('createdAt', 'desc'),
                limit(limitAmount)
            );
    
            if (cursor) {
                q = query(q, startAfter(cursor));
            }
            const snapshot = await getDocs(q);
    
            const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;
    
            const totalSnap = await getCountFromServer(query(
                invitationsRef
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
}

/* ===========================================================
   READ ONE (by ID)       
   =========================================================== */
export const getInvitationByID = async (id) => {
    const q = doc(db, "invitaciones", id);
    const snapshot = await getDoc(q);
    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
    } else {
        return null;
    }
}   

/* ===========================================================
   CREATE
   =========================================================== */
export const createInvitation = async (data) => {
    try {
        // Validar slug único
        const existing = await getInvitationBySlug(data.slug);
        if (existing) {
            return { success: false, message: "El slug ya está registrado" };
        }

        const docRef = await addDoc(invitationsRef, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return { success: true, id: docRef.id };

    } catch (error) {
        console.error("Error creando la invitación:", error);
        return { success: false, error };
    }
};

/* ===========================================================
   UPDATE
   =========================================================== */
export const updateInvitation = async (payload, id) => {
    try {
        const invitationDoc = doc(db, "invitaciones", id);
        await updateDoc(invitationDoc, {
            ...payload,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error actualizando la invitación:", error);
        return { success: false, message: "Error al actualizar la invitación"};
    }
};

/* ===========================================================
   DELETE
   =========================================================== */
// Implementar función de eliminación si es necesario


/* ===========================================================
   READ ONE (by slug)
   =========================================================== */
export const getInvitationBySlug = async (slug) => {
    try {
        const q = query(invitationsRef, where("slug", "==", slug));
        const snap = await getDocs(q);

        if (snap.empty) return null;

        return {
            id: snap.docs[0].id,
            ...snap.docs[0].data()
        };

    } catch (error) {
        console.error("Error obteniendo invitación:", error);
        return null;
    }
};