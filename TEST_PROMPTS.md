# 🧪 Test Prompts - ChartSheet

Use these prompts to test and demo ChartSheet's capabilities.

---

## 📊 People Dataset (demo-people.csv)

### Basic Operations

```
Show me the data
Remove the Industry Focus column
Add a new column called "Rank"
Sort by net worth in descending order
Sort by age in ascending order
```

### Filtering

```
Filter for Americans only
Filter for people with net worth greater than 150
Filter for people with net worth less than 140
Show me only people from Europe (contains "French")
Filter for people older than 70
```

### Analysis

```
Analyze the Net Worth column
Analyze the Age column
What's the average net worth?
Show me unique nationalities
How many people are there?
```

### Charts - Bar

```
Show me a bar chart of net worth by person
Create a bar chart of age by name
Make a bar chart showing net worth by person
```

### Charts - Pie

```
Create a pie chart of nationalities
Show me a pie chart of net worth distribution
Make a pie chart of age groups
```

### Charts - Line

```
Create a line chart of net worth by age
Show a line chart of net worth over age
```

### Charts - Doughnut

```
Make a doughnut chart of nationalities
Create a doughnut chart of net worth by person
```

### Complex Queries (Tool Chaining)

```
Sort by net worth, then show me the top 5 in a bar chart
Filter for net worth greater than 150, then show a pie chart
Remove Industry Focus column, then show net worth chart
Sort by age descending, filter for people over 60, then create a bar chart of net worth
Analyze net worth, then show me a bar chart
```

---

## 💰 Sales Dataset (demo-sales.csv)

### Basic Operations

```
Show me the sales data
Remove the Region column
Sort by sales in descending order
Sort by month
```

### Filtering

```
Filter for North America only
Show me only Laptop sales
Filter for sales greater than 200
Show me February data only
Filter for revenue greater than 200000
```

### Analysis

```
Analyze the Sales column
Analyze the Revenue column
What's the average sales?
Show me unique products
How many regions are there?
```

### Charts

```
Show me a bar chart of sales by product
Create a line chart of sales by month
Make a pie chart of revenue by region
Show a bar chart of sales by region
Create a line chart of revenue over time
Make a doughnut chart of product distribution
```

### Complex Queries

```
Filter for North America, then show sales chart
Sort by revenue, show top 5 in a bar chart
Show me Laptop sales as a line chart
Filter for sales > 200, then create a bar chart
```

---

## 💸 Expenses Dataset (demo-expenses.csv)

### Basic Operations

```
Show me the expenses
Remove the Description column
Sort by amount in descending order
Sort by date
```

### Filtering

```
Filter for Rent only
Show me expenses greater than 5000
Filter for January expenses
Show me Marketing expenses
Filter for amounts less than 1000
```

### Analysis

```
Analyze the Amount column
What's the total spending?
Show me unique categories
How many expense types are there?
Analyze the Category column
```

### Charts

```
Show me a bar chart of expenses by category
Create a pie chart of spending by category
Make a doughnut chart of expenses
Show a line chart of expenses over time
Create a bar chart of amount by date
```

### Complex Queries

```
Filter for expenses > 5000, then show a pie chart
Sort by amount, show top 5 categories as a bar chart
Remove description, then show category distribution chart
Filter for January, then create expense chart
```

---

## 🎯 Demo Script for Video

### Intro (30 sec)

```
[Show homepage]
"This is ChartSheet - an AI-powered CSV analytics tool built with Zypher Agent framework."
```

### Act 1: Upload (1 min)

```
[Click "People Data" button]
[Table appears]
"I can upload any CSV file, or use one of these demo datasets."
```

### Act 2: Basic Chat (2 min)

```
Type: "Remove the Industry Focus column"
[Shows column removed]

Type: "Sort by net worth in descending order"
[Table updates]

"ChartSheet understands natural language and automatically selects the right tools."
```

### Act 3: The Magic - Charts! (3 min) ⭐

