import {expect} from "chai";
import {clearSupplier} from "./supplierActions";
import {LOAD_SUPPLIER} from "../constants/actionTypes";

describe('Supplier Actions', () => {
  describe('clearSupplier', () => {
    it('should return empty data and LOAD_SUPPLIER type', () => {
      let clearSupplierResult = clearSupplier();
      expect(clearSupplierResult).to.deep.equal({type: LOAD_SUPPLIER, data: {}});
    });
  });

});
