import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchProducts } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import ProductDelete from "./ProductDelete";
import ProductEditForm from "./ProductEditForm";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      blacklistOpen: false,
      id: null,
      params: {},
      alert: {
        open: false,
        message: "",
        backgroundColor: "",
      },
    };
  }
  componentDidMount() {
    this.props.fetchProducts(this.props.token);
  }

  handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ deleteOpen: false });
  };

  handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
  };

  handleSuccessfulEditSnackbar = (message) => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
    this.setState({
      alert: {
        open: true,
        message: message,
        backgroundColor: "#4BB543",
      },
    });
  };

  handleFailedSnackbar = (message) => {
    this.setState({
      alert: {
        open: true,
        message: message,
        backgroundColor: "#FF3232",
      },
    });
    this.setState({ editOpen: false });
  };

  renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/products"),
          ]}
        >
          <DialogContent>
            <ProductEditForm
              token={this.props.token}
              userId={this.props.userId}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
              handleSuccessfulEditSnackbar={this.handleSuccessfulEditSnackbar}
              handleFailedSnackbar={this.handleFailedSnackbar}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.deleteOpen}
          onClose={() => [
            this.setState({ deleteOpen: false }),
            history.push(`/products`),
          ]}
        >
          <DialogContent>
            <ProductDelete
              token={this.props.token}
              userId={this.props.userId}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderBlackListDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          // style={{ zIndex: 1302 }}
          open={this.state.blacklistOpen}
          onClose={() => [
            this.setState({ blacklistOpen: false }),
            history.push(`/products`),
          ]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  renderProductList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 80 },
      { field: "name", headerName: "Product Name", width: 220 },
      { field: "sku", headerName: "SKU", width: 100 },
      { field: "weightPerUnit", headerName: "Weight Per Unit(kg)", width: 120 },
      { field: "totalUnits", headerName: "Total Units", width: 100 },
      { field: "pricePerUnit", headerName: "Price per Units", width: 130 },
      { field: "isFeaturedProduct", headerName: "Is Featured", width: 150 },
      //{ field: "size", headerName: "Product Size", width: 100 },
      // { field: "vendor", headerName: "Vendor", width: 150 },
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
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/products/edit/${params.id}`),
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
                this.setState({ deleteOpen: true, id: params.id }),
                history.push(`/products/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.products.map((product) => {
      let row = {
        numbering: ++counter,
        id: product.id,
        name: product.name,
        configuration: product.configuration,
        weightPerUnit: product.weightPerUnit,
        totalUnits: product.totalUnits,
        remainingTotalUnits: product.remainingTotalUnits,
        vendor: product.vendor,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        sku: product.sku,
        refNumber: product.refNumber,
        imageCover: product.imageCover,
        firstImage: product.firstImage,
        secondImage: product.secondImage,
        thirdImage: product.thirdImage,
        fourthImage: product.fourthImage,
        make: product.make,
        model: product.model,
        category: product.category,
        createdAt: product.createdAt,
        createdBy: product.createdBy,
        color: product.color,
        size: product.size,
        design: product.design,
        content: product.content,
        smell: product.smell,
        taste: product.taste,
        feel: product.feel,
        ingredients: product.ingredients,
        reliability: product.reliability,
        safety: product.safety,
        packaging: product.packaging,
        marketingClaims: product.marketingClaims,
        durability: product.durability,
        pricePerUnit: product.pricePerUnit,
        currency: product.currency,
        keyword1: product.keyword1,
        keyword2: product.keyword2,
        keyword3: product.keyword3,
        minimumQuantity: product.minimumQuantity,
        location: product.location,
        locationCountry: product.locationCountry,
        deliveryCostPerUnitWithinProductLocation:
          product.deliveryCostPerUnitWithinProductLocation,
        baselineDeliveryCostWithinProductLocation:
          product.baselineDeliveryCostWithinProductLocation,
        maxmumQuantityForBaselineDelivery:
          product.maxmumQuantityForBaselineDelivery,
        estimatedDeliveryPeriodInDays: product.estimatedDeliveryPeriodInDays,
        estimatedDeliveryPeriodInHours: product.estimatedDeliveryPeriodInHours,
        estimatedDeliveryPeriodInMinutes:
          product.estimatedDeliveryPeriodInMinutes,
        priceMarkupPerUnit: product.priceMarkupPerUnit,
        isFeaturedProduct: product.isFeaturedProduct,
      };
      rows.push(row);
    });
    return <DataGridContainer columns={columns} rows={rows} />;
  };
  render() {
    return (
      <>
        {this.renderDeleteDialogForm()}
        {this.renderEditDialogForm()}
        {this.renderProductList()}
        {this.renderBlackListDialogForm()}
        <Snackbar
          open={this.state.alert.open}
          message={this.state.alert.message}
          ContentProps={{
            style: { backgroundColor: this.state.alert.backgroundColor },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => this.setState({ alert: { ...alert, open: false } })}
          autoHideDuration={4000}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: Object.values(state.product) };
};

export default connect(mapStateToProps, { fetchProducts })(ProductList);
