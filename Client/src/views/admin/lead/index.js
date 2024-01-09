import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormLabel, Grid, GridItem, Input, Select, useDisclosure, Text } from '@chakra-ui/react';
import Card from "components/card/Card";
import { useFormik } from "formik";
import { useEffect, useState } from 'react';
import { getApi } from "services/api";
import CheckTable from './components/CheckTable';
import * as yup from 'yup';
import { FiUpload } from 'react-icons/fi';
import ImportModal from "./components/ImportModal";
import { HasAccess } from "../../../redux/accessUtils";

const Index = () => {

    const [isLoding, setIsLoding] = useState(false);
    const [data, setData] = useState([]);
    const [displaySearchData, setDisplaySearchData] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const permission = HasAccess('lead');

    const tableColumns = [
        { Header: "#", accessor: "_id", isSortable: false, width: 10 },
        { Header: 'Name', accessor: 'leadName', width: 20 },
        { Header: "Status", accessor: "leadStatus", },
        { Header: "Email", accessor: "leadEmail", },
        { Header: "Phone Number", accessor: "leadPhoneNumber", },
        { Header: "Owner", accessor: "leadOwner", },
        { Header: "Score", accessor: "leadScore", },
        { Header: "Action", isSortable: false, center: true },
    ];

    const emailAccess = HasAccess('email')
    const callAccess = HasAccess('call')

    // if ((callAccess?.create || permission?.view || permission?.delete || permission?.update || emailAccess?.create)) {
    //     tableColumns.push({ Header: "Action", isSortable: false, center: true })
    // } else if (user.role === 'superAdmin') {
    //     tableColumns.push({ Header: "Action", isSortable: false, center: true })
    // }

    const [dynamicColumns, setDynamicColumns] = useState([...tableColumns]);
    const [selectedColumns, setSelectedColumns] = useState([...tableColumns]);
    const [action, setAction] = useState(false)
    const [columns, setColumns] = useState(tableColumns);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const size = "lg";



    const fetchData = async () => {
        setIsLoding(true)
        let result = await getApi(user.role === 'superAdmin' ? 'api/lead/' : `api/lead/?createBy=${user._id}`);
        setData(result.data);
        setIsLoding(false)
    }

    useEffect(() => {

        setColumns(tableColumns)
    }, [action])

    // console.log(columns)

    return (
        <div>
            <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={4}>
                <GridItem colSpan={6}>
                    <CheckTable
                        isLoding={isLoding}
                        columnsData={tableColumns}
                        isOpen={isOpen}
                        setAction={setAction}
                        action={action}
                        setSearchedData={setSearchedData}
                        allData={data}
                        displaySearchData={displaySearchData}
                        tableData={displaySearchData ? searchedData : data}
                        fetchData={fetchData}
                        setDisplaySearchData={setDisplaySearchData}
                        setDynamicColumns={setDynamicColumns}
                        dynamicColumns={dynamicColumns}
                        selectedColumns={selectedColumns}
                        access={permission}
                        setSelectedColumns={setSelectedColumns}
                        emailAccess={emailAccess}
                        callAccess={callAccess}
                    />
                </GridItem>
            </Grid>

        </div>
    )
}

export default Index
