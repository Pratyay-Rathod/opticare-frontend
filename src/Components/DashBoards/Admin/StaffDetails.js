import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useTable } from 'react-table';

const StaffDetails = () => {

    const [staffDetails,SetStaffDetails] = useState([]);

    const FetchStaffDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8000/staff/display");
            if(response.data){
                SetStaffDetails(response.data.response);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        FetchStaffDetails();
    }, []);

    const data = React.useMemo(() => staffDetails, [staffDetails]);

    const columns = React.useMemo(() => [
        {
            Header: "Staff Index",
            Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            Header: "Staff Name",
            accessor: "username",
        },
        {
            Header:"Staff Contact Number",
            accessor:"contactNumber",
        }
    ], [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state,  } = useTable({ columns, data });

    return (
        <>
            <PrescriptionsData>
                <TableContainer>
                    <table {...getTableProps()} style={{ borderRadius: "10px" }}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>{cell.render("Cell") || "-"}</td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </TableContainer>
            </PrescriptionsData>
        </>
    )
}

const PrescriptionsData = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
`;

const TableContainer = styled.div`
  padding: 30px;
  table {
    border-collapse: collapse;
    border-radius: 10px;
    width: 100%;
  }

  thead {
    background-color: lightblue;
    padding: 8px;
    border: 1px solid gray;
  }

  tr:hover {
    background-color: #FDDDE6;
  }

  td {
    padding: 8px;
    border: 1px solid gray;
  }
`;

const SeeMoreButton = styled.button`
  padding: 8px 16px;
  background-color: lightpink;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default StaffDetails;