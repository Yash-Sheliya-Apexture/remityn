// frontend/src/components/DashboardSection/TransfersVolumeChart.tsx
import React from "react";
import { VolumeChart } from "./VolumeChart";
import { Send } from "lucide-react"; // Import an icon

export default function TransfersVolumeChart() {
  return (
    <VolumeChart
      title="Send Money Volume"
      description="Total completed Send Money volume sent."
      chartType="transfers"
      icon={<Send className="text-mainheading size-6" />} // Pass the icon here
      yAxisLabel="Sent Amount"
      dataKey="volume"
    />
  );
}
