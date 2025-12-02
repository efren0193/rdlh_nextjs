import { db } from "@/lib/firebase-client";
import { 
    collection, 
    getDocs, 
    query, 
    where, 
    limit,
    startAfter,
    getDoc,
    addDoc,
    doc, 
    getCountFromServer,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";

const serviciosRef = collection(db, "servicios");
// QUERY FOR HOME PAGE SERVICES LISTING
export const getServicios = async(main) =>{
    const q = main ? query(serviciosRef, limit(3)) : query(serviciosRef);
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

export const getServiciosForMenu = async() => {
    const res = await getDocs(collection(db, 'servicios'));
    const data = [];

    res.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

export const getServicioBySlug = async (slug) => {
    try {
        const q = query(serviciosRef, where('slug','==', slug));
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

// QUERY FOR DASHBOARD SERVICES LISTING WITH PAGINATION
export const getServices = async (limitAmount = 10, cursor=null) => {
    try {
        let q = query(
            serviciosRef,
            limit(limitAmount)
        );

        if (cursor) {
            q = query(q, startAfter(cursor));
        }
        const snapshot = await getDocs(q);

        const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;

        const totalSnap = await getCountFromServer(query(
            serviciosRef
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

export const getServiceByID = async(id) => {
    const q = doc(db, "servicios", id);
    const docSnap = await getDoc(q);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
}

/* ===========================================================
   CREATE
   =========================================================== */
export const createService = async(data) => {
    try {

        const existing = await getServicioBySlug(data.slug);
        if (existing) {
            return { success: false, message: "El slug ya está registrado" };
        }

        const newServiceRef = await addDoc(serviciosRef, {
            ...data,
            createdAt: new serverTimestamp(),
            updatedAt: new serverTimestamp()
        });

        return { success: true, id: newServiceRef.id };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al crear el servicio" };
    }
}

/* ===========================================================
   UPDATE
   =========================================================== */
export const updateService = async(payload, id) => {
    try {
        const serviceRef = doc(db, "servicios", id);
        await updateDoc(serviceRef, {
            ...payload,
            updatedAt: new serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al actualizar el servicio" };  
    }
}  

export const updateImages = async(images, id) => {
    try {
        const serviceRef = doc(db, "servicios", id);
        await updateDoc(serviceRef, {
            images: images,
            updatedAt: new serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al actualizar las imágenes" };  
    }
}

// DELETE IMAGE FROM SERVICE

export const deleteImage = async(imageId, id) => {
    try {
        const serviceRef = doc(db, "servicios", id);
        const serviceSnap = await getDoc(serviceRef);

        if (!serviceSnap.exists()) {
            return { success: false, message: "Servicio no encontrado" };
        }

        const serviceData = serviceSnap.data();
        const updatedImages = serviceData.images.filter(img => img !== imageId);

        await updateDoc(serviceRef, {
            images: updatedImages,
            updatedAt: new serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al eliminar la imagen" };  
    }
}


export const deleteService = async(id) => {
    await deleteDoc(doc(db, "servicios", id));
}