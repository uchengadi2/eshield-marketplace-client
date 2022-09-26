import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import DataGridContainer from "../DataGridContainer";
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";
import data from "./../../apis/local";

function UserByVendorList(props) {
  const [vendorList, setVendorList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [id, setId] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/users", {
        params: { vendor: props.selectedVendor },
      });

      const workingData = response.data.data.data;
      workingData.map((user) => {
        allData.push(user);
      });

      setUserList(allData);
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
          onClose={() => [setEditOpen(false), history.push("/users")]}
        >
          <DialogContent>
            <UserEdit
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
          onClose={() => [setDeleteOpen(false), history.push(`/users`)]}
        >
          <DialogContent>
            <UserDelete
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
          onClose={() => [setBlacklistOpen(false), history.push(`/users`)]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  const renderUserList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "name", headerName: "User Name", width: 300 },
      { field: "type", headerName: "Type", width: 150 },
      { field: "role", headerName: "Role", width: 150 },
      { field: "email", headerName: "Email Address", width: 250 },
      { field: "vendor", headerName: "Vendor", width: 200 },
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
                history.push(`/users/edit/${params.id}`),
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
                history.push(`/users/blacklist/${params.id}`),
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
                history.push(`/users/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    userList.map((user) => {
      let row = {
        numbering: ++counter,
        id: user.id,
        name: user.name,
        type: user.type,
        role: user.role,
        email: user.email,
        vendor: user.vendor,
      };
      rows.push(row);
    });

    return <DataGridContainer columns={columns} rows={rows} />;
  };

  return (
    <>
      {renderDeleteDialogForm()}
      {renderEditDialogForm()}
      {renderUserList()}
      {renderBlackListDialogForm()}
    </>
  );
}

export default UserByVendorList;
