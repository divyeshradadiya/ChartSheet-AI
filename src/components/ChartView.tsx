"use client";

import { Card } from "@/components/ui/card";
import { ChartConfig } from "@/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartViewProps {
  config: ChartConfig;
}

export default function ChartView({ config }: ChartViewProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: config.title,
        font: {
          size: 16,
        },
      },
    },
    ...(config.type !== "pie" &&
      config.type !== "doughnut" && {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }),
  };

  const renderChart = () => {
    switch (config.type) {
      case "bar":
        return <Bar data={config.data} options={options} />;
      case "line":
        return <Line data={config.data} options={options} />;
      case "pie":
        return <Pie data={config.data} options={options} />;
      case "doughnut":
        return <Doughnut data={config.data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0">{renderChart()}</div>
      <div className="mt-4 pt-2 border-t text-sm text-muted-foreground shrink-0">
        {config.type.charAt(0).toUpperCase() + config.type.slice(1)} Chart:{" "}
        {config.title}
      </div>
    </Card>
  );
}
