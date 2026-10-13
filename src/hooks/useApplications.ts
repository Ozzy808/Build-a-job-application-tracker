import { useCallback, useEffect, useState } from "react";
import type { Application, NewApplication } from "../types";
import {
  createApplication, deleteApplication, fetchApplications, updateApplication,
} from "../api/applications";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    try {
      setApplications(await fetchApplications());
      setError(null);
    } catch {
      setError("Something went wrong loading your applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload(); // once, on mount
  }, [reload]);

  // every write: call the API, then refresh, so screen and storage never disagree
  async function run<T>(fn: () => Promise<T>): Promise<T> {
    setBusy(true);
    try {
      const result = await fn();
      await reload();
      return result;
    } finally {
      setBusy(false);
    }
  }

  return {
    applications, loading, error, busy, reload,
    add: (input: NewApplication) => run(() => createApplication(input)),
    update: (id: string, changes: Partial<Application>) => run(() => updateApplication(id, changes)),
    remove: (id: string) => run(() => deleteApplication(id)),
  };
}