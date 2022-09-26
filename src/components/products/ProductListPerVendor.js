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
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import data from "./../../apis/local";

function ProductListPerVendor(props) {
  const [productList, setProductList] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [id, setId] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/products", {
        params: { vendor: props.selectedVendor },
      });

      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push(vendor);
      });

      setProductList(allData);
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
          onClose={() => [setEditOpen(false), history.push("/products")]}
        >
          <DialogContent>
            <ProductEdit
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
          onClose={() => [setDeleteOpen(false), history.push(`/products`)]}
        >
          <DialogContent>
            <ProductDelete
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
          onClose={() => [setBlacklistOpen(false), history.push(`/products`)]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  const renderVendorList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "name", headerName: "Vehicle Name", width: 300 },
      { field: "description", headerName: "Description", width: 350 },
      { field: "vendor", headerName: "Vendor", width: 250 },
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
                history.push(`/products/edit/${params.id}`),
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
                history.push(`/products/blacklist/${params.id}`),
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
                history.push(`/products/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    productList.map((product) => {
      let row = {
        numbering: ++counter,
        id: product.id,
        name: product.name,
        description: product.shortDescription,
        vendor: product.vendor[0],
      };
      rows.push(row);
    });

    return <DataGridContainer columns={columns} rows={rows} />;
  };

  return (
    <>
      {renderDeleteDialogForm()}
      {renderEditDialogForm()}
      {renderVendorList()}
      {renderBlackListDialogForm()}
    </>
  );
}

export default ProductListPerVendor;
