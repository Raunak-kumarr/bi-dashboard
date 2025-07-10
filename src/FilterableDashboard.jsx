import React, { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import DataTable from 'react-data-table-component';
import Multiselect from 'multiselect-react-dropdown';

const FilterableDashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [columns, setColumns] = useState([]);

    //Load CSV file
    useEffect(() => {
        Papa.parse('/dataset_large.csv', {
            download: true,
            header: true,
            complete: (result) => {
                const raw = result.data.filter(row => Object.values(row).some(cell => cell !== ""));
                const limitedData = raw.slice(0, 1000); //limit rows for better performance
                const cols = Object.keys(limitedData[0]);
                setColumns(cols);
                setData(limitedData);
            }
        });
    }, []);

    //Apply filters using useMemo
    const filteredData = useMemo(() => {
        let filtered = [...data];
        Object.entries(filters).forEach(([col, values]) => {
            if (values.length > 0) {
                filtered = filtered.filter(row => values.includes(row[col]));
            }
        });
        return filtered;
    }, [data, filters]);

    //Smart filter dropdown values using useMemo
    const updatedOptions = useMemo(() => {
        const newOptions = {};
        columns.forEach(col => {
            let tempFiltered = [...data];
            Object.entries(filters).forEach(([key, values]) => {
                if (key !== col && values.length > 0) {
                    tempFiltered = tempFiltered.filter(row => values.includes(row[key]));
                }
            });
            newOptions[col] = [...new Set(tempFiltered.map(row => row[col]))];
        });
        return newOptions;
    }, [filters, data, columns]);

    //Handle filter change
    const handleFilterChange = (selectedList, col) => {
        const newFilters = { ...filters, [col]: selectedList.map(item => item.name) };
        setFilters(newFilters);
    };

    //Define table columns
    const tableColumns = columns.map(col => ({
        name: col,
        selector: row => row[col],
        sortable: true,
    }));

    return (
        <div className="p-4">
            <h2>📊 Filterable BI Dashboard</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {columns.map((col) => (
                    <div key={col}>
                        <label><strong>{col}</strong></label>
                        <Multiselect
                            options={(updatedOptions[col] || []).map(val => ({ name: val }))}
                            displayValue="name"
                            onSelect={(list) => handleFilterChange(list, col)}
                            onRemove={(list) => handleFilterChange(list, col)}
                            selectedValues={(filters[col] || []).map(val => ({ name: val }))}
                            placeholder={`Filter ${col}`}
                            showCheckbox
                            style={{ chips: { background: '#007bff' }, multiselectContainer: { color: 'black' } }}
                        />
                    </div>
                ))}
            </div>

            {/* Data Table */}
            <DataTable
                columns={tableColumns}
                data={filteredData}
                pagination
                paginationPerPage={50}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                striped
                highlightOnHover
                dense
            />
        </div>
    );
};

export default FilterableDashboard;
