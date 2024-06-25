import React from "react";
import { Card, Typography } from "@mui/material";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import TableComponent from "../../../../components/common/Table";
import { ROWS_DATA } from "../data";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DateComponent from "components/common/Inputs/DateComponent";
import Input from "components/common/Inputs/Input";
import SearchIcon from "@mui/icons-material/Search";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import Button from "components/common/Button";
import bookmarkFilled from "assets/images/bookmark-check-filled.svg";
import bookmarkEmpty from "assets/images/bookmark-check-empty.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function VendorSelection({
  selectedVendors,
  setSelectedVendors,
  discardSelectedVendor,
  setDiscardSelectedVendor,
  filteredVendorList,
  setFilteredVendorList,
  favouriteListView,
  setFavouriteListView,
  finalSelectedPartner,
  setFinalSelectedPartner,
}) {
  const USERS_JSX_COLS = [
    {
      title: "Add",
      render: (rowData) => {
        return (
          <input
            style={{
              border: "0.5px solid #0C239B4D",
            }}
            type="checkbox"
            checked={selectedVendors.some(
              (vendor) => vendor.corporationName === rowData.corporationName
            )}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedVendors([...selectedVendors, rowData]);
              } else {
                const filteredList = selectedVendors.filter(
                  (data) => data.corporationName !== rowData.corporationName
                );
                setSelectedVendors(filteredList);
              }
            }}
          />
        );
      },
    },
    {
      title: "Corporation",
      render: (rowData) => {
        return (
          <div className="flex items-center">
            <img
              src={rowData.companyLogo}
              className="ml-1 w-20 h-20"
              alt="/logo"
            />
            <p className="text-nowrap fs-10 ml-2 mb-0">
              {rowData.corporationName}
            </p>
          </div>
        );
      },
    },
    {
      title: "Location",
      render: (rowData) => {
        return <span className="fs-10 text-nowrap">{rowData.location}</span>;
      },
    },
    {
      title: "Industry Served",
      render: (rowData) => {
        return (
          <div style={{ gap: 5 }} className="flex items-center">
            {rowData.industryServed.map((industryItem) => (
              <div className="text-nowrap fs-10 bg-primary-shadow p-1 rounded-5">
                {industryItem}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Saved",
      render: (rowData) => {
        return (
          <span className="fs-10 mx-auto">
            {rowData.isFavourite ? (
              <img src={bookmarkFilled} alt="/favourite-logo" />
            ) : (
              <img src={bookmarkEmpty} alt="/emptyFavouriteLogo" />
            )}
          </span>
        );
      },
    },
    {
      title: "Employee Strength",
      render: (rowData) => {
        return (
          <span className="fs-10 mx-auto">{rowData.employeeStrength}</span>
        );
      },
    },
    {
      title: "Rating",
      render: (rowData) => {
        const array = [1, 2, 3, 4, 5];
        return (
          <div className="flex justify-center items-center">
            {array.map((item) => {
              return item <= rowData.rating ? (
                <GradeRoundedIcon fontSize="24" sx={{ color: "#0F248F80" }} />
              ) : (
                <StarBorderOutlinedIcon
                  fontSize="24"
                  sx={{ color: "#0F248F80" }}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: "CMM Level",
      render: (rowData) => {
        return (
          <div className="flex items-center justify-between">
            <span className="text-nowrap fs-10">{rowData.cmmLevel}</span>
          </div>
        );
      },
    },
    {
      title: "",
      render: (rowData) => {
        return (
          <div className="flex items-center justify-between">
            <span className="text-nowrap fs-10">
              {" "}
              <MoreVertIcon />
            </span>
          </div>
        );
      },
    },
  ];
  const FAVOURITE_JSX_COLS = [
    {
      title: "Remove",
      render: (rowData) => {
        return (
          <input
            type="checkbox"
            checked={discardSelectedVendor.some(
              (vendor) => vendor.corporationName === rowData.corporationName
            )}
            onChange={(e) => {
              if (e.target.checked) {
                setDiscardSelectedVendor([...discardSelectedVendor, rowData]);
              } else {
                const filteredList = discardSelectedVendor.filter(
                  (data) => data.corporationName !== rowData.corporationName
                );
                setDiscardSelectedVendor(filteredList);
              }
            }}
          />
        );
      },
    },
    {
      title: "Corporation",
      render: (rowData) => {
        return (
          <div className="flex items-center">
            <img
              src={rowData.companyLogo}
              className="ml-1 w-20 h-20"
              alt="/logo"
            />
            <p className="text-nowrap fs-10 ml-2 mb-0">
              {rowData.corporationName}
            </p>
          </div>
        );
      },
    },
    {
      title: "Location",
      render: (rowData) => {
        return <span className="fs-10 text-nowrap">{rowData.location}</span>;
      },
    },
    {
      title: "Industry Served",
      render: (rowData) => {
        return (
          <div style={{ gap: 5 }} className="flex items-center">
            {rowData.industryServed.map((industryItem) => (
              <div className="text-nowrap fs-10 bg-primary-shadow p-1 rounded-5">
                {industryItem}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Saved",
      render: (rowData) => {
        return (
          <span className="fs-10 mx-auto">
            {rowData.isFavourite ? (
              <img src={bookmarkFilled} alt="/favourite-logo" />
            ) : (
              <img src={bookmarkEmpty} alt="/emptyFavouriteLogo" />
            )}
          </span>
        );
      },
    },
    {
      title: "Employee Strength",
      render: (rowData) => {
        return (
          <span className="fs-10 text-center mx-auto">
            {rowData.employeeStrength}
          </span>
        );
      },
    },
    {
      title: "Rating",
      render: (rowData) => {
        const array = [1, 2, 3, 4, 5];
        return (
          <div className="flex justify-center items-center">
            {array.map((item) => {
              return item <= rowData.rating ? (
                <GradeRoundedIcon fontSize="24" sx={{ color: "#0F248F" }} />
              ) : (
                <StarBorderOutlinedIcon
                  fontSize="24"
                  sx={{ color: "#0F248F" }}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: "CMM Level",
      render: (rowData) => {
        return (
          <div className="flex items-center justify-between">
            <span className="text-nowrap fs-10">{rowData.cmmLevel}</span>
          </div>
        );
      },
    },
  ];

  const handleFinalSelection = () => {
    setFinalSelectedPartner([...finalSelectedPartner, ...selectedVendors]);
  };

  const handleSearch = (e) => {
    const updatedData = ROWS_DATA.filter((data) =>
      data.corporationName.toLowerCase().includes(e.target.value)
    );
    setFilteredVendorList(updatedData);
  };

  const handleFilter = (filter) => {
    if (filter === "favourite") {
      const updatedData = ROWS_DATA.filter((data) => !!data.isFavourite);
      setFilteredVendorList(updatedData);
    }
  };

  const handleSelect = (vendor) => {
    const alreadyExistedVendor = discardSelectedVendor?.filter(
      (data) => data.corporationName === vendor.corporationName
    );
    if (!!alreadyExistedVendor?.length) {
      const removedVendor = discardSelectedVendor?.filter(
        (data) => data.corporationName !== vendor.corporationName
      );
      setDiscardSelectedVendor(removedVendor);
    } else {
      setDiscardSelectedVendor([...discardSelectedVendor, vendor]);
    }
  };
  return (
    <div className="w-100p p-0">
      <Card sx={{ width: "100%", p: 5, borderRadius: "20px" }}>
        <div className="flex justify-between gap-30">
          <div>
            <Typography className="fs-18 fw-700">
              Reservoir Efficiency Dashboard
            </Typography>
            <Typography className="fs-12 flex items-center gap-10">
              <input type="checkbox" checked={true} /> Submit proposal as
              anonymous
            </Typography>
          </div>
          <div>
            <Typography className="fs-12 mb-2">Proposal Opens on :</Typography>
            <div className="flex gap-10">
              <DateComponent />
            </div>
          </div>
          <div>
            <Typography className="fs-12 mb-2">Proposal Closed on :</Typography>
            <div className="flex gap-10">
              <DateComponent />
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="flex justify-between items-center mb-5">
            <div className="flex gap-10 items-center">
              <Typography className="fw-700">Selected Partners </Typography>
              {!!finalSelectedPartner.length && (
                <div className="flex gap-10 items-center">
                  <div
                    className={
                      favouriteListView === "grid" &&
                      "bg-primary-shadow px-1 rounded-5"
                    }
                    onClick={() => setFavouriteListView("grid")}
                  >
                    <WindowOutlinedIcon fontSize="22px" />
                  </div>
                  <div
                    className={
                      favouriteListView === "list" &&
                      "bg-primary-shadow px-1 rounded-5"
                    }
                    onClick={() => setFavouriteListView("list")}
                  >
                    <TableRowsOutlinedIcon fontSize="22px" />
                  </div>
                </div>
              )}
            </div>
            {!!discardSelectedVendor?.length && (
              <div className="flex gap-10">
                <Button
                  classes="fs-12"
                  onClick={() => {
                    setFinalSelectedPartner([]);
                    setDiscardSelectedVendor([]);
                  }}
                >
                  Remove Selected Partners
                </Button>
                <Button
                  classes="fs-12"
                  bordered
                  onClick={() => setDiscardSelectedVendor([])}
                >
                  Discard Selection
                </Button>
              </div>
            )}
          </div>
          {!finalSelectedPartner.length ? (
            <Typography>You haven't selected any Vendor yet !</Typography>
          ) : (
            <>
              {favouriteListView === "grid" && (
                <div className="flex gap-20 mt-5">
                  {finalSelectedPartner?.map((vendor) => {
                    return (
                      <Card
                        sx={{
                          background:
                            !!discardSelectedVendor?.includes(vendor, 0) &&
                            "#0C239B4D",
                        }}
                        className={`flex gap-10 px-3 py-2 hover-scale hover-scale:hover`}
                        onClick={() => handleSelect(vendor)}
                      >
                        <img src={vendor.companyLogo} alt="/vendor-logo" />
                        <div>
                          <Typography className="fs-14 fw-700 flex-center justify-center">
                            {vendor.corporationName}
                          </Typography>
                          <Typography className="fs-10">
                            {vendor.location}
                          </Typography>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
              {favouriteListView === "list" && (
                <div>
                  <TableComponent
                    rows={finalSelectedPartner}
                    columns={FAVOURITE_JSX_COLS}
                    rowCellClasses={`px-1 `}
                    titleCellClasses="fs-14"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Card>
      <Card
        sx={{ width: "100%", p: 5, borderRadius: "20px", marginTop: "20px" }}
      >
        <Typography className="fs-18 fw-700">Partners selection</Typography>
        <div className="flex justify-between items-center">
          <div className="flex gap-20 items-center my-3 ">
            <Input
              name="searchbar"
              placeholder="Search for Partners"
              icon={<SearchIcon />}
              onChange={handleSearch}
              width="200px"
              height="30px"
              fontSize="11px"
            />
            <Button
              classes="fs-12"
              bordered
              gray
              onClick={() => handleFilter("favourite")}
            >
              Favourites
            </Button>
            <Input
              name="locationFilter"
              placeholder="Location"
              width="80px"
              height="30px"
              fontSize="11px"
            />
            <Input
              name="categoryFilter"
              placeholder="Category"
              width="80px"
              height="30px"
              fontSize="11px"
            />
            {/* <Input
              name="subCategoryFilter"
              placeholder="Sub-Category"
              width="80px"
              height="30px"
              fontSize="11px"
            /> */}
            <Input
              name="technology"
              placeholder="Technology"
              width="80px"
              height="30px"
              fontSize="11px"
            />
          </div>
          {!!selectedVendors.length && (
            <div className="flex gap-10">
              <Button classes="fs-12" onClick={handleFinalSelection}>
                Add Selected Partners
              </Button>
              <Button
                classes="fs-12"
                bordered
                onClick={() => setSelectedVendors([])}
              >
                Discard Selection
              </Button>
            </div>
          )}
        </div>
        <TableComponent
          rows={!!filteredVendorList?.length ? filteredVendorList : ROWS_DATA}
          columns={USERS_JSX_COLS}
          rowCellClasses={"px-1 text-center"}
          // rowsPerPage={rowsPerPage}
          // page={page}
          // handleChangePage={handleChangePage}
          // paginator={true}
          titleCellClasses="fs-12 fw-600"
        />
      </Card>
    </div>
  );
}
