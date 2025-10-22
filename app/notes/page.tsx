'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Plus, FileText, Trash2, Save } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface Note {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function NotesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your note...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[400px]',
      },
    },
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchNotes()
    }
  }, [status])

  useEffect(() => {
    if (selectedNote && editor) {
      setTitle(selectedNote.title)
      editor.commands.setContent(selectedNote.content)
    }
  }, [selectedNote, editor])

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes')
      if (response.ok) {
        const data = await response.json()
        setNotes(data.notes || [])
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewNote = () => {
    setSelectedNote(null)
    setTitle('')
    editor?.commands.setContent('')
  }

  const saveNote = async () => {
    if (!title.trim()) {
      alert('Please enter a title')
      return
    }

    setSaving(true)

    try {
      const content = editor?.getHTML() || ''
      const url = selectedNote ? `/api/notes/${selectedNote._id}` : '/api/notes'
      const method = selectedNote ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      if (response.ok) {
        const data = await response.json()
        fetchNotes()
        setSelectedNote(data.note)
      }
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Error saving note')
    } finally {
      setSaving(false)
    }
  }

  const deleteNote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchNotes()
        if (selectedNote?._id === id) {
          createNewNote()
        }
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {/* Notes List */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800 rounded-lg p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notes</h2>
            <button
              onClick={createNewNote}
              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              title="New Note"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No notes yet. Create your first note!
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedNote?._id === note._id
                      ? 'bg-primary-100 dark:bg-primary-900/30 border-l-4 border-primary-600'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{note.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note._id)
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="md:col-span-3 bg-white dark:bg-slate-800 rounded-lg p-6 overflow-y-auto">
          {editor ? (
            <div className="space-y-4">
              {/* Title Input */}
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-gray-400"
              />

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 pb-4 border-b dark:border-slate-700">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('bold')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('italic')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  <em>I</em>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('strike')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  <s>S</s>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('heading', { level: 1 })
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  H1
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('heading', { level: 2 })
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  H2
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('bulletList')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  • List
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('orderedList')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  1. List
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`px-3 py-1 rounded ${
                    editor.isActive('codeBlock')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  {'</>'}
                </button>
              </div>

              {/* Editor Content */}
              <EditorContent editor={editor} />

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t dark:border-slate-700">
                <button
                  onClick={saveNote}
                  disabled={saving}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading editor...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
