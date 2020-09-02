import 'package:estabelecimento_app/data/database_helper.dart';
import 'package:estabelecimento_app/data/rest_ds.dart';
import 'package:estabelecimento_app/model/Establishment.dart';
import 'package:estabelecimento_app/model/User.dart';
import 'package:flutter/cupertino.dart';


abstract class EstablishmentScreenContract {
  void onPermitsSuccess(List permits);
  void onPermitsError(String errorTxt);
}

class EstablishmentScreenPresenter {
  EstablishmentScreenContract _view;
  RestDatasource api = new RestDatasource();



  EstablishmentScreenPresenter(this._view);

  getListEstablishment() async {

    try {
      List permits = await api.pegaEstabelecimento();
      _view.onPermitsSuccess(permits);
    } catch( error ) {
      _view.onPermitsError(error.toString());
    }
  }
}