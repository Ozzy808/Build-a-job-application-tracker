import type { Application, NewApplication } from "../types";
import { seed } from "../data/seed";

const KEY = "applied.applications";
const DELAY = 300;
const wait = () => new Promise((r) => setTimeout(r, DELAY));

function read(): Application[] {
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    localStorage.setItem(KEY, JSON.stringify(seed)); // first visit
    return seed;
  }
  return JSON.parse(raw) as Application[];
}

function write(list: Application[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export async function fetchApplications(): Promise<Application[]> {
  await wait();
  return read();
}

export async function createApplication(input: NewApplication): Promise<Application> {
  await wait();
  const created: Application = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  write([...read(), created]);
  return created;
}

export async function updateApplication(id: string, changes: Partial<Application>): Promise<Application> {
  await wait();
  const list = read();
  const existing = list.find((a) => a.id === id);
  if (!existing) throw new Error("Application not found");
  const updated = { ...existing, ...changes };
  write(list.map((a) => (a.id === id ? updated : a)));
  return updated;
}

export async function deleteApplication(id: string): Promise<void> {
  await wait();
  write(read().filter((a) => a.id !== id));
}