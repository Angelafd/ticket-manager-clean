// src/services/firebaseService.js
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig'; // desde src/services -> subir 2 niveles al root

// 🔹 Sube archivo a Firebase Storage y devuelve URL
export async function uploadFile(uri, path) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
  const url = await getDownloadURL(storageRef);
  return url;
}

// 🔹 Crear ticket
export async function createTicket({ title, description, category, priority }, userId, fileUri) {
  const attachments = [];
  if (fileUri) {
    const url = await uploadFile(fileUri, `tickets/${userId}_${Date.now()}`);
    attachments.push(url);
  }
  const docRef = await addDoc(collection(db, 'tickets'), {
    title,
    description,
    category,
    priority,
    status: 'Pendiente',
    userId,
    attachments,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

// 🔹 Suscripción en tiempo real a tickets del usuario
export function subscribeTickets(userId, onChange) {
  const q = query(
    collection(db, 'tickets'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    onChange(data);
  });
}

// 🔹 Suscripción en tiempo real a UN ticket específico
export function subscribeToTicket(ticketId, onChange) {
  const docRef = doc(db, 'tickets', ticketId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onChange({ id: docSnap.id, ...docSnap.data() });
    }
  });
}

// 🔹 Actualizar ticket
export async function updateTicket(ticketId, updates) {
  const docRef = doc(db, 'tickets', ticketId);
  await updateDoc(docRef, updates);
}

// 🔹 Eliminar ticket
export async function deleteTicket(ticketId) {
  const docRef = doc(db, 'tickets', ticketId);
  await deleteDoc(docRef);
}
