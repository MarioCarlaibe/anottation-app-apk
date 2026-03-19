import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'NOTES'

export async function getNotes() {
  const data = await AsyncStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export async function saveNotes(notes) {
  await AsyncStorage.setItem(KEY, JSON.stringify(notes))
}