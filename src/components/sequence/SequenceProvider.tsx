'use client';

import { Sequence, SequenceItem, AsanaSide } from '@/types/anatomy';
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'anatomy-archive-sequences';
const MAX_SEQUENCES = 10;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function createSequence(): Sequence {
  const now = new Date().toISOString();
  return { id: generateId(), name: '새 시퀀스', items: [], createdAt: now, updatedAt: now };
}

type SequenceAction =
  | { type: 'ADD_ITEM'; asanaId: string }
  | { type: 'REMOVE_ITEM'; uid: string }
  | { type: 'REORDER'; oldIndex: number; newIndex: number }
  | { type: 'UPDATE_ITEM'; uid: string; patch: Partial<Pick<SequenceItem, 'side' | 'notes'>> }
  | { type: 'RENAME'; name: string }
  | { type: 'SAVE' }
  | { type: 'LOAD'; sequence: Sequence }
  | { type: 'DELETE_SAVED'; id: string }
  | { type: 'NEW_SEQUENCE' };

interface SequenceState {
  current: Sequence;
  saved: Sequence[];
}

function loadSaved(): Sequence[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Sequence[];
  } catch {
    return [];
  }
}

function reducer(state: SequenceState, action: SequenceAction): SequenceState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item: SequenceItem = { uid: generateId(), asanaId: action.asanaId };
      const updated = { ...state.current, items: [...state.current.items, item], updatedAt: new Date().toISOString() };
      return { ...state, current: updated };
    }
    case 'REMOVE_ITEM': {
      const items = state.current.items.filter((i) => i.uid !== action.uid);
      return { ...state, current: { ...state.current, items, updatedAt: new Date().toISOString() } };
    }
    case 'REORDER': {
      const items = [...state.current.items];
      const [moved] = items.splice(action.oldIndex, 1);
      items.splice(action.newIndex, 0, moved);
      return { ...state, current: { ...state.current, items, updatedAt: new Date().toISOString() } };
    }
    case 'UPDATE_ITEM': {
      const items = state.current.items.map((i) =>
        i.uid === action.uid ? { ...i, ...action.patch } : i,
      );
      return { ...state, current: { ...state.current, items, updatedAt: new Date().toISOString() } };
    }
    case 'RENAME': {
      return { ...state, current: { ...state.current, name: action.name, updatedAt: new Date().toISOString() } };
    }
    case 'SAVE': {
      const exists = state.saved.findIndex((s) => s.id === state.current.id);
      let saved: Sequence[];
      if (exists >= 0) {
        saved = state.saved.map((s) => (s.id === state.current.id ? state.current : s));
      } else {
        saved = [state.current, ...state.saved].slice(0, MAX_SEQUENCES);
      }
      return { ...state, saved };
    }
    case 'LOAD': {
      return { ...state, current: action.sequence };
    }
    case 'DELETE_SAVED': {
      const saved = state.saved.filter((s) => s.id !== action.id);
      return { ...state, saved };
    }
    case 'NEW_SEQUENCE': {
      return { ...state, current: createSequence() };
    }
    default:
      return state;
  }
}

interface SequenceContextValue {
  current: Sequence;
  saved: Sequence[];
  addItem: (asanaId: string) => void;
  removeItem: (uid: string) => void;
  reorder: (oldIndex: number, newIndex: number) => void;
  updateItem: (uid: string, patch: Partial<Pick<SequenceItem, 'side' | 'notes'>>) => void;
  rename: (name: string) => void;
  save: () => void;
  load: (sequence: Sequence) => void;
  deleteSaved: (id: string) => void;
  newSequence: () => void;
  updateSide: (uid: string, side: AsanaSide | undefined) => void;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);

export function useSequence(): SequenceContextValue {
  const ctx = useContext(SequenceContext);
  if (!ctx) throw new Error('useSequence must be used inside SequenceProvider');
  return ctx;
}

export default function SequenceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    current: createSequence(),
    saved: loadSaved(),
  }));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved));
    } catch {
      // localStorage 용량 초과 등 무시
    }
  }, [state.saved]);

  const addItem = useCallback((asanaId: string) => dispatch({ type: 'ADD_ITEM', asanaId }), []);
  const removeItem = useCallback((uid: string) => dispatch({ type: 'REMOVE_ITEM', uid }), []);
  const reorder = useCallback((oldIndex: number, newIndex: number) => dispatch({ type: 'REORDER', oldIndex, newIndex }), []);
  const updateItem = useCallback((uid: string, patch: Partial<Pick<SequenceItem, 'side' | 'notes'>>) => dispatch({ type: 'UPDATE_ITEM', uid, patch }), []);
  const rename = useCallback((name: string) => dispatch({ type: 'RENAME', name }), []);
  const save = useCallback(() => dispatch({ type: 'SAVE' }), []);
  const load = useCallback((sequence: Sequence) => dispatch({ type: 'LOAD', sequence }), []);
  const deleteSaved = useCallback((id: string) => dispatch({ type: 'DELETE_SAVED', id }), []);
  const newSeq = useCallback(() => dispatch({ type: 'NEW_SEQUENCE' }), []);
  const updateSide = useCallback(
    (uid: string, side: AsanaSide | undefined) => dispatch({ type: 'UPDATE_ITEM', uid, patch: { side } }),
    [],
  );

  return (
    <SequenceContext.Provider
      value={{
        current: state.current,
        saved: state.saved,
        addItem,
        removeItem,
        reorder,
        updateItem,
        rename,
        save,
        load,
        deleteSaved,
        newSequence: newSeq,
        updateSide,
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
}
