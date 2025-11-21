import Papa from "papaparse";
import { CSVData, ChartConfig, ToolResult } from "@/types";

export class CSVTools {
  private csvData: CSVData | null = null;

  // Tool 0: Get CSV Info
  async getCSVInfo(): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      // Get a preview of the data (first 3 rows)
      const preview = this.csvData.rows
        .slice(0, 3)
        .map((row) =>
          this.csvData!.headers.map(
            (header, idx) => `${header}: ${row[idx]}`
          ).join(", ")
        )
        .join("\n");

      const info = `CSV Data Summary:
- Total rows: ${this.csvData.rows.length}
- Columns (${this.csvData.headers.length}): ${this.csvData.headers.join(", ")}

Preview of first 3 rows:
${preview}`;

      return {
        success: true,
        message: info,
        data: {
          rowCount: this.csvData.rows.length,
          columnCount: this.csvData.headers.length,
          headers: this.csvData.headers,
          preview: this.csvData.rows.slice(0, 3),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to get CSV info: ${error}`,
      };
    }
  }

  // Tool 1: Read CSV
  async readCSV(csvContent: string): Promise<ToolResult> {
    try {
      const result = Papa.parse(csvContent, {
        header: false,
        skipEmptyLines: true,
      });

      if (result.errors.length > 0) {
        return {
          success: false,
          message: `CSV parsing errors: ${result.errors
            .map((e) => e.message)
            .join(", ")}`,
        };
      }

      const data = result.data as string[][];
      this.csvData = {
        headers: data[0],
        rows: data.slice(1),
      };

      return {
        success: true,
        message: `CSV loaded successfully with ${this.csvData.rows.length} rows and ${this.csvData.headers.length} columns`,
        csvData: this.csvData,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to read CSV: ${error}`,
      };
    }
  }

  // Tool 2: Add Column
  async addColumn(
    columnName: string,
    defaultValue: string = ""
  ): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      this.csvData.headers.push(columnName);
      this.csvData.rows = this.csvData.rows.map((row) => [
        ...row,
        defaultValue,
      ]);

      return {
        success: true,
        message: `Column "${columnName}" added successfully`,
        csvData: this.csvData,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add column: ${error}`,
      };
    }
  }

  // Tool 3: Remove Column
  async removeColumn(columnName: string): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      const columnIndex = this.csvData.headers.indexOf(columnName);
      if (columnIndex === -1) {
        return {
          success: false,
          message: `Column "${columnName}" not found`,
        };
      }

      this.csvData.headers.splice(columnIndex, 1);
      this.csvData.rows = this.csvData.rows.map((row) => {
        const newRow = [...row];
        newRow.splice(columnIndex, 1);
        return newRow;
      });

      return {
        success: true,
        message: `Column "${columnName}" removed successfully`,
        csvData: this.csvData,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove column: ${error}`,
      };
    }
  }

  // Tool 4: Filter Rows
  async filterRows(
    columnName: string,
    operator: "equals" | "contains" | "greater" | "less",
    value: string
  ): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      const columnIndex = this.csvData.headers.indexOf(columnName);
      if (columnIndex === -1) {
        return {
          success: false,
          message: `Column "${columnName}" not found`,
        };
      }

      const filteredRows = this.csvData.rows.filter((row) => {
        const cellValue = row[columnIndex]?.toString() || "";

        switch (operator) {
          case "equals":
            return cellValue.toLowerCase() === value.toLowerCase();
          case "contains":
            return cellValue.toLowerCase().includes(value.toLowerCase());
          case "greater":
            return parseFloat(cellValue) > parseFloat(value);
          case "less":
            return parseFloat(cellValue) < parseFloat(value);
          default:
            return true;
        }
      });

      this.csvData.rows = filteredRows;

      return {
        success: true,
        message: `Filtered to ${filteredRows.length} rows where ${columnName} ${operator} ${value}`,
        csvData: this.csvData,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to filter rows: ${error}`,
      };
    }
  }

  // Tool 5: Sort Data
  async sortData(
    columnName: string,
    direction: "asc" | "desc"
  ): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      const columnIndex = this.csvData.headers.indexOf(columnName);
      if (columnIndex === -1) {
        return {
          success: false,
          message: `Column "${columnName}" not found`,
        };
      }

      this.csvData.rows.sort((a, b) => {
        const aVal = a[columnIndex];
        const bVal = b[columnIndex];

        // Try numeric comparison first
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        // Fall back to string comparison
        const comparison = String(aVal).localeCompare(String(bVal));
        return direction === "asc" ? comparison : -comparison;
      });

      return {
        success: true,
        message: `Data sorted by ${columnName} in ${direction}ending order`,
        csvData: this.csvData,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to sort data: ${error}`,
      };
    }
  }

  // Tool 6: Analyze Data
  async analyzeData(columnName: string): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      const columnIndex = this.csvData.headers.indexOf(columnName);
      if (columnIndex === -1) {
        return {
          success: false,
          message: `Column "${columnName}" not found`,
        };
      }

      const values = this.csvData.rows.map((row) => row[columnIndex]);
      const numericValues = values
        .map((v) => parseFloat(v))
        .filter((v) => !isNaN(v));

      if (numericValues.length > 0) {
        const sum = numericValues.reduce((a, b) => a + b, 0);
        const avg = sum / numericValues.length;
        const max = Math.max(...numericValues);
        const min = Math.min(...numericValues);

        return {
          success: true,
          message: `Analysis of ${columnName}:\n- Count: ${
            numericValues.length
          }\n- Average: ${avg.toFixed(
            2
          )}\n- Max: ${max}\n- Min: ${min}\n- Sum: ${sum.toFixed(2)}`,
          data: { count: numericValues.length, avg, max, min, sum },
        };
      } else {
        // Categorical analysis
        const uniqueValues = [...new Set(values)];
        const counts = uniqueValues.map((val) => ({
          value: val,
          count: values.filter((v) => v === val).length,
        }));

        return {
          success: true,
          message: `Analysis of ${columnName}:\n- Unique values: ${
            uniqueValues.length
          }\n- Total count: ${values.length}\n- Distribution: ${counts
            .map((c) => `${c.value}: ${c.count}`)
            .join(", ")}`,
          data: { uniqueValues, counts },
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to analyze data: ${error}`,
      };
    }
  }

  // Tool 7: Create Chart
  async createChart(
    chartType: "bar" | "line" | "pie" | "doughnut",
    title: string,
    xColumn: string,
    yColumn: string
  ): Promise<ToolResult> {
    if (!this.csvData) {
      return { success: false, message: "No CSV data loaded" };
    }

    try {
      const xIndex = this.csvData.headers.indexOf(xColumn);
      const yIndex = this.csvData.headers.indexOf(yColumn);

      if (xIndex === -1 || yIndex === -1) {
        return {
          success: false,
          message: `Column not found: ${xIndex === -1 ? xColumn : yColumn}`,
        };
      }

      const labels = this.csvData.rows.map((row) => String(row[xIndex]));
      const data = this.csvData.rows.map((row) => parseFloat(row[yIndex]) || 0);

      const colors = [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(249, 115, 22, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(234, 179, 8, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(20, 184, 166, 0.8)",
      ];

      const chartConfig: ChartConfig = {
        type: chartType,
        title,
        xAxis: xColumn,
        yAxis: yColumn,
        data: {
          labels,
          datasets: [
            {
              label: yColumn,
              data,
              backgroundColor:
                chartType === "pie" || chartType === "doughnut"
                  ? colors.slice(0, data.length)
                  : colors[0],
              borderColor:
                chartType === "pie" || chartType === "doughnut"
                  ? colors
                      .slice(0, data.length)
                      .map((c) => c.replace("0.8", "1"))
                  : colors[0].replace("0.8", "1"),
            },
          ],
        },
      };

      console.log("Chart tool returning:", {
        success: true,
        hasChartConfig: true,
        chartType,
        title,
      });

      return {
        success: true,
        message: `Created ${chartType} chart: ${title}`,
        chartConfig,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create chart: ${error}`,
      };
    }
  }

  // Get current CSV data
  getCurrentData(): CSVData | null {
    return this.csvData;
  }

  // Set CSV data (for loading from state)
  setData(data: CSVData) {
    this.csvData = data;
  }
}
