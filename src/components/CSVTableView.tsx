"use client";

import { Card } from "@/components/ui/card";
import { CSVData } from "@/types";

interface CSVTableViewProps {
  data: CSVData;
}

export default function CSVTableView({ data }: CSVTableViewProps) {
  return (
    <Card className="p-4 h-full overflow-auto">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              {data.headers.map((header, index) => (
                <th key={index} className="text-left p-3 font-semibold text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-muted/50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3 text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {data.rows.length} rows × {data.headers.length} columns
      </div>
    </Card>
  );
}
