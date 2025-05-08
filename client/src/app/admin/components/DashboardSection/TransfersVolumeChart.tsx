// frontend/src/components/DashboardSection/TransfersVolumeChart.tsx
import React from 'react';
import { VolumeChart } from './VolumeChart'; // Adjust path if needed

export default function TransfersVolumeChart() {
    return (
        <VolumeChart
            title="Send Money Volume"
            description="Total completed Send Money volume sent."
            chartType="transfers"
            yAxisLabel="Sent Amount"
            dataKey="volume"
        />
    );
}