import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../../history";
import DataGridContainer from "../../DataGridContainer";
import CityEdit from "./CityEdit";
import CityDelete from "./CityDelete";
import data from "./../../../apis/local";

function CitiesInCountryList(props) {
  const [cityList, setCityList] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [id, setId] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/cities", {
        params: { country: props.selectedCountry },
      });

      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push(city);
      });

      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setDeleteOpen(false);
  };

  const handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    setEditOpen(editOpen);
  };

  const renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          open={editOpen}
          onClose={() => [setEditOpen(false), history.push("/cities")]}
        >
          <DialogContent>
            <CityEdit
              token={props.token}
              params={params}
              handleEditDialogOpenStatus={handleEditDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          // style={{ zIndex: 1302 }}
          open={deleteOpen}
          onClose={() => [setDeleteOpen(false), history.push(`/cities`)]}
        >
          <DialogContent>
            <CityDelete
              token={props.token}
              id={id}
              handleDialogOpenStatus={handleDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderBlackListDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={blacklistOpen}
          onClose={() => [setBlacklistOpen(false), history.push(`/cities`)]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  const renderCitiesList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 50 },
      { field: "name", headerName: "Vendor Name", width: 300 },
      { field: "description", headerName: "Description", width: 450 },
      { field: "country", headerName: "Country", width: 200 },
      { field: "security", headerName: "Security Status", width: 70 },
      {
        field: "editaction",
        headerName: "",
        width: 30,
        description: "Update row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <EditRoundedIcon
              onClick={() => [
                // this.setState({
                //   editOpen: true,
                //   id: params.id,
                //   params: params.row,
                // }),
                setEditOpen(true),
                setId(params.id),
                setParams(params.row),
                history.push(`/cities/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "blacklistaction",
        headerName: "",
        width: 30,
        description: "Blacklist city",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <CancelRoundedIcon
              style={{ color: "black" }}
              onClick={() => [
                // this.setState({ blacklistOpen: true, id: params.id }),
                setBlacklistOpen(true),
                setId(params.id),
                history.push(`/cities/blacklist/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "deleteaction",
        headerName: "",
        width: 30,
        description: "Delete row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <DeleteRoundedIcon
              style={{ color: "red" }}
              onClick={() => [
                // this.setState({ deleteOpen: true, id: params.id }),
                setDeleteOpen(true),
                setId(params.id),
                history.push(`/cities/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    cityList.map((city) => {
      let row = {
        numbering: ++counter,
        id: city.id,
        name: city.name,
        description: city.description,
        country: city.country[0],
        security: city.securityStatus,
      };
      rows.push(row);
    });

    return <DataGridContainer columns={columns} rows={rows} />;
  };

  return (
    <>
      {renderDeleteDialogForm()}
      {renderEditDialogForm()}
      {renderCitiesList()}
      {renderBlackListDialogForm()}
    </>
  );
}

export default CitiesInCountryList;
