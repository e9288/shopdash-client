import { useState, useEffect } from "react";
import { useAuth } from "../../shared/auth/AuthProvider";
import { getChannelMetrics } from "../../api/metrics";
import type { ChannelMetric } from "../../api/metrics";
import styles from "./StoreHome.module.css";

function todayStr() {
    return new Date().toISOString().slice(0, 10);
}

function fmt(n: number) {
    return n.toLocaleString("ko-KR");
}

function fmtWon(n: number) {
    return n.toLocaleString("ko-KR") + "원";
}

export default function StoreHome() {
    const { user } = useAuth();
    const today = todayStr();

    const [from, setFrom] = useState(today);
    const [to, setTo] = useState(today);
    const [metrics, setMetrics] = useState<ChannelMetric[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchMetrics() {
        setLoading(true);
        setError(null);
        try {
            const data = await getChannelMetrics({ from, to });
            setMetrics(data);
        } catch {
            setError("데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMetrics();
    }, [from, to]);

    function setPreset(days: number) {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1));
        setFrom(d.toISOString().slice(0, 10));
        setTo(today);
    }

    const totals = metrics.reduce(
        (acc, m) => ({
            orders: acc.orders + m.orders,
            canceledOrders: acc.canceledOrders + m.canceledOrders,
            completedOrders: acc.completedOrders + m.completedOrders,
            revenue: acc.revenue + m.revenue,
        }),
        { orders: 0, canceledOrders: 0, completedOrders: 0, revenue: 0 }
    );

    const cancelRate =
        totals.orders === 0 ? 0 : Math.round((totals.canceledOrders / totals.orders) * 100);

    // suppress unused variable warning
    void user;

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>스토어 대시보드</h1>
                    <p className={styles.subtitle}>플랫폼별 주문 현황</p>
                </div>
            </div>

            {/* 날짜 필터 */}
            <div className={styles.filterBar}>
                <div className={styles.dateInputs}>
                    <div className={styles.dateGroup}>
                        <label className={styles.dateLabel}>시작일</label>
                        <input
                            type="date"
                            value={from}
                            max={to}
                            onChange={(e) => setFrom(e.target.value)}
                            className={styles.dateInput}
                        />
                    </div>
                    <span className={styles.dateSep}>~</span>
                    <div className={styles.dateGroup}>
                        <label className={styles.dateLabel}>종료일</label>
                        <input
                            type="date"
                            value={to}
                            min={from}
                            max={today}
                            onChange={(e) => setTo(e.target.value)}
                            className={styles.dateInput}
                        />
                    </div>
                </div>
                <div className={styles.presetButtons}>
                    <button
                        className={`${styles.preset} ${from === today && to === today ? styles.presetActive : ""}`}
                        onClick={() => { setFrom(today); setTo(today); }}
                    >
                        오늘
                    </button>
                    <button className={styles.preset} onClick={() => setPreset(7)}>최근 7일</button>
                    <button className={styles.preset} onClick={() => setPreset(30)}>최근 30일</button>
                </div>
            </div>

            {/* 요약 카드 */}
            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <div className={styles.cardIcon}>💰</div>
                    <div className={styles.cardLabel}>총 매출</div>
                    <div className={styles.cardValue}>{fmtWon(totals.revenue)}</div>
                </div>
                <div className={styles.summaryCard}>
                    <div className={styles.cardIcon}>🛒</div>
                    <div className={styles.cardLabel}>총 주문</div>
                    <div className={styles.cardValue}>{fmt(totals.orders)}건</div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardDanger}`}>
                    <div className={styles.cardIcon}>❌</div>
                    <div className={styles.cardLabel}>취소건수</div>
                    <div className={styles.cardValue}>{fmt(totals.canceledOrders)}건</div>
                    <div className={styles.cardSub}>취소율 {cancelRate}%</div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardSuccess}`}>
                    <div className={styles.cardIcon}>✅</div>
                    <div className={styles.cardLabel}>완료건수</div>
                    <div className={styles.cardValue}>{fmt(totals.completedOrders)}건</div>
                </div>
            </div>

            {/* 채널별 테이블 */}
            <div className={styles.tableSection}>
                <h2 className={styles.tableTitle}>플랫폼별 상세</h2>

                {loading ? (
                    <div className={styles.stateBox}>
                        <div className={styles.spinner} />
                        <span>데이터 로딩 중...</span>
                    </div>
                ) : error ? (
                    <div className={styles.stateBox}>
                        <p className={styles.errorText}>{error}</p>
                        <button className={styles.retryBtn} onClick={fetchMetrics}>다시 시도</button>
                    </div>
                ) : metrics.length === 0 ? (
                    <div className={styles.stateBox}>
                        <p className={styles.emptyText}>선택한 기간에 데이터가 없습니다.</p>
                    </div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>플랫폼</th>
                                    <th>주문건수</th>
                                    <th>취소건수</th>
                                    <th>완료건수</th>
                                    <th>평균단가</th>
                                    <th>매출액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.map((m) => (
                                    <tr key={m.channel}>
                                        <td>
                                            <span className={styles.channelBadge}>{m.channel}</span>
                                        </td>
                                        <td>{fmt(m.orders)}</td>
                                        <td className={styles.canceledCell}>{fmt(m.canceledOrders)}</td>
                                        <td className={styles.completedCell}>{fmt(m.completedOrders)}</td>
                                        <td>{fmtWon(m.avgPrice)}</td>
                                        <td className={styles.revenueCell}>{fmtWon(m.revenue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className={styles.totalRow}>
                                    <td>합계</td>
                                    <td>{fmt(totals.orders)}</td>
                                    <td className={styles.canceledCell}>{fmt(totals.canceledOrders)}</td>
                                    <td className={styles.completedCell}>{fmt(totals.completedOrders)}</td>
                                    <td>—</td>
                                    <td className={styles.revenueCell}>{fmtWon(totals.revenue)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
