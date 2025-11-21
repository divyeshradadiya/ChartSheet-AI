# ChartSheet - Technical Documentation

## Overview

ChartSheet is an AI-powered CSV analytics and visualization tool built using Zypher Agent framework principles. It demonstrates how to build intelligent agents that can understand natural language, execute tools, and provide meaningful insights from data.

## Architecture

### 1. Agent System (`src/lib/zypherAgent.ts`)

The core agent follows Zypher's architecture pattern:

```typescript
class ZypherAgent {
  - LLM Provider (OpenRouter/Claude)
  - Tool Registry (7 CSV tools)
  - Message History
  - Tool Execution Loop
}
```

**Key Features:**

- Tool calling with function definitions
- Automatic tool selection based on user intent
- Tool chaining for complex operations
- Result streaming back to UI

### 2. Tool System (`src/lib/csvTools.ts`)

Each tool implements a standard interface:

```typescript
interface Tool {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute: (args) => Promise<ToolResult>;
}
```

**Available Tools:**

1. `read_csv` - Parse CSV content
2. `add_column` - Add new column with default value
3. `remove_column` - Remove column by name
4. `filter_rows` - Filter by condition (equals/contains/greater/less)
5. `sort_data` - Sort by column (asc/desc)
6. `analyze_data` - Statistical analysis (numeric) or distribution (categorical)
7. `create_chart` - Generate visualizations (bar/line/pie/doughnut)

### 3. API Layer (`src/app/api/chat/route.ts`)

Next.js API route that:

- Receives user messages + CSV context
- Initializes Zypher agent
- Executes agent.runTask()
- Returns updated messages, CSV data, and chart configs

### 4. Frontend (`src/app/page.tsx` + components)

React components with:

- File upload (native + demo files)
- Chat interface with message history
- Tabbed view (Table/Chart)
- Real-time updates as agent responds

## Data Flow

```
1. User uploads CSV → Parse with PapaParse → Display in table
2. User sends message → POST /api/chat
3. Agent receives message + CSV content
4. LLM analyzes request → Selects tools
5. Tools execute sequentially/parallel
6. Results returned → Update UI
   - CSV changes → Update table
   - Chart request → Switch to chart tab
   - Analysis → Show in chat
```

## Zypher Integration

While Zypher officially uses Deno, this project adapts its concepts for Node.js/Next.js:

**Zypher Concepts Used:**

- ✅ Tool-based architecture
- ✅ LLM provider abstraction (OpenRouter)
- ✅ Automatic tool calling
- ✅ Message-based interaction
- ✅ Streaming results

**Differences from Native Zypher:**

- Uses OpenAI SDK instead of Zypher SDK (for Node.js compatibility)
- Custom tool execution loop
- Next.js API routes instead of Deno server
- No MCP server integration (could be added)

## Key Technologies

### Backend

- **OpenAI SDK** - LLM communication
- **OpenRouter** - LLM gateway (access to Claude/GPT/etc)
- **PapaParse** - CSV parsing
- **Next.js API Routes** - Serverless functions

### Frontend

- **React 18** - UI library
- **Next.js 15** - Framework (App Router)
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Chart.js** - Visualization
- **TypeScript** - Type safety

## Environment Variables

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
```

Get your key from: https://openrouter.ai/keys

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add `OPENROUTER_API_KEY` environment variable
4. Deploy

### Other Platforms

- Netlify: Works with Next.js adapter
- Railway/Render: Docker deployment
- Self-hosted: Use `npm run build && npm start`

## Example Interactions

### 1. Basic Query

```
User: "Show me the data"
Agent: Displays CSV table
```

### 2. Column Manipulation

```
User: "Remove the Industry Focus column"
Agent: Uses remove_column tool → Updates table
```

### 3. Filtering

```
User: "Filter for net worth greater than 150"
Agent: Uses filter_rows tool → Shows filtered data
```

### 4. Visualization

```
User: "Create a bar chart of net worth by person"
Agent: Uses create_chart tool → Switches to chart tab
```

### 5. Analysis

```
User: "Analyze the Age column"
Agent: Uses analyze_data tool → Returns statistics
```

### 6. Complex Chaining

```
User: "Sort by age, then show top 5 in a chart"
Agent:
  1. Uses sort_data (Age, desc)
  2. Uses filter_rows (keep top 5)
  3. Uses create_chart (bar chart)
```

## Adding New Tools

1. Add tool to `csvTools.ts`:

```typescript
async newTool(param: string): Promise<ToolResult> {
  // Implementation
  return { success: true, message: 'Done!', csvData: this.csvData };
}
```

2. Register in `zypherAgent.ts`:

```typescript
{
  type: 'function',
  function: {
    name: 'new_tool',
    description: 'What it does',
    parameters: {
      type: 'object',
      properties: {
        param: { type: 'string', description: 'Param description' }
      },
      required: ['param']
    }
  }
}
```

3. Add to execution switch:

```typescript
case 'new_tool':
  return await this.csvTools.newTool(args.param);
```

## Performance Considerations

- **CSV Size**: Currently handles files up to ~10MB (increase with streaming parser)
- **LLM Latency**: ~2-5 seconds per request (Claude 3.5)
- **Chart Rendering**: Instant with Chart.js
- **API Timeouts**: 30s default (adjust for large files)

## Security

- ✅ API key stored in environment variables
- ✅ No client-side API key exposure
- ✅ CSV parsing sanitized (PapaParse)
- ⚠️ Rate limiting: Implement for production
- ⚠️ File size limits: Add validation
- ⚠️ User authentication: Not implemented (add if needed)

## Testing Strategy

### Manual Testing Checklist

- [ ] Upload custom CSV
- [ ] Load each demo file
- [ ] Test each tool via chat
- [ ] Generate each chart type
- [ ] Download modified CSV
- [ ] Clear data
- [ ] Error handling (invalid requests)

### Automated Testing (Future)

- Unit tests for csvTools.ts
- Integration tests for API routes
- E2E tests with Playwright

## Troubleshooting

### "OPENROUTER_API_KEY not configured"

- Create `.env.local` file
- Add: `OPENROUTER_API_KEY=your_key_here`
- Restart dev server

### Charts not rendering

- Check browser console for Chart.js errors
- Verify data has numeric values for Y-axis
- Ensure chartConfig is properly formatted

### Agent not responding

- Check OpenRouter API status
- Verify API key is valid
- Check network tab for API errors
- Look at server logs

### CSV parsing errors

- Ensure file is valid CSV format
- Check for proper delimiters (commas)
- Verify no special characters in headers

## Contributing

This is a technical assessment project, but feel free to:

1. Fork the repo
2. Add features
3. Submit PRs
4. Open issues

## License

MIT - Use freely for learning and projects

## Contact

For questions about this implementation:

- Open an issue on GitHub
- Email: [your-email]

---

**Built for CoreSpeed Technical Assessment**
_Demonstrating Zypher Agent Framework capabilities_
