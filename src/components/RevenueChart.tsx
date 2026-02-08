import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,} from "recharts";
import type { MetricRow } from "../api/metrics";

// 상위 App에서 전달한 rows를 Props를 통해 받는다
type Props = {
    rows: MetricRow[];
};

export default function RevenueChart({ rows }: Props) {
    console.log("RevenueChart rows : ", rows);
    return (
        <div style={{border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, height: 320}}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>매출 추이(Revenue)</div>

            {/* 차트는 높이가 있어야 그려지기 때문에 상위 div에 height 320 지정. 
            ResponsiveContainer 이용하여 반응형 처리 */}
            <ResponsiveContainer width="100%" height="90%">
                {/* rows를 data로 전달하여 차트 그리기 */}
                <LineChart data={rows}>
                    {/* 격자 설정 */}
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* X축 설정 : date */}
                    <XAxis dataKey="date" />
                    {/* Y축 기본 설정 */}
                    <YAxis />
                    <Tooltip />
                    {/* revenue 필드 선으로 그리기 */}
                    {/* rows[i].revenue 값이 삽입됨 */}
                    <Line type="monotone" dataKey="revenue" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}