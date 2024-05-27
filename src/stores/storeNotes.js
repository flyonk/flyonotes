import { defineStore } from 'pinia';
import { collection, deleteDoc, onSnapshot, doc, updateDoc, query, orderBy, addDoc  } from "firebase/firestore";
import { db } from '@/js/firebase';
import { useStoreAuth } from '@/stores/storeAuth';

let noteCollectionRef
let notesCollectionQuery

let getNotesSnapshot = null;

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      isNotesLoaded: false
    }
  },
  getters: {
    getNoteById: (state) => (id) => state.notes.find(note => note.id === id),
    totalNotesCount: (state) => state.notes.length,
    totalCharactersCount: (state) => state.notes.reduce((acc, note) => acc + note.content.length, 0),
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      noteCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(noteCollectionRef, orderBy("created", "desc"));  
      this.getNotes();
    },
    async getNotes() {
      this.isNotesLoaded = false;

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notesList = [];
        querySnapshot.forEach((doc) => {
        let note = { id: doc.id, content: doc.data().content, created: doc.data().created }
        notesList.push(note)
      });
      this.notes = notesList
      this.isNotesLoaded = true
      });
    },
    async addNote(newContent) {
      const docRef = await addDoc(noteCollectionRef, {
        content: newContent,
        created: Date.now()
      });
    },
    async deleteNoteById(id) {
      await deleteDoc(doc(noteCollectionRef, id));
    },
    async updateNoteById(noteId, newContent) {
      await updateDoc(doc(noteCollectionRef, noteId), {
        content: newContent,
      })
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot(); //unsubscribe from any active listeners
    }
  }
});
