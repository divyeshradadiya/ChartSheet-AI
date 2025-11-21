"use client";

import { Card } from "@/components/ui/card";
import { CSVData } from "@/types";

interface CSVTableViewProps {
  data: CSVData;
}

export default function CSVTableView({ data }: CSVTableViewProps) {
  return (
    <Card className="p-4 h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-background z-10">
            <tr className="border-b bg-muted/50">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="text-left p-3 font-semibold text-sm whitespace-nowrap"
                >
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

      <div className="mt-4 pt-2 border-t text-sm text-muted-foreground shrink-0">
        Showing {data.rows.length} rows × {data.headers.length} columns
      </div>
    </Card>
  );
}
