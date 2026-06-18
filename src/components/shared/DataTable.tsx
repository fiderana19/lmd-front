import { ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[] | undefined;
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading,
  onRowClick,
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
      <table className="min-w-full divide-y divide-border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item: any, index: number) => (
            <tr
              key={index}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
              className={`transition-all duration-150 ${
                onRowClick ? "cursor-pointer" : ""
              } hover:bg-primary/5 hover:shadow-sm`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-5 py-3.5 text-sm text-card-foreground ${col.className || ""}`}
                >
                  {col.render
                    ? col.render(item)
                    : item[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
