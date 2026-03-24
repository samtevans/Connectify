import fs from "fs";
import path from "path";

// On Vercel, process.cwd() is read-only — use /tmp for writable storage.
// Note: /tmp is ephemeral per serverless invocation; for persistence use a DB.
const DATA_DIR =
  process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "waitlist.json");

interface WaitlistEntry {
  id: number;
  email: string;
  type: "business" | "accountant";
  createdAt: string;
}

function readData(): WaitlistEntry[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, "[]", "utf-8");
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as WaitlistEntry[];
  } catch {
    return [];
  }
}

function writeData(entries: WaitlistEntry[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

export function addToWaitlist(
  email: string,
  type: "business" | "accountant" = "business"
): { success: boolean; duplicate?: boolean } {
  const entries = readData();
  const normalised = email.toLowerCase().trim();

  if (entries.some((e) => e.email === normalised)) {
    return { success: false, duplicate: true };
  }

  const next: WaitlistEntry = {
    id: entries.length + 1,
    email: normalised,
    type,
    createdAt: new Date().toISOString(),
  };

  writeData([...entries, next]);
  return { success: true };
}

export function getWaitlistCount(): number {
  return readData().length;
}
