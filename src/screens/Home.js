import NoteItem from '../components/NoteItem'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { getNotes, saveNotes } from '../storage/notesStorage'

export default function Home() {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('geral')
  const [notes, setNotes] = useState([])

  useEffect(() => {
    loadNotes()
  }, [])

  async function loadNotes() {
    const data = await getNotes()
    setNotes(data)
  }

  async function addNote() {
    const cleanedText = text.trim()

    if (!cleanedText) return

    const newNote = {
      id: Date.now(),
      text: cleanedText,
      category,
      done: false
    }

    const updated = [...notes, newNote]
    setNotes(updated)
    setText('')
    await saveNotes(updated)
  }

  async function toggleDone(id) {
    const updated = notes.map(n =>
      n.id === id ? { ...n, done: !n.done } : n
    )
    setNotes(updated)
    await saveNotes(updated)
  }

  async function deleteNote(id) {
    const updated = notes.filter(n => n.id !== id)
    setNotes(updated)
    await saveNotes(updated)
  }

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Minhas Anotações
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite..."
        style={{ borderWidth: 1, padding: 12, marginVertical: 10, borderRadius: 8 }}
      />

      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Geral" value="geral" />
        <Picker.Item label="Trabalho" value="trabalho" />
        <Picker.Item label="Estudo" value="estudo" />
      </Picker>

      <TouchableOpacity 
        onPress={addNote}
        style={{
            backgroundColor: '#007bff',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Salvar
        </Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
            <NoteItem
                note={item}
                onToggle={toggleDone}
                onDelete={deleteNote}
            />
        )}
      />
    </View>
  )
}