# 🚀 Quick Start Guide - ChartSheet

## Step 1: Get OpenRouter API Key (Free!)

1. Visit https://openrouter.ai/keys
2. Sign in with Google/GitHub
3. Click "Create API Key"
4. Copy the key (starts with `sk-or-v1-...`)

## Step 2: Setup Project

```bash
# Navigate to project
cd Zypher-agent/chartsheet

# Copy environment template
cp .env.example .env.local

# Edit .env.local and paste your API key
# Replace: OPENROUTER_API_KEY=your_openrouter_api_key_here
# With:    OPENROUTER_API_KEY=sk-or-v1-xxxxx...

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Step 3: Open Browser

Navigate to: **http://localhost:3000**

## Step 4: Try It Out!

### Option A: Use Demo Files

1. Click one of the demo file buttons:
   - **People Data** - Billionaires dataset
   - **Sales Data** - Monthly sales by product
   - **Expenses Data** - Business expenses

### Option B: Upload Your Own CSV

1. Click "Upload CSV"
2. Select any `.csv` file from your computer

## Step 5: Chat with Your Data

Try these example queries:

**Data Manipulation:**

```
Remove the Industry Focus column
Add a new column called "Rank"
Sort by net worth in descending order
Filter for Americans only
```

**Analysis:**

```
Analyze the Net Worth column
What's the average age?
Show me unique nationalities
```

**Visualizations:** (The Cool Part! 📊)

```
Show me a bar chart of net worth by person
Create a pie chart of nationalities
Make a line chart of sales over time
Show expenses as a doughnut chart
```

**Complex Queries:**

```
Sort by age, filter for people over 60, then show a chart
Remove columns I don't need and create a bar chart
Analyze age, then show the distribution as a chart
```

## What Makes ChartSheet Special?

✅ **No Code Required** - Just chat naturally  
✅ **Smart Tool Selection** - AI picks the right tools automatically  
✅ **Visual Insights** - Auto-generates beautiful charts  
✅ **Data Manipulation** - Filter, sort, analyze on the fly  
✅ **Export Results** - Download your modified CSV

## Troubleshooting

### "OPENROUTER_API_KEY not configured"

- Make sure you created `.env.local` (not just `.env`)
- Verify the key starts with `sk-or-v1-`
- Restart the dev server after adding the key

### Port 3000 Already in Use

```bash
# Use a different port
PORT=3001 npm run dev
```

### Chart Not Showing

- Make sure your data has numeric values for the Y-axis
- Try asking: "Create a bar chart of [column1] by [column2]"

## Demo Video Tips

When recording your demo:

1. **Start with upload** - Show both demo files and custom upload
2. **Show different tools** - Remove column, filter, sort
3. **Highlight charts** - This is your edge! Generate multiple chart types
4. **Show chaining** - Complex queries that use multiple tools
5. **Export result** - Download the modified CSV

Good queries for demo:

```
1. "Remove the Industry Focus column"
2. "Show me a bar chart of net worth by person"
3. "Filter for people with net worth greater than 150"
4. "Analyze the Age column"
5. "Sort by net worth and show top 5 in a pie chart"
```

## Next Steps

- Record your demo video (5-10 minutes)
- Push to GitHub (make repo public)
- Add demo video link to README.md
- Submit to CoreSpeed

---

**Need Help?**

- Check README.md for full documentation
- See TECHNICAL.md for architecture details
- Review example queries above

**Good luck! 🎉**
