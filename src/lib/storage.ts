import type { AnswerMap } from "@/lib/types";

export const ANSWER_STORAGE_KEY = "hjti_answers_v1";
export const CURRENT_INDEX_KEY = "hjti_current_index_v1";

const canUseStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";
const STORAGE_CHANGE_EVENT = "hjti_storage_change";

function emitStorageChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
}

export function saveAnswers(answers: AnswerMap) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ANSWER_STORAGE_KEY, JSON.stringify(answers));
  emitStorageChange();
}

export function loadAnswers(): AnswerMap {
  if (!canUseStorage()) return {};

  try {
    const raw = window.localStorage.getItem(ANSWER_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as AnswerMap;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => Number.isInteger(value) && value >= 1 && value <= 5),
    );
  } catch {
    return {};
  }
}

export function clearAnswers() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ANSWER_STORAGE_KEY);
  window.localStorage.removeItem(CURRENT_INDEX_KEY);
  emitStorageChange();
}

export function saveCurrentIndex(index: number) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CURRENT_INDEX_KEY, String(index));
  emitStorageChange();
}

export function loadCurrentIndex(): number {
  if (!canUseStorage()) return 0;

  const raw = window.localStorage.getItem(CURRENT_INDEX_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function subscribeStoredTestState(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_CHANGE_EVENT, callback);
  };
}

export function getAnswersSnapshot() {
  return JSON.stringify(loadAnswers());
}

export function getCurrentIndexSnapshot() {
  return String(loadCurrentIndex());
}

export function getServerAnswersSnapshot() {
  return "{}";
}

export function getServerCurrentIndexSnapshot() {
  return "0";
}
