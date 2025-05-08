// frontend/src/components/DashboardSection/PaymentsVolumeChart.tsx
import React from 'react';
import { VolumeChart } from './VolumeChart'; // Adjust path if needed

export default function PaymentsVolumeChart() {
    return (
        <VolumeChart
            title="Add Money Volume"
            description="Total incoming Add Money volume."
            chartType="payments"
            yAxisLabel="Payment Amount"
            dataKey="volume"
        />
    );
}