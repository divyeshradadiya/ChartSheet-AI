import OpenAI from "openai";
import { CSVTools } from "./csvTools";
import { Message, ToolCall, ToolResult } from "@/types";

export class ZypherAgent {
  private openai: OpenAI;
  private csvTools: CSVTools;
  private model: string;

  constructor(apiKey: string, model: string = "anthropic/claude-3.5-sonnet") {
    this.openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
    });
    this.csvTools = new CSVTools();
    this.model = model;
  }

  private getToolDefinitions() {
    return [
      {
        type: "function",
        function: {
          name: "read_csv",
          description:
            "Read and parse a CSV file content. This must be called first before any other operations.",
          parameters: {
            type: "object",
            properties: {
              csvContent: {
                type: "string",
                description: "The CSV file content as a string",
              },
            },
            required: ["csvContent"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "add_column",
          description:
            "Add a new column to the CSV data with an optional default value",
          parameters: {
            type: "object",
            properties: {
              columnName: {
                type: "string",
                description: "Name of the new column to add",
              },
              defaultValue: {
                type: "string",
                description: "Default value for all rows in the new column",
              },
            },
            required: ["columnName"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "remove_column",
          description: "Remove a column from the CSV data",
          parameters: {
            type: "object",
            properties: {
              columnName: {
                type: "string",
                description: "Name of the column to remove",
              },
            },
            required: ["columnName"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "filter_rows",
          description: "Filter rows based on a condition",
          parameters: {
            type: "object",
            properties: {
              columnName: {
                type: "string",
                description: "Column to filter on",
              },
              operator: {
                type: "string",
                enum: ["equals", "contains", "greater", "less"],
                description: "Comparison operator",
              },
              value: {
                type: "string",
                description: "Value to compare against",
              },
            },
            required: ["columnName", "operator", "value"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "sort_data",
          description: "Sort the CSV data by a specific column",
          parameters: {
            type: "object",
            properties: {
              columnName: {
                type: "string",
                description: "Column to sort by",
              },
              direction: {
                type: "string",
                enum: ["asc", "desc"],
                description: "Sort direction: ascending or descending",
              },
            },
            required: ["columnName", "direction"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "analyze_data",
          description:
            "Get statistical analysis of a column (mean, max, min, count for numeric columns, or unique values and distribution for categorical columns)",
          parameters: {
            type: "object",
            properties: {
              columnName: {
                type: "string",
                description: "Column to analyze",
              },
            },
            required: ["columnName"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "create_chart",
          description:
            "Create a chart visualization from the CSV data. Use this when user asks to visualize, graph, or chart the data.",
          parameters: {
            type: "object",
            properties: {
              chartType: {
                type: "string",
                enum: ["bar", "line", "pie", "doughnut"],
                description: "Type of chart to create",
              },
              title: {
                type: "string",
                description: "Title for the chart",
              },
              xColumn: {
                type: "string",
                description: "Column to use for X-axis (labels)",
              },
              yColumn: {
                type: "string",
                description: "Column to use for Y-axis (values)",
              },
            },
            required: ["chartType", "title", "xColumn", "yColumn"],
          },
        },
      },
    ];
  }

  private async executeTool(toolCall: ToolCall): Promise<ToolResult> {
    const { name, arguments: args } = toolCall;

    switch (name) {
      case "read_csv":
        return await this.csvTools.readCSV(args.csvContent);
      case "add_column":
        return await this.csvTools.addColumn(
          args.columnName,
          args.defaultValue
        );
      case "remove_column":
        return await this.csvTools.removeColumn(args.columnName);
      case "filter_rows":
        return await this.csvTools.filterRows(
          args.columnName,
          args.operator,
          args.value
        );
      case "sort_data":
        return await this.csvTools.sortData(args.columnName, args.direction);
      case "analyze_data":
        return await this.csvTools.analyzeData(args.columnName);
      case "create_chart":
        return await this.csvTools.createChart(
          args.chartType,
          args.title,
          args.xColumn,
          args.yColumn
        );
      default:
        return {
          success: false,
          message: `Unknown tool: ${name}`,
        };
    }
  }

  async runTask(
    messages: Message[],
    csvContent?: string
  ): Promise<{ messages: Message[]; csvData?: any; chartConfig?: any }> {
    try {
      // Convert messages to OpenAI format
      const openaiMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add system message if CSV content is provided
      if (csvContent) {
        openaiMessages.unshift({
          role: "system",
          content: `You are ChartSheet AI, an expert data analyst assistant. You help users analyze, manipulate, and visualize CSV data.

Current CSV data is loaded. Available tools:
- read_csv: Parse CSV content (already done if CSV is loaded)
- add_column: Add a new column
- remove_column: Remove a column
- filter_rows: Filter rows by condition
- sort_data: Sort by column
- analyze_data: Get statistics
- create_chart: Create visualizations (bar, line, pie, doughnut)

When user asks to visualize or chart data:
1. Use create_chart tool with appropriate parameters
2. Choose the right chart type based on the data
3. Select meaningful columns for x and y axes

Be conversational and helpful. Explain what you're doing.`,
        });
      }

      let response = await this.openai.chat.completions.create({
        model: this.model,
        messages: openaiMessages as any,
        tools: this.getToolDefinitions() as any,
        tool_choice: "auto",
      });

      let assistantMessage = response.choices[0].message;
      const newMessages: Message[] = [...messages];

      // Handle tool calls
      while (
        assistantMessage.tool_calls &&
        assistantMessage.tool_calls.length > 0
      ) {
        // Add assistant message with tool calls
        newMessages.push({
          role: "assistant",
          content:
            assistantMessage.content ||
            "Using tools to process your request...",
        });

        // Execute all tool calls
        const toolResults = await Promise.all(
          assistantMessage.tool_calls.map(async (toolCall: any) => {
            const result = await this.executeTool({
              name: toolCall.function.name,
              arguments: JSON.parse(toolCall.function.arguments),
            });

            return {
              toolCall,
              result,
            };
          })
        );

        // Add tool results to messages
        const toolMessages = toolResults.map(({ toolCall, result }) => ({
          role: "tool" as const,
          content: JSON.stringify(result),
          tool_call_id: toolCall.id,
        }));

        // Get next response
        response = await this.openai.chat.completions.create({
          model: this.model,
          messages: [
            ...openaiMessages,
            assistantMessage,
            ...toolMessages,
          ] as any,
          tools: this.getToolDefinitions() as any,
          tool_choice: "auto",
        });

        assistantMessage = response.choices[0].message;

        // Check for chart or CSV data in tool results
        const chartResult = toolResults.find((r) => r.result.chartConfig);
        const csvResult = toolResults.find((r) => r.result.csvData);

        if (chartResult || csvResult) {
          return {
            messages: [
              ...newMessages,
              {
                role: "assistant",
                content: assistantMessage.content || "Here are your results.",
                chartConfig: chartResult?.result.chartConfig,
                csvData: csvResult?.result.csvData,
              },
            ],
            chartConfig: chartResult?.result.chartConfig,
            csvData:
              csvResult?.result.csvData || this.csvTools.getCurrentData(),
          };
        }
      }

      // Add final assistant message
      newMessages.push({
        role: "assistant",
        content: assistantMessage.content || "Task completed.",
      });

      return {
        messages: newMessages,
        csvData: this.csvTools.getCurrentData(),
      };
    } catch (error) {
      console.error("Agent error:", error);
      throw error;
    }
  }

  setCSVData(csvContent: string) {
    this.csvTools.readCSV(csvContent);
  }
}
