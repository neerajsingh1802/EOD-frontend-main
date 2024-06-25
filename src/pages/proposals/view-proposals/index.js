import React, { useState } from "react";
import { Box, Card, Hidden, Modal, Popover, TableCell, Typography } from "@mui/material";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DateComponent from "components/common/Inputs/DateComponent";
import Input from "components/common/Inputs/Input";
import SearchIcon from "@mui/icons-material/Search";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import Button from "components/common/Button";
import bookmarkFilled from "assets/images/bookmark-check-filled.svg";
import bookmarkEmpty from "assets/images/bookmark-check-empty.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableComponent from "components/common/Table";
import { VIEW_PROPOSAL_DATA } from "./data";
import SelectInput from "components/common/Inputs/SelectInput";
import MultiSelect from "components/common/Inputs/MultiSelect";
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const ViewProposals = () => {
    const [filteredList, setFilteredList] = useState([])
    const [selectedRow, setSelectedRow] = useState(null);
    const [isEditmode, setEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleOpenModal = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const USERS_JSX_COLS = [
        {
            title: "Title",
            render: (rowData) => {
                return (
                    <p className="text-nowrap fs-10 ml-2 mb-0 text-left">
                        {rowData?.title}
                    </p>
                );
            },
        },
        {
            title: "Status",
            render: (rowData) => {
                return (
                    <div style={{
                        position: "relative", width: "120px", borderRadius: "8px", overflow: "hidden",
                    }}>
                        <button style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontSize: "11px",
                            outline: "none",
                            background: rowData.status === "Open For Bidding" ? "#FF991F" : "#E6E8F2"
                        }}>{rowData?.status}
                        </button>
                        <hr style={{ position: "absolute", bottom: "-15px", width: rowData.status === "In Draft" ? "30%" : rowData.status === "Approval Stage" ? "60%" : rowData.status === "Partner Selection" ? "80%" : "100%", background: rowData.status === "Rejected" ? "#DE350B" : rowData.status === "Submitted" ? "#00875A" : "#FF991F", height: "3px", border: "none" }}></hr>
                    </div>
                );
            },
        },
        {
            title: "Category",
            render: (rowData) => {
                return (
                    <p className="text-nowrap fs-10 ml-2 mb-0">
                        {rowData?.category}
                    </p>
                );
            },
        },
        {
            title: "Sub Category",
            render: (rowData) => {
                return (
                    <p className="text-nowrap fs-10 ml-2 mb-0">
                        {rowData?.subCategory}
                    </p>
                );
            },
        },
        {
            title: "Budget Range",
            render: (rowData) => {
                return (
                    <p className="text-nowrap fs-10 ml-2 mb-0">
                        {rowData?.budgetRange}
                    </p>
                );
            },
        },
        {
            title: "Bidding Starts",
            render: (rowData) => {
                return (
                    <div className="">
                        <p className="text-nowrap fs-10 ml-2 mb-0">
                            {rowData?.biddingStart?.time}
                        </p>
                        <p className="text-nowrap fs-10 ml-2 mb-0">
                            {rowData?.biddingStart?.date}
                        </p>
                    </div>
                );
            },
        },
        {
            title: "Bidding Ends",
            render: (rowData) => {
                return (
                    <div className="">
                        <p className="text-nowrap fs-10 ml-2 mb-0">
                            {rowData?.biddingEnds?.time}
                        </p>
                        <p className="text-nowrap fs-10 ml-2 mb-0">
                            {rowData?.biddingEnds?.date}
                        </p>
                    </div>
                );
            },
        },
        {
            title: "Bidding Count",
            render: (rowData) => {
                return (
                    <span className="text-nowrap fs-10">{rowData?.biddingCounts}</span>
                );
            },
        },
        {
            title: "",
            render: (rowData) => {
                return (
                    <div>
                        <span
                            className="text-nowrap fs-10"
                            aria-describedby={id}
                            onClick={handleOpenModal}
                        >
                            <MoreVertIcon />
                        </span>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{
                                px: 2, py: 1, fontSize: 11, cursor: "pointer", "&: hover": {
                                    background: "#0F248F1A"
                                }
                            }} onClick={() => setEditMode(true)}> <EditIcon fontSize={"60"} /> Edit</Typography>
                            <Typography sx={{
                                px: 2, py: 1, fontSize: 11, cursor: "pointer", "&: hover": {
                                    background: "#0F248F1A"
                                }
                            }}><ContentPasteSearchIcon fontSize={"60"} /> View Details</Typography>
                        </Popover>
                    </div>
                )
            },
        },
    ];

    const handleSearch = (e) => {
        const list = VIEW_PROPOSAL_DATA?.filter((item) =>
            item?.title?.toLowerCase()?.includes(e.target.value)
        )
        setFilteredList(list)
    };
    return (
        <Card
            sx={{ width: "100%", p: 5, borderRadius: "20px", height: "100%" }}
        >
            <Typography className="fs-18 fw-700">My Proposals</Typography>
            <div className="flex justify-between items-center">
                <div className="flex gap-20 items-center my-3 ">
                    <Input
                        name="searchbar"
                        placeholder="Search for proposal names or details"
                        icon={<SearchIcon />}
                        onChange={handleSearch}
                        width="280px"
                        height="30px"
                        fontSize="11px"
                    />
                    <MultiSelect
                        name="staus"
                        label="Status"
                        options={["In Draft", "Review Stage", "Approval Stage", "Partner Selection", "Submitted", "Discarded", "Open For Bidding"]}
                        // onChange={handleChange}
                        value={[]}
                        height="30px"
                        width="150px"
                    />
                    <Input
                        name="categoryFilter"
                        placeholder="Category"
                        width="80px"
                        height="30px"
                        fontSize="11px"
                    />
                    <Input
                        name="subCategoryFilter"
                        placeholder="Sub-Category"
                        width="80px"
                        height="30px"
                        fontSize="11px"
                    />
                </div>
            </div>
            <TableComponent
                rows={filteredList?.length ? filteredList : VIEW_PROPOSAL_DATA}
                columns={USERS_JSX_COLS}
                rowCellClasses={"px-1 text-center "}
                // rowsPerPage={rowsPerPage}
                // page={page}
                // handleChangePage={handleChangePage}
                // paginator={true}
                titleCellClasses="fs-12 fw-600"
            />
        </Card>
    )
}

export default ViewProposals
