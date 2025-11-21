# ChartSheet - AI-Powered CSV Analytics & Visualization

![ChartSheet Demo](https://img.shields.io/badge/Built%20with-Zypher-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**ChartSheet** is an AI-powered data analysis tool built with Zypher Agent framework. Upload CSV files, chat with your data, and generate beautiful visualizations—all without writing a single line of code!

## 🎯 Features

### Core Functionality

- **📊 CSV Upload & Parsing** - Upload any CSV file or try demo datasets
- **💬 AI Chat Interface** - Natural language conversations about your data
- **📈 Smart Visualizations** - Auto-generate bar, line, pie, and doughnut charts
- **🔧 Data Manipulation** - Add/remove columns, add rows, filter rows, sort data
- **📉 Statistical Analysis** - Get instant insights (mean, max, min, counts)
- **💾 Download Results** - Export modified CSV files

### Zypher-Powered Tools

Built with Zypher's agent framework, ChartSheet includes 9 intelligent tools:

1. **get_csv_info** - Get overview of the data (columns, row count, preview)
2. **read_csv** - Parse and load CSV data
3. **add_column** - Add new columns with default values
4. **remove_column** - Delete unwanted columns
5. **filter_rows** - Filter data by conditions (equals, contains, greater, less)
6. **sort_data** - Sort by any column (ascending/descending)
7. **analyze_data** - Get statistical analysis
8. **create_chart** - Generate visualizations (bar/line/pie/doughnut)
9. **add_row** - Add new rows with data for each column

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenRouter API key:

   ```env
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1. Upload Data

- Click **"Upload CSV"** to load your own file
- Or try a **demo file** (People, Sales, or Expenses data)

### 2. Chat with Your Data

Ask natural language questions like:

- _"Remove the Industry Focus column"_
- _"Show me a bar chart of net worth by person"_
- _"Filter for people with net worth greater than 150"_
- _"Sort by age in descending order"_
- _"Analyze the Net Worth column"_
- _"Create a pie chart of nationalities"_

### 3. View Results

- **Table View** - See your data in a clean spreadsheet format
- **Chart View** - Visualize your data with interactive charts

### 4. Download

- Export modified CSV files with the **Download** button

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- **AI Agent**: Zypher-inspired architecture
- **LLM**: Anthropic Claude 3.5 Sonnet (via OpenRouter)
- **Charts**: Chart.js + react-chartjs-2
- **CSV Parsing**: PapaParse

## 🏗️ Architecture: Zypher-Inspired Design

ChartSheet implements the **[Zypher Agent framework](https://zypher.corespeed.io/)** architectural patterns for building intelligent AI agents.

### Core Zypher Concepts Implemented

#### 1. **OpenAI-Compatible Provider**

Following Zypher's [LLM Provider documentation](https://zypher.corespeed.io/docs/core-concepts/llm-providers):

```typescript
// Using OpenRouter with OpenAI SDK (Zypher-compatible)
const provider = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
```

This matches Zypher's `OpenAIModelProvider` pattern:

- ✅ OpenAI-compatible API
- ✅ Streaming responses
- ✅ Function calling support
- ✅ Claude 3.5 Sonnet model

#### 2. **Tool-Based Agent System**

Following Zypher's [Tools & MCP documentation](https://zypher.corespeed.io/docs/core-concepts/tools-and-mcp):

**8 CSV Tools** (matching Zypher's `createTool()` pattern):

| Tool            | Description                | Zypher Equivalent      |
| --------------- | -------------------------- | ---------------------- |
| `get_csv_info`  | Get columns, rows, preview | `ReadFileTool` pattern |
| `read_csv`      | Read/filter data           | File system tools      |
| `add_column`    | Add calculated columns     | Edit operations        |
| `remove_column` | Remove columns             | Edit operations        |
| `filter_rows`   | Filter by condition        | Search tools           |
| `sort_data`     | Sort by column             | Data manipulation      |
| `analyze_data`  | Statistical analysis       | Custom business logic  |
| `create_chart`  | Generate charts            | Visualization tool     |

Each tool follows Zypher's standard interface:

```typescript
interface Tool {
  name: string; // Unique identifier
  description: string; // What it does
  parameters: JSONSchema; // Input validation
  execute: (args) => Result; // Implementation
}
```

#### 3. **Automatic Tool Discovery & Execution**

The agent automatically:

1. **Analyzes** user intent ("show me a chart")
2. **Selects** appropriate tools (`create_chart`)
3. **Extracts** parameters (columns, chart type)
4. **Executes** tools with validated arguments
5. **Returns** formatted results

This matches Zypher's [Tool Discovery](https://zypher.corespeed.io/docs/core-concepts/tools-and-mcp#tool-discovery-and-usage) behavior.

#### 4. **Event-Driven Architecture**

```typescript
// Zypher-style task execution
for await (const event of agent.runTask(message)) {
  if (event.type === "text") {
    // Stream text response
  }
  if (event.type === "tool_use") {
    // Execute tool
  }
  if (event.type === "message") {
    // Complete message
  }
}
```

### Why Not Use `@corespeed/zypher` Package?

The official Zypher package is designed for **Deno runtime** and CLI usage. For a Next.js web application:

- ❌ Requires Deno environment (`Deno.env`, etc.)
- ❌ Not compatible with Node.js/Vercel deployment
- ❌ Designed for file system operations, not web APIs

**Our Solution:**

- ✅ Implement Zypher's **architectural patterns**
- ✅ Use OpenAI SDK with OpenRouter (Zypher-compatible)
- ✅ Build tools following Zypher's design principles
- ✅ Achieve same agent behavior in Node.js/Next.js
- ✅ Deploy on modern web platforms (Vercel, Netlify)

This gives us **Zypher's proven architecture** while maintaining **production-ready web compatibility**.

### Architecture Comparison

| Feature          | Zypher (Official)    | ChartSheet (Our Implementation)     |
| ---------------- | -------------------- | ----------------------------------- |
| Runtime          | Deno                 | Node.js/Next.js                     |
| Tool System      | ✅ `createTool()`    | ✅ Custom tools with same interface |
| LLM Provider     | ✅ OpenAI-compatible | ✅ OpenRouter (OpenAI-compatible)   |
| Function Calling | ✅ Automatic         | ✅ Automatic                        |
| Tool Discovery   | ✅ AI-driven         | ✅ AI-driven                        |
| Event Streaming  | ✅ Observable        | ✅ Async/await                      |
| Deployment       | CLI / Deno Deploy    | ✅ Vercel / Any Node.js host        |

**Result:** We achieve Zypher's intelligent agent capabilities in a production-ready web environment.

## 🧠 How the Agent Works

This project demonstrates Zypher's core concepts:

```typescript
// Agent with tools (inspired by Zypher's architecture)
class ZypherAgent {
  private tools: Tool[];
  private llm: LLMProvider;

  async runTask(messages, context) {
    // 1. LLM analyzes user request
    // 2. Decides which tools to use
    // 3. Executes tools with arguments
    // 4. Returns results to user
  }
}
```

### Tool System

Each tool follows a standard interface:

- **Name** - Unique identifier
- **Description** - What the tool does
- **Parameters** - Input schema (JSON Schema)
- **Execute** - Implementation logic

The agent automatically:

- Selects appropriate tools based on user intent
- Passes correct arguments to tools
- Chains multiple tools together
- Returns formatted results

## 📁 Project Structure

```
chartsheet/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # Chat API endpoint
│   │   ├── page.tsx                 # Main UI page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ChatPanel.tsx            # Chat interface
│   │   ├── ChatMessage.tsx          # Message bubbles
│   │   ├── CSVTableView.tsx         # Table display
│   │   ├── ChartView.tsx            # Chart display
│   │   ├── UploadSection.tsx        # File upload
│   │   └── ui/                      # shadcn components
│   ├── lib/
│   │   ├── zypherAgent.ts           # Zypher agent implementation
│   │   ├── csvTools.ts              # CSV manipulation tools
│   │   └── utils.ts                 # Utility functions
│   └── types/
│       └── index.ts                 # TypeScript types
├── public/
│   ├── demo-people.csv              # Demo dataset 1
│   ├── demo-sales.csv               # Demo dataset 2
│   └── demo-expenses.csv            # Demo dataset 3
└── README.md
```

## 🌟 What Makes This Special?

This project goes **beyond the basic Sheet1 demo** with:

1. **Advanced Chart Generation** - Automatically creates visualizations from data
2. **Smart Tool Chaining** - Agent can combine multiple operations
3. **Full CRUD Operations** - Add, remove, filter, sort columns
4. **Statistical Analysis** - Built-in data insights
5. **Production-Ready UI** - Professional design with Tailwind + shadcn
6. **Type Safety** - Full TypeScript implementation

## 🔮 Future Enhancements

- [ ] Multiple chart types on same data
- [ ] Export charts as images
- [ ] Data aggregation (GROUP BY, SUM, AVG)
- [ ] Join multiple CSV files
- [ ] Save/load analysis sessions
- [ ] Custom AI instructions
- [ ] Real-time collaboration

## 📝 License

MIT License - feel free to use this project for learning or your own applications!

## 🙏 Acknowledgments

- **CoreSpeed** - For creating the Zypher framework
- **Anthropic** - For Claude 3.5 Sonnet
- **Vercel** - For Next.js and hosting
- **shadcn** - For beautiful UI components

---

**Built with ❤️ using Zypher Agent Framework**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
