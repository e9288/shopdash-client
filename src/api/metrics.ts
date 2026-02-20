import { apiFetch } from "./http";

export type MetricsSummary = {
    revenue: number;
    adSpend: number;
    orders: number;
    roas: number;
};

export async function getSummary(storeId: string, from?: string, to?: string): Promise<MetricsSummary> {
    const params = new URLSearchParams({ storeId });
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    const res = await apiFetch(`/api/metrics/summary?${params}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export type MetricRow = {
    date: string;
    channel: string;
    revenue: number;
    adSpend: number;
    orders: number;
};

export async function getTimeSeries(storeId?: string, from?: string, to?: string): Promise<MetricRow[]> {
    const params = new URLSearchParams();
    if (storeId) params.set("storeId", storeId);
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    const res = await apiFetch(`/api/metrics/timeseries?${params}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export type ChannelMetric = {
    channel: string;
    orders: number;
    canceledOrders: number;
    completedOrders: number;
    revenue: number;
    adSpend: number;
    avgPrice: number;
};

export async function getChannelMetrics(params: { from?: string; to?: string } = {}): Promise<ChannelMetric[]> {
    const qs = new URLSearchParams();
    if (params.from) qs.set("from", params.from);
    if (params.to) qs.set("to", params.to);

    const res = await apiFetch(`/api/metrics/channels?${qs}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}
