"use client"

import { useSyncExternalStore } from "react"

type Listener = () => void

let selectedIds = new Set<string>()
const listeners = new Set<Listener>()

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return selectedIds
}

function emit() {
  listeners.forEach((listener) => listener())
}

function toggleSource(id: string) {
  const next = new Set(selectedIds)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  selectedIds = next
  emit()
}

function clearSelection() {
  if (selectedIds.size === 0) return
  selectedIds = new Set<string>()
  emit()
}

export function useTelegramSourceSelection() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  return {
    selectedIds: current,
    selectedCount: current.size,
    isSelected: (id: string) => current.has(id),
    toggleSource,
    clearSelection,
  }
}
