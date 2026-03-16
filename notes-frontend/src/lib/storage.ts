import type { Note } from "@/types/Note"

const STORAGE_KEY = "notes_app_v1"

/**
 * Load notes from localStorage
 */
export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return []

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) return []

    return parsed
  } catch (error) {
    console.error("Failed to load notes:", error)
    return []
  }
}

/**
 * Save notes to localStorage
 */
export function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.error("Failed to save notes:", error)
  }
}

/**
 * Create a new note
 */
export function createNote(): Note {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: "",
    contentHtml: "",
    createdAt: now,
    updatedAt: now,
    pinned: false,
    trashed: false,
    folderId: null,
    tags: [],
    attachments: [],
  }
}

/**
 * Update a note inside the array
 */
export function updateNote(notes: Note[], id: string, updates: Partial<Note>) {
  return notes.map((note) =>
    note.id === id
      ? {
          ...note,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : note
  )
}

/**
 * Delete a note (soft delete → trash)
 */
export function trashNote(notes: Note[], id: string) {
  return updateNote(notes, id, { trashed: true })
}

/**
 * Permanently delete a note
 */
export function deleteNote(notes: Note[], id: string) {
  return notes.filter((note) => note.id !== id)
}
