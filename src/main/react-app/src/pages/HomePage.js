import React from "react";
import Helmet from "react-helmet";
import {reduxForm} from "redux-form";
import {addQuickNote, loadNoteTypes} from "../services/clothes-service/clothesActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import QuickTasksList from "../components/button-list/QuickTasksList";
import {FULL_PAGE_WAITING_ID} from "../services/modal-waiting-service/componentStateActions";
import {WaitingLayer} from "../components/app-common/WaitingLayer";

const mapDispatchToProps = dispatch => {
  return {
    addQuickNote: (values) => dispatch(addQuickNote(values)),
    loadNoteTypes: () => dispatch(loadNoteTypes()),
  };
};
const mapStateToProps = (state) => {
  return {
    clothesTypes: state.clothesReducer.clothesTypes,
    showWaiting: state.ajaxActionsReducer[FULL_PAGE_WAITING_ID]
  };
};
// TODO: migrate all to pure component
@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'putClothes',
  enableReinitialize: true,
})
export default class HomePage extends React.PureComponent {

  static propTypes = {
    loadNoteTypes: PropTypes.func.isRequired,
    addQuickNote: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    showWaiting: PropTypes.bool,
    clothesTypes: PropTypes.array,
  };

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.loadNoteTypes();
  }

  addQuickNote = (values) => {
    return this.props.addQuickNote(values);
  };

  render() {

    return (
      // TODO: move from home page
      <div className="text-center">
        <Helmet title="Время стирки - Онлайн помошник"
                meta={[
                  {
                    "name": "description",
                    "content": "Персональный помощник в стирке"
                  },
                  {"name": "keywords", "content": "Грязные носки"},
                ]}
        />
        <h1>Мои вещи:</h1>
        <form onSubmit={this.props.handleSubmit}>
          <QuickTasksList actionTypes={this.props.clothesTypes}
                          onPutSubmit={this.addQuickNote}
                          handleSubmit={this.props.handleSubmit}
                          disabled={this.props.submitting}
          />
          <WaitingLayer showWaiting={this.props.showWaiting}
                        waitingId={FULL_PAGE_WAITING_ID}/>
        </form>
      </div>
    );
  }
}
