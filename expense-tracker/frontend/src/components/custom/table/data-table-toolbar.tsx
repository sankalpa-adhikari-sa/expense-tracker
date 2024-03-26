"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableExport } from "./data-table-export";
import DataTableDateFiterOptions from "./data-table-date-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tableSearchColumn: string;
  filename?: string;
  filterOptions?: Array<{
    title: string;
    column_name: string;
    data: Array<{ label: string; value: string }>;
  }>;
  dateFilterRange?: any;
}

export function DataTableToolbar<TData>({
  table,
  filterOptions,
  tableSearchColumn,
  filename,
  dateFilterRange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search"
          value={
            (table.getColumn(tableSearchColumn)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(tableSearchColumn)
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filterOptions?.length
          ? filterOptions.map(
              (option, index) =>
                table.getColumn(option.column_name) && (
                  <DataTableFacetedFilter
                    key={index}
                    column={table.getColumn(option.column_name)}
                    title={option.title}
                    options={option.data}
                  />
                )
            )
          : null}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-row gap-2">
        {dateFilterRange ? (
          <DataTableDateFiterOptions dateRangeAtom={dateFilterRange} />
        ) : null}
        {filename ? (
          table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
            <DataTableExport table={table} filename={filename} />
          ) : null
        ) : null}

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
