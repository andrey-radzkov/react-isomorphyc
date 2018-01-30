import React from "react";
import PropTypes from "prop-types";
import FieldLevelValidationForm from "../components/FieldLevelValidationForm";
import {connect} from "react-redux";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import {closeSupplierModal, loadSupplier, loadSuppliers, openModal} from "../actions/supplierActions";
import {SupplierList} from "../components/SupplierList";

class ReduxFormDemoPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.title = "Redux form";
    this.loadSupplier(this.props);
    if (this.props.id) {
      this.props.openModal("supplierModal");
    } else {
      this.loadSuppliers(this.props);
    }
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextProps.id && this.props.id !== nextProps.id) {
      this.loadSupplier(nextProps);
      this.props.openModal("supplierModal");
    } else if (!nextProps.id && this.props.id) {
      this.props.closeSupplierModal("supplierModal", this.props.id, this.getHistory(nextProps));
      this.loadSuppliers(nextProps);
    }
  }


  submit = (e, values) => {
    e.preventDefault();
    alert(values);
  };

  loadSupplier = (props) => {
    if (props.id) {
      props.loadSupplier(props.id);
    }
  };
  loadSuppliers = (props) => {
    if (!props.id) {
      props.loadSuppliers();
    }
  };

  getSuppliers = () => {
    return this.props.suppliers;
  };

  getHistory = (props) => {
    return props.history;
  };


  render() {
    return (
      <div className="container">
        <Button bsStyle="default" type="button"
                onClick={() => this.props.openModal("supplierModal")}>Create
          new</Button>
        <Modal bsSize="large" show={this.props.modalOpen}
               onHide={() => this.props.closeSupplierModal("supplierModal",
                 this.props.id, this.getHistory(this.props))}
               aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Modal
              heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Create/edit supplier</h4>
            <FieldLevelValidationForm onSubmit={this.submit}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.closeSupplierModal("supplierModal",
              this.props.id, this.getHistory(this.props))}>Close</Button>
          </Modal.Footer>
        </Modal>

        <h1>Supplier List</h1>
        <SupplierList suppliers={this.getSuppliers()} showWaiting={this.props.supplierLayer}/>

      </div>
    );
  }
}

ReduxFormDemoPage.propTypes = {
  id: PropTypes.string,
  modalOpen: PropTypes.bool,
  supplierLayer: PropTypes.bool,
  openModal: PropTypes.func,
  closeSupplierModal: PropTypes.func,
  loadSuppliers: PropTypes.func,
  suppliers: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    modalOpen: state.modalReducer["supplierModal"],
    supplierLayer: state.ajaxActionsReducer["supplierLayer"],
    suppliers: state.supplierListReducer.suppliers
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadSupplier: id => dispatch(loadSupplier(id)),
    loadSuppliers: () => dispatch(loadSuppliers()),
    openModal: modalId => dispatch(openModal(modalId)),
    closeSupplierModal: (modalId, id, history) => dispatch(closeSupplierModal(id, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormDemoPage);