```
Type: "Show me a bar chart of net worth by person"
[Chart tab activates, beautiful bar chart appears]

"This is what makes ChartSheet special - automatic chart generation!"

Type: "Create a pie chart of nationalities"
[Different chart type appears]

Type: "Make a line chart of net worth by age"
[Line chart appears]

"Four different chart types - bar, line, pie, and doughnut - all from natural language."
```

### Act 4: Advanced Features (2 min)

```
Type: "Filter for people with net worth greater than 150"
[Table filters]

Type: "Analyze the Age column"
[Shows statistics: average, max, min, etc.]

Type: "Sort by age, filter for people over 60, then show a bar chart"
[Multiple operations execute, chart appears]

"ChartSheet can chain multiple tools together to handle complex queries."
```

### Act 5: Other Datasets (2 min)

```
[Click Clear]
[Load Sales Data]

Type: "Show me a line chart of sales by month"
[Line chart appears]

[Load Expenses Data]

Type: "Create a pie chart of spending by category"
[Pie chart appears]

"Works with any CSV data - sales, expenses, analytics, whatever you need."
```

### Act 6: UI Tour (1 min)

```
[Show Upload button]
[Show Download button]
[Show table view]
[Show chart view]
[Show chat suggestions]

"Clean, modern UI built with Next.js, TypeScript, Tailwind, and shadcn/ui."
```

### Conclusion (30 sec)

```
"ChartSheet demonstrates Zypher's tool-based architecture with 7 intelligent tools:
- CSV parsing
- Column manipulation
- Filtering and sorting
- Statistical analysis
- And the big one - automatic chart generation

Production-ready, fully typed, and well-documented.

Built in less than a day using Zypher Agent framework."

[Show GitHub repo]
```

---

## 🎬 Recording Tips

1. **Screen Resolution**: 1920x1080 or 1280x720
2. **Recording Tool**: Loom, OBS, QuickTime, or Zoom
3. **Audio**: Clear mic, no background noise
4. **Duration**: 5-10 minutes ideal
5. **Pacing**: Slow enough to follow, fast enough to keep interest

### Do's ✅

- Show typing in real-time
- Wait for responses to complete
- Point out impressive features
- Show error handling (optional)
- Highlight the UI quality

### Don'ts ❌

- Don't rush through features
- Don't skip the chart generation
- Don't forget to show multiple datasets
- Don't mute your voice
- Don't record in poor lighting

---

## 🧪 Testing Checklist

Before recording demo:

### Upload & Display

- [ ] Upload custom CSV works
- [ ] Demo files load correctly
- [ ] Table displays properly
- [ ] All 3 demo files tested

### Chat

- [ ] Messages send/receive
- [ ] Loading state shows
- [ ] Suggestions clickable
- [ ] Error handling works

### Tools

- [ ] read_csv (automatic on upload)
- [ ] add_column
- [ ] remove_column
- [ ] filter_rows (all operators)
- [ ] sort_data (asc/desc)
- [ ] analyze_data (numeric & categorical)
- [ ] create_chart (all 4 types)

### Charts

- [ ] Bar chart generates
- [ ] Line chart generates
- [ ] Pie chart generates
- [ ] Doughnut chart generates
- [ ] Charts are interactive
- [ ] Tab switching works

### UI

- [ ] Responsive design
- [ ] Download button works
- [ ] Clear button works
- [ ] Tabs work correctly
- [ ] No console errors

### Edge Cases

- [ ] Empty input handling
- [ ] Invalid column names
- [ ] Large CSV files
- [ ] Special characters
- [ ] Missing data

---

## 📝 Submission Notes

When submitting, mention these prompts demonstrate:

1. **Natural Language Understanding**

   - "Show me", "Create", "Make", "Filter for"
   - AI understands intent

2. **Tool Variety**

   - 7 different tools
   - Automatic selection
   - Proper arguments

3. **Chart Generation** (Your Edge!)

   - 4 chart types
   - Automatic data mapping
   - Beautiful visualizations

4. **Complex Operations**
   - Multi-step queries
   - Tool chaining
   - Context awareness

---

**Ready to record your demo! 🎥**

Pick 8-10 prompts from above that best showcase ChartSheet's capabilities.
Focus on the charts - that's your competitive advantage!

Good luck! 🚀
