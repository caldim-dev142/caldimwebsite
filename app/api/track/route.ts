import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

interface AnalyticsData {
  pageViews: Record<string, number>;
  events: Record<string, number>;
  logs: { timestamp: string; action: string; details?: string }[];
}

async function initData(): Promise<AnalyticsData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {}

  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    const initial: AnalyticsData = {
      pageViews: {
        "/": 0,
        "/about": 0,
        "/services": 0,
        "/products": 0,
        "/contact": 0
      },
      events: {
        "consultation_booked": 0
      },
      logs: []
    };
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2));
    } catch (writeErr) {}
    return initial;
  }
}

async function saveData(data: AnalyticsData) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {}
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const action = url.searchParams.get("action");

    const data = await initData();
    const timestamp = new Date().toISOString();

    if (page) {
      data.pageViews[page] = (data.pageViews[page] || 0) + 1;
      data.logs.push({ timestamp, action: `Page View`, details: page });
    }

    if (action) {
      data.events[action] = (data.events[action] || 0) + 1;
      data.logs.push({ timestamp, action: `Event Trigger`, details: action });
    }

    // Cap logs at 100 entries to prevent files ballooning
    if (data.logs.length > 100) {
      data.logs.shift();
    }

    await saveData(data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await initData();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
