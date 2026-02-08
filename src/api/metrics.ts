export type MetricsSummary = {
    revenue: number;
    adSpend: number;
    orders: number;
    roas: number;
};

export async function getSummary(): Promise<MetricsSummary> {
    const base = import.meta.env.VITE_API_BASE_URL; // .env.local 값 참조 방식
    const res = await fetch(`${base}/api/metrics/summary`);
    if(!res.ok) { // HTTP Status code != 200~299
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}

export type MetricRow = {
    date: string;
    channel: string;
    revenue: number;
    adSpend: number;
    orders: number;
}

export async function getTimeSeries(): Promise<MetricRow[]> {
    const base = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${base}/api/metrics/timeseries`);
    if(!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}