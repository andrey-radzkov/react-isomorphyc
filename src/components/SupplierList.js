import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {WaitingLayer} from "./WaitingLayer";

export const SupplierList = ({suppliers, showWaiting}) => {
  let supplierList;
  if (suppliers && suppliers.content) {
    supplierList = suppliers.content.map(function (item) {
      return (
        <tr key={item.id}>
          <td>
            <Link to={'/redux-form/' + item.id}>{item.companyName}</Link>
          </td>
          <td>
            {item.email}
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <table className={'table table-striped'} id="suppliers">
        <tbody>
        <tr>
          <th>Id</th>
          <th>Email</th>
        </tr>
        {supplierList}
        </tbody>
      </table>
      <WaitingLayer waitingId={'supplierLayer'} showWaiting={showWaiting}/>
    </div>
  );

};

SupplierList.propTypes = {
  suppliers: PropTypes.object,
  showWaiting: PropTypes.bool,
};
