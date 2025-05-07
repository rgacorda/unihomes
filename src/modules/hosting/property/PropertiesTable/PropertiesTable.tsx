"use client";

import React from "react";

import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    FilterFn,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useMediaQuery } from "@/hooks/use-media-query";
import { fuzzyFilter } from "./fuzzy-filters";

import PropertiesHeader from "../PropertiesHeader";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

function PropertiesTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilters, setGlobalFilters] = React.useState("");
    const propertiesTable = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilters,
        globalFilterFn: "fuzzy",
        state: {
            sorting,
            columnFilters,
            globalFilter: globalFilters,
        },
        filterFns: {
            fuzzy: fuzzyFilter,
        },
    });

    const isDesktop = useMediaQuery("(min-width: 748px)");

    return (
        <div className="h-full min-h-screen pb-11">
            <PropertiesHeader table={propertiesTable} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {propertiesTable.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    if (!isDesktop && (header.id === "address" || header.id === "isApproved" || header.id === "due_date")) {
                                        return null;
                                    }
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="relative">
                        {propertiesTable.getRowModel().rows?.length ? (
                            propertiesTable.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => {
                                        if (!isDesktop && cell.id.match(/address|isApproved|action|due_date/)) {
                                            return null;
                                        }
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={propertiesTable} />
        </div>
    );
}

export default PropertiesTable;
