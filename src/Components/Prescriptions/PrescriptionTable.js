import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useTable, useGlobalFilter } from 'react-table';
import { useNavigate } from "react-router-dom";
import { GlobalFilter } from "./GlobalFilter";

const PrescriptionTable = () => {

    const [prescription, setPrescription] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const navigate = useNavigate();

    const handleFilterValue = (event) => {
        setFilterValue(event.target.value);
        console.log(filterValue);
    }

    const FetchPrescriptions = async () => {
        try {
            const response = await axios.get("http://localhost:8000/prescription");
            if(response.data){
                setPrescription(response.data.response);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        FetchPrescriptions();
    }, []);

    const formatTime = (timeString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "UTC",
        };
        return new Date(timeString).toLocaleString(undefined, options);
    };

    const handleSeeMore = (prescriptionId) => {
        navigate(`/prescriptions/${prescriptionId}`);
    };

    const data = React.useMemo(() => prescription, [prescription]);
    const columns = React.useMemo(() => [
        {
            Header: "Prescription Number",
            Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            Header: "Customer Name",
            accessor: "customerInfo.customerName",
        },
        {
            Header: "Customer Phone Number",
            accessor: "customerInfo.phoneNo",
        },
        {
            Header: "Paitent Name",
            accessor: "paitentInfo.paitentName",
        },
        {
            Header: "Paitent Phone Number",
            accessor: "paitentInfo.paitentPhoneNo",
        },
        {
            Header: "Prescription Type",
            accessor: "prescriptionInfo.LensType",
        },
        {
            Header: "Lens Type",
            accessor: "prescriptionInfo.cosmeticOption",
        },
        {
            Header: "Prescription Time",
            accessor: "prescriptionInfo.prescriptionTime",
        },
        {
            Header: "Doctor Name",
            accessor: "prescriptionInfo.doctorName",
        },
        {
            Header: "Action",
            accessor: "_id",
            Cell: ({ value }) => (
                <SeeMoreButton onClick={() => handleSeeMore(value)}>
                    See More
                </SeeMoreButton>
            ),
        },

    ], [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({ columns, data }, useGlobalFilter);

    const { globalFilter } = state;
    
    if(prescription.prescriptionInfo){
        console.log(prescription.prescriptionInfo);
    }
    return (
        <>
            <Filter>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </Filter>
            <PrescriptionsData>
                <TableContainer>
                    <table {...getTableProps()} style={{ borderRadius: "10px" }}>
                        <thead style={{backgroundColor:"#43464d"}}>
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
    height: 350px;
    overflow-y: auto;
    display:block;
  }

  thead {
    background-color: gray;
    padding: 8px;
    border: 1px solid gray;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  tr:hover {
    background-color: #020c24;
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

const Filter = styled.div`
    display:flex;
    justify-content:center ;
    margin-top: 50px;
`;

export default PrescriptionTable;