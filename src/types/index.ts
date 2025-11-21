export interface CSVData {
  headers: string[];
  rows: any[][];
}

export interface ChartConfig {
  type: "bar" | "line" | "pie" | "doughnut";
  title: string;
  xAxis?: string;
  yAxis?: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }[];
  };
}

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  chartConfig?: ChartConfig;
  csvData?: CSVData;
}

export interface ToolCall {
  name: string;
  arguments: any;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  message?: string;
  csvData?: CSVData;
  chartConfig?: ChartConfig;
}
